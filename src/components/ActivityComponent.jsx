import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import SERVER_URL from '../config/config';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

function ActivityComponent({id, title, points, imageUri, onDelete, onAddSteps, performSteps}) {
    const {userToken} = useContext(AuthContext);
    const [role, setRole] = useState('');
    const onDeletePress = () => {
      onDelete(id);
    };

    const onAddStepsPress = () => {
      onAddSteps(id);
    };

    const onPerformSteps = (id) => {
      performSteps(id);
    };

    const getUserRole = () => {
      axios.get(`${SERVER_URL}/user/role`, {headers: {"Authorization": `Basic ${userToken}`}})
      .then(response => {
        setRole(response.data.role);
      })
      .catch(e => {
          console.log(e.response.data.message);
        }
      );
    };

    useEffect(() => {
        getUserRole();
    });

    return (
      <div className="container">
          <h3>{`${title} (${points} points)`}</h3>
          <div className="activitycontainer">
            <img 
              src={imageUri}
              onClick={onPerformSteps} 
              style={{ width: 200, height: 200, cursor: 'pointer', margin: 20}}
              alt="activity"
              ></img>

              { role === 'staff' ? 
                (
                  <div className='icons'>
                      <i className="fa fa-trash-o fa-2x" 
                      aria-hidden="true"
                      onClick={() => {onDeletePress()}}></i>

                      <i className="fa fa-plus-circle fa-2x"
                      aria-hidden="true"
                      style={{marginLeft: 20}}
                      onClick={() => {onAddStepsPress()}}
                      ></i>
                  </div>
                ) : null
              }
          </div>
      </div>
    )
}
  
export default ActivityComponent