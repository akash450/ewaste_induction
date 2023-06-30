import axios from "axios";
import { useContext, useRef, useState } from "react";
import Header from "../../components/Header";
import SERVER_URL from "../../config/config";
import { AuthContext } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function AddActivityForm() {
    const fileInputRef = useRef(null);
    const [title, setTitle] = useState('');
    const [points, setPoints] = useState('');
    const [file, setFile] = useState(null);
    const {userToken} = useContext(AuthContext);
    const navigation = useNavigate();
    
    console.log(title);
    console.log(points);
    console.log(file);

    const handleAddActivity = () => {
      addActivity(title, points, file);
      navigation('/activities');
    };

    const addActivity = async (title, points) => {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('points', points);
      formData.append('file', file);
      await axios.post(`${SERVER_URL}/activities/addactivity`, formData, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          console.log(response.data.message);
        })
        .catch(e => {
          alert("Error: " + e.response.data.message);
        });
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setFile(file);
    };

    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    }

    const handlePointChange = (event) => {
      setPoints(event.target.value);
    }

    const handleClick = (event) => {
      fileInputRef.current.click();
    }

    return (
      <div className='default'>
        <header className='header'>
          <Header/>
          <h1 className='formHeading'>Add Activity</h1>
        </header>
          
        <main className='container'>
          <form className='formcontainer'>
            <div>
              <input 
              type="text"
              placeholder='Title'
              value={title}
              style={{width: '50%'}}
              onChange={handleTitleChange} />
            </div>

            <div>
              <input
              type='file'
              id='file'
              onChange={handleFileChange}
              ref={fileInputRef}
              title="Select Picture"
              />
              <label 
              style={{color: '#3eac57'}}
              onClick={handleClick}>
                Select picture
              </label>
            </div>

            <div className="pointsContainer">
              <h5>Points: </h5>
              <input 
              type="number"
              placeholder='Points'
              value={points}
              onChange={handlePointChange}
              style={{width: '3.5em', height: '3em', borderRadius: 10}} />
            </div>
          </form>
          <button
          className='button'
          disabled={title === '' || file === '' || points === ''}
          onClick={handleAddActivity}
          >
              Add activity
          </button>
        </main>
      </div>
    );
};
  
export default AddActivityForm