import InductionModule from "../../components/InductionModule"
import sortingVideoUri from '../../assets/sorting_final - HD 720p.mp4';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import axios from "axios";
import SERVER_URL from "../../config/config";

const sortingTitle = 'Sorting Components (50 points)';

function Sorting() {
    const [points, setPoints] = useState('');
    const {userToken} = useContext(AuthContext);

    const getUserPoints = async () => {
      await axios.get(`${SERVER_URL}/user/points`, {headers: {"Authorization": `Basic ${userToken}`}})
      .then(response => {
          setPoints(response.data.points);
      })
      .catch(
          e => {
              console.log("Error: " + e.response.data.message);
          }
      );
    }
    
    useEffect(() => {
      getUserPoints();
    });

    return (
      <InductionModule title={sortingTitle} video={sortingVideoUri} next={points >= 200 ? '/' : '/quiz'}/>
    )
}
  
export default Sorting