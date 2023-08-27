import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import NavBar from "./components/header/Navbar"
import Home from "./components/pages/Home"
import Register from "./components/pages/Register"
import Login from "./components/pages/Login"

function App() {
  return(<>
  <Router>
    <NavBar />
    <Routes>
 
 <Route path="/" element={<Home />} />
 <Route path="/register" element={<Register />} />
 <Route path="/login" element={<Login />} />


    </Routes>



  </Router>
  
  
  </>)
}

export default App