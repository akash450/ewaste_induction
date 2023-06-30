import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SERVER_URL from "../config/config";
import { AuthContext } from "../Contexts/AuthContext";
import smiley_face_thumbs_up from "../assets/smiley_thumbs_up.jpg"

function FinishPage({message, navigateTo, addPoints}) {
    const [points, setPoints] = useState('');
    const navigation = useNavigate();
    const {userToken} = useContext(AuthContext);

    const DESTINATION = {
        1: '/',
        2: '/ourmission'
    }

    const handleFinish = () => {
      axios.put(`${SERVER_URL}/user/changepoints`, 
      { points: points + addPoints },
      { headers: {"Authorization": `Basic ${userToken}`}})
        .then(response => {
          setPoints(response.data.points);
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
        navigation(DESTINATION[navigateTo])
    };

    const getUserPoints = () => {
      axios.get(`${SERVER_URL}/user/points`, {headers: {"Authorization": `Basic ${userToken}`}})
      .then(response => 
        {
          setPoints(response.data.points);
        }
      )
      .catch(e => 
        {
          alert("Error: " + e.response.data.message);
        }
      );
    };
    
    useEffect(() => {
        getUserPoints();
      }
    );

    return (
      <div className='default'>
        <img src={smiley_face_thumbs_up} alt="smiley face"
         style={{width: '30%', height: '30%'}}/>
        <header className='header'>
          <h1 className='formHeading'>{message}</h1>
        </header>
          
        <main className='container'>
            <button
            className='button'
            onClick={handleFinish}
            >
                Back to {navigateTo === 1 ? 'Homepage' : 'Modules'}
            </button>
        </main>
      </div>
    )
  }
  
  export default FinishPage