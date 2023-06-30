import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useContext(AuthContext);
    const navigation = useNavigate();

    const handleLogin = () => {
        login(email, password);
        //redirect to homepage
        navigation('/');
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    return (
        <div className='default'>
            <header className='header'>
                <h1 className='formHeading'>Sign in</h1>
            </header>

            <main className='container'>
                <form className='formcontainer'>
                    <div>
                        <input 
                        type="text"
                        placeholder='Email Address'
                        value={email}
                        onChange={handleEmailChange} />
                    </div>

                    <div>
                        <input 
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={handlePasswordChange} />
                    </div>

                    <div>
                        <button
                        className='button'
                        type='button'
                        disabled={email==='' || password === ''}
                        onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div>
                    <NavLink to='/signup' style={{ textDecoration: 'none' }}>
                        <p className='bottomtext'>Don't have an account yet? Register!</p>
                    </NavLink>
                    <NavLink to='/reset' style={{ textDecoration: 'none' }}>
                        <p className='bottomtext'>Forgot Password?</p>
                    </NavLink>
                </div>
            </main>
        </div>
    );
};

export default Login