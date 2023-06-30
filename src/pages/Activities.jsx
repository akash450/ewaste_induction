import ActivitiesDisplay from "../components/ActivitiesDisplay"
import Header from "../components/Header"

function Activities() {
    return (
      <div className='default'>
        <header className='header'>
          <Header/>
          <h1 className='formHeading'>Activities</h1>
        </header>
          
        <main className='container'>
            <ActivitiesDisplay/>
        </main>
      </div>
    )
  }
  
  export default Activities