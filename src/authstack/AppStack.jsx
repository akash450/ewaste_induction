import { BrowserRouter, Route, Routes } from "react-router-dom"
import Activities from "../pages/Activities"
import AddActivityForm from "../pages/Admin/AddActivityForm"
import AddSteps from "../pages/Admin/AddSteps"
import Induction from "../pages/Induction"
import Conduct from "../pages/Induction Module/Conduct"
import OurMission from "../pages/Induction Module/OurMission"
import Quiz from "../pages/Induction Module/Quiz"
import Safety from "../pages/Induction Module/Safety"
import Sorting from "../pages/Induction Module/Sorting.jsx"
import PerformSteps from "../pages/PerformSteps"

function AppStack() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Induction/>} />
                <Route path="/activities" element={<Activities/>} />
                <Route path="/addactivity" element={<AddActivityForm/>} />
                <Route path="/addsteps/:id" element={<AddSteps/>} />
                <Route path="/performsteps" element={<PerformSteps/>} />
                <Route path="/ourmission" element={<OurMission/>} />
                <Route path="/safety" element={<Safety/>} />
                <Route path="/conduct" element={<Conduct/>} />
                <Route path="/sorting" element={<Sorting/>} />
                <Route path="/quiz" element={<Quiz/>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default AppStack