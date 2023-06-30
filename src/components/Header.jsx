import axios from "axios";
import { useContext, useEffect, useState } from "react";
import '../App.css';
import { AuthContext } from "../Contexts/AuthContext";
import SERVER_URL from "../config/config";
import { useNavigate } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';

function Header() {
    const [open, setOpen] = useState(false);
    const [points, setPoints] = useState('');
    const {userToken, logout} = useContext(AuthContext);
    const [emailFlag, setEmailFlag] = useState(false);
    const message = "Your points have reached above 500. Keep it up! See the staff at E-Waste to get your reward!";

    const navigation = useNavigate();

    const handleClick = () => {
        setOpen(!open);
    };

    const handleNavigation = (to) => {
        switch(to) {
            case '/':
                navigation('/');
                break;
            case '/activities':
                navigation('/activities');
                break;
            default:
                navigation('/');
                break;
        }
    }

    const handleLogout = () => {
        logout();
        //redirect to login
        navigation('/');
    }

    const getUserPoints = async () => {
        await axios.get(`${SERVER_URL}/user/points`, {headers: {
            "Authorization": `Basic ${userToken}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }})
        .then(response => {
            setPoints(response.data.points);        
        })
        .catch(
            e => {
                console.log("Error: " + e.response.data.message);
            }
        );
    }

    const getMail = async () => {
        if (!emailFlag) {
            await axios.post(`${SERVER_URL}/user/sendemail`, {message}, {headers: {
                "Authorization": `Basic ${userToken}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }})
            .then(response => {
                console.log(response.data.message);
                setEmailFlag(true);
            })
            .catch (
                error => {
                    console.log('Error receiving email: ' + error.response.data.message);
                }
            );
        }
    };

    useEffect(() => {
        getUserPoints();
    });

    useEffect(() => {
        getMail();
    }, [emailFlag])

    return (
        <div className="header-component">
            <div className="leftContainer">
                <span className={`hamburger ${open ? 'open' : ''}`} onClick={handleClick}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </span>
                {open && (
                <div className="overlay">
                    <ul className="menu">
                        <li onClick={() => {handleNavigation('/')}} className="menuitem">Induction</li>
                        <li onClick={() => {handleNavigation('/activities')}} className="menuitem">Activities</li>
                        <li className="menuitem" 
                        id="logout"
                        onClick={handleLogout}>Logout</li>
                    </ul>
                </div>
                )}
            </div>

            <div className="containerWrapper">
                <div className="rightContainer">
                    <h2 style={{color: open ? 'white' : 'black'}}>{points}</h2>
                    <i className="fa fa-star fa-2x" style={{color: open && 'white', marginRight: 30}}></i>
                </div>
            </div>
        </div>
    )
}
  
export default Header