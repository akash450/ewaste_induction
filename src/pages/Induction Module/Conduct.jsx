import InductionModule from "../../components/InductionModule";
import conductVideoUri from '../../assets/conduct_final - HD 720p.mp4';
const conductTitle = 'Conduct (50 points)';

function Conduct() {
    return (
      <InductionModule title={conductTitle} video={conductVideoUri} next='/sorting'/>
    )
}
  
export default Conduct