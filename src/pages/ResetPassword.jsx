import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import '../App.css';
import { AuthContext } from "../Contexts/AuthContext";

function ResetPassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const {resetPassword} = useContext(AuthContext);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setNewPassword(event.target.value);
    }
    return (
        <div className='default'>
            <header className='header'>
                <h1 className='formHeading'>Reset Password</h1>
            </header>

            <main className='container'>
                <form className='formcontainer'>
                    <div>
                        <input 
                        type="text"
                        placeholder='Email'
                        value={email}
                        onChange={handleEmailChange} />
                    </div>

                    <div>
                        <input 
                        type="password"
                        placeholder='New Password'
                        value={newPassword}
                        onChange={handlePasswordChange} />
                    </div>

                    <div>
                        <button
                        className='button'
                        type='button'
                        disabled={email==='' || newPassword === ''}
                        onClick={() => {resetPassword(email, newPassword);}}
                        >
                            Reset
                        </button>
                    </div>
                </form>
                <div>
                    <NavLink to='/' style={{ textDecoration: 'none' }}>
                        <p className='bottomtext'>Log In</p>
                    </NavLink>
                </div>
            </main>
        </div>
    )
  }
  
  export default ResetPassword