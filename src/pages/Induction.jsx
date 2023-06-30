import { NavLink } from "react-router-dom"
import ActivitiesDisplay from "../components/ActivitiesDisplay"
import Header from "../components/Header"

function Induction() {
    return (
        <div className='default'>
            <header className='header'>
                <Header/>
                <h1 className='formHeading'>Homepage</h1>
            </header>

            <main className='container'>
                <div className='container'>
                    <h2>Induction Module</h2>
                    <h4>So you wanna recycle some ewaste and help save the planet, eh? 
                        Well you’ve come to the right place! But before you get your hands 
                        dirty, it’s important to watch our induction module so that you can do 
                        your best work while you’re with us.
                    </h4>
                    <h3 style={{color: '#3eac57'}}>
                        Click on the induction module below to get started!
                    </h3>
                </div>
                <div className='container'>
                    <NavLink to='/ourmission'>
                        <img src='https://ewasteconnection.com/wp-content/uploads/2020/10/BC481343-BAD2-4113-98DE-148931C2F68D_4_5005_c.jpeg' 
                        alt="ewaste" 
                        style={{ width: '40%', height: 200, border: '1px solid' }}/>
                    </NavLink>
                </div>
                <div className="container">
                    <h2>Today's Activities</h2>
                    <ActivitiesDisplay/>
                </div>
            </main>
        </div>
    );
};

export default Induction