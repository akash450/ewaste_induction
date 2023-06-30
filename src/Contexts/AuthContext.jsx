import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import SERVER_URL from '../config/config';
//Create the Auth Context with the data type specified
//and a empty object
const AuthContext = createContext({});
const AuthProvider = ({children}) => {
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (email, password) => {
      await axios.post(`${SERVER_URL}/user/login`, {
        email,
        password
      }, {
        headers: {
          "Authorization": `Basic ${userToken}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }).then(response => {
        let userInfo = response.data;
        setUserInfo(userInfo);
        //Set the user token in the context, so the App can be notified
        //and send the user to the AppStack
        setUserToken(userInfo.userToken);
        //Persist the data in the Async Storage
        //to be recovered in the next user session.
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.setItem('userToken', userInfo.userToken);
      })
      .catch(e => {
          alert("Error: " + e.response.data.message);
        }
      );
  };

  const signup = (firstname, lastname, email, password, role) => {
      axios.post(`${SERVER_URL}/user/register`, {
        firstname,
        lastname,
        email,
        password,
        role
      }, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        alert(response.data.message);
      })
      .catch(e => {
        alert("Error: " + e.response.data.message);
      });
  };
  const logout = () => {
      axios.get(`${SERVER_URL}/user/logout`, {headers: {"Authorization": `Basic ${userToken}`}}).then(response => {
        //Remove data from context, so the App can be notified
        //and send the user to the AuthStack
        setUserToken(null);
        //Remove the data from Async Storage
        //to NOT be recoverede in next session.
        localStorage.removeItem('userInfo');
        localStorage.removeItem('userToken');
        console.log(response.data.message);
      }).catch(e => {
        console.log("Logout error: " + e.response.data.message);
      })
  };
  const resetPassword = (email, password) => {
    axios.put(`${SERVER_URL}/user/forgotpassword`, {
      email, 
      password
    })
    .then(response => {
      alert(response.data.message);
    })
    .catch(e => {
      alert("Error: " + e.response.data.message);
    });
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const isLoggedIn = () => {
    try {
      let userInfo = localStorage.getItem('userInfo');
      let userToken = localStorage.getItem('userToken');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        const decodedJwt = parseJwt(userToken);
        if (decodedJwt.exp * 1000 < Date.now()) {
            setUserToken(null);
            localStorage.removeItem('userInfo');
            localStorage.removeItem('userToken');
            window.location.replace("/");
        } 
        else {
            setUserToken(userToken);
            setUserInfo(userInfo);
        }
      }
    } catch (error) {
      alert('Login error: ' + error.response.data.message);
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, []);
  
  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{login, signup, logout, userInfo, userToken, resetPassword}}>
      {children}
    </AuthContext.Provider>
  );
};
export {AuthContext, AuthProvider};