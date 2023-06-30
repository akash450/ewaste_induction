import InductionModule from "../../components/InductionModule"
import missionVideoUri from '../../assets/mission_final - HD 720p.mp4';
const missionTitle = 'Our Mission (50 points)';

function OurMission() {
    return (
      <InductionModule title={missionTitle} video={missionVideoUri} next='/safety'/>
    );
}
  
export default OurMission