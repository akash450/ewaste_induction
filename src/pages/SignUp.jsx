import { useContext, useState } from "react";
import '../App.css';
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("staff");
    const [staffClicked, setStaffClicked] = useState(false);
    const [volunteerclicked, setVolunteerClicked] = useState(false);
    const disableBtn = !firstName || !lastName || !email || !password || !role
    const navigation = useNavigate();

    const {signup} = useContext(AuthContext);

    const handleRegister = () => {
        signup(firstName, lastName, email, password, role);
        navigation('/');
    }
    
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    return (
        <div className='default'>
            <header className='header'>
                <h1 className='formHeading'>Sign up</h1>
            </header>

            <main className='container'>
            <form className='formcontainer'>
                    <div className="namecontainer">
                        <input 
                        type="text"
                        placeholder='First name'
                        value={firstName}
                        onChange={handleFirstNameChange} />

                        <input 
                        type="text"
                        placeholder='Last name'
                        value={lastName}
                        onChange={handleLastNameChange} />
                    </div>
                    <div>
                        <input 
                        type="text"
                        placeholder='Email address'
                        value={email}
                        onChange={handleEmailChange} />
                    </div>

                    <div>
                        <input 
                        type="password"
                        placeholder='Create password'
                        value={password}
                        onChange={handlePasswordChange} />
                    </div>

                    <div className="rolecontainer">
                        <button 
                        className="rolebutton"
                        style={{
                            backgroundColor: !staffClicked ? "#3eac57" : "white",
                            color: !staffClicked ? "white" : "#3eac57"
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            setRole("staff");
                            if (volunteerclicked) {
                                setVolunteerClicked(!volunteerclicked);
                            }
                            setStaffClicked(true);
                        }}
                        >Staff
                        </button>
                        <button 
                        className="rolebutton"
                        style={{
                            backgroundColor: !volunteerclicked ? "#3eac57" : "white",
                            color: !volunteerclicked ? "white" : "#3eac57"
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            setRole("volunteer"); 
                            if (staffClicked) {
                                setStaffClicked(!staffClicked);
                            }
                            setVolunteerClicked(true);
                        }}
                        >Volunteer
                        </button>
                    </div>

                    <div>
                        <button
                        className='button'
                        type='button'
                        disabled={disableBtn}
                        onClick={handleRegister}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
  }
  
  export default SignUp