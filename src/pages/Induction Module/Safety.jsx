import InductionModule from "../../components/InductionModule"
import safetyVideoUri from '../../assets/safety_final - HD 720p.mp4';
const safetyTitle = 'Safety (50 points)';

function Safety() {
    return (
      <InductionModule title={safetyTitle} video={safetyVideoUri} next='/conduct'/>
    )
}
  
export default Safety