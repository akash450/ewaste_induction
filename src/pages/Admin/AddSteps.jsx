import axios from "axios";
import { useContext, useRef, useState } from "react";
import Header from "../../components/Header";
import SERVER_URL from "../../config/config";
import { AuthContext } from "../../Contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function AddSteps() {
    const fileInputRef = useRef(null);
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState(null);
    const {userToken} = useContext(AuthContext);
    const navigation = useNavigate();

    const {id} = useParams();
    console.log(file);

    const handleFinish = () => {
        navigation('/activities');
    }

    const handleAddSteps = () => {
      addStep();
    };

    const addStep = () => {
      const newStep = new FormData();
      newStep.append('description', desc);
      newStep.append('file', file);
      axios.post(`${SERVER_URL}/activities/addstep/${id}`, newStep, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          alert(response.data.message);
        })
        .catch(e => {
          alert("Error: " + e.response.data.message);
        });
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setFile(file);
    };

    const handleDescChange = (event) => {
      setDesc(event.target.value);
    };

    const handleClick = (event) => {
      event.preventDefault();
      fileInputRef.current.click();
    };

    return (
      <div className='default'>
        <header className='header'>
          <Header/>
          <h1 className='formHeading'>Add Steps</h1>
        </header>
          
        <main className='container'>
          <form className='formcontainer'>
            <div>
              <input 
              type="text"
              placeholder='Description'
              value={desc}
              onChange={handleDescChange} />
            </div>

            <div>
              <label>Upload Video:</label>
              <input
              type='file'
              id='file'
              onChange={handleFileChange}
              ref={fileInputRef}
              />
              <button 
              className='button'
              onClick={handleClick}>
                Select video
              </button>
            </div>
          </form>
          <div>
            <button
            className='button'
            disabled={desc === '' || file === ''}
            onClick={handleAddSteps}
            >
                Add step
            </button>
            <button
            className='button'
            onClick={handleFinish}
            >
                Finish
            </button>
          </div>
        </main>
      </div>
    );
};
  
export default AddSteps