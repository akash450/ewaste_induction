import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function InductionModule({title, video, next}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const navigation = useNavigate();

    const togglePlay = () => {
      setIsPlaying(!isPlaying);
    };

    const handleClick = () => {
        navigation(next);
    }

    return (
      <div className='default'>
              <header className='header'>
                  <Header/>
                  <h1 className='formHeading'>{title}</h1>
              </header>

              <main className='container'>
                  <div className="videocontainer">
                      <button 
                      className="playblock"
                      style={{display: isPlaying ? 'none' : 'block'}}
                      onClick={togglePlay}>
                          <span className="playbutton"/>
                      </button>
                      <video 
                      style={{display: isPlaying ? 'block' : 'none', width: '50%', height: 250, alignContent: "center"}}
                      controls
                      autoPlay={isPlaying}
                      >
                        <source style={{zIndex: -1}} src={video} type='video/mp4'></source>
                      </video>
                  </div>
                  <button
                  className='button'
                  onClick={handleClick}
                  >
                    Next
                  </button>
              </main>
          </div>
    );
}
  
export default InductionModule