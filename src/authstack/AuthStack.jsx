import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/Login"
import ResetPassword from "../pages/ResetPassword"
import SignUp from "../pages/SignUp"

function AuthStack() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/reset" element={<ResetPassword/>} />
              <Route path="/signup" element={<SignUp/>} />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AuthStack