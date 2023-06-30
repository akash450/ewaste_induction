import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import FinishPage from "./FinishPage";

function PerformSteps() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [step, setStep] = useState(1);
    const location = useLocation();
    const activity = location.state.activity;
    const recycleMessage = "Superb! You helped recycle!";

    console.log(step);
    console.log(activity.steps[step - 1].video.url);

    const togglePlay = () => {
      setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleFinish = () => {
      setIsClicked(true);
    }

    return (
      <div className='default'>
        <header className='header'>
          <Header/>
          <h1 className='formHeading'>{activity.title}({activity.points} points)</h1>
        </header>
        
        {
            !isClicked ? 
            (
              <main className='container'>
                <div className="videocontainer">
                    <button 
                    className="playblock"
                    style={{display: isPlaying ? 'none' : 'block'}}
                    onClick={togglePlay}>
                        <span className="playbutton"/>
                    </button>
                    <video 
                    key={step}
                    style={{display: isPlaying ? 'block' : 'none', width: '50%', height: 250, alignContent: "center"}}
                    controls
                    autoPlay={isPlaying}
                    >
                      <source src={activity.steps[step - 1].video.url} type='video/mp4'></source>
                    </video>
                </div>
                <h5>Step {step}: {activity.steps[step - 1].description} </h5>
                {
                  step === activity.steps.length ? 
                    <button
                    className='button'
                    onClick={() => {handleFinish()}}
                    >
                      Claim Stars
                    </button>
                  :
                    <button
                    className='button'
                    onClick={() => {handleNext()}}
                    >
                      Next
                    </button>
                }
              </main>
            ) :
            (
              <FinishPage message={recycleMessage} navigateTo={1} addPoints={activity.points}></FinishPage>
            )
        }
      </div>
    )
}
  
export default PerformSteps