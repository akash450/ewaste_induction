import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SERVER_URL from "../config/config";
import { AuthContext } from "../Contexts/AuthContext";
import ActivityComponent from "./ActivityComponent";

function ActivitiesDisplay() {
    const [role, setRole] = useState("");
    const [activities, setActivities] = useState([]);
    const {userToken} = useContext(AuthContext);
    const navigation = useNavigate();

    const getUserRole = () => {
        axios.get(`${SERVER_URL}/user/role`, {headers: {"Authorization": `Basic ${userToken}`}})
        .then(response => {
          setRole(response.data.role)
        })
        .catch(e => {
            console.log(e.response.data.message);
          }
        );
    };

    useEffect(() => {
        getUserRole();
    },[]);

    const getAllActivities = () => {
        axios.get(`${SERVER_URL}/activities/allactivities`, {headers: {"Authorization": `Basic ${userToken}`}})
        .then(response => {
          setActivities(response.data.activities);
          console.log(response.data.activities);
        })
        .catch(e => {
            console.log("No activity found! Try adding an activity!");
          }
        );
    };

    useEffect(() => {
        getAllActivities();
    },[]);

    const onDeletePress = (id) => {
        axios.delete(`${SERVER_URL}/activities/deleteactivity/${id}`, 
        {headers: {"Authorization": `Basic ${userToken}`}}).then(response => {
            alert(response.data.message);
            //update activities after successful deletion
            getAllActivities();
        })
        .catch(e => {
            console.log("Error is here");
            alert(e.response.data.message);
        })
    };

    const onAddStepsPress = (id) => {
      navigation(`/addsteps/${id}`);
    };

    const onPerformSteps = (activity) => {
        navigation('/performsteps', { state: {activity: activity} });
    };

    return (
      <div>
          {activities.length !== 0 ? 
            <div>
                {
                    activities.map(
                      activity => (
                          <div>
                            <ActivityComponent 
                            key={activity._id} 
                            title={activity.title} 
                            points={activity.points} 
                            imageUri={activity.image.url}
                            onDelete={() => {onDeletePress(activity._id)}}
                            onAddSteps={() => {onAddStepsPress(activity._id)}}
                            performSteps={() => {onPerformSteps(activity)}}/>
                          </div>
                      )
                    )
                }
            </div> : <div>No activities found!</div>
          }
          {
            role === "staff" ? 
                <div>
                    <button 
                    className="button"
                    onClick={() => {navigation('/addactivity')}}
                    >
                        Add Activity
                    </button>
                </div>
            : null
          }
      </div>
    )
}
  
export default ActivitiesDisplay