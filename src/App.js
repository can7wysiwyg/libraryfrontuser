import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import NavBar from "./components/header/Navbar"
import Home from "./components/pages/Home"
import Register from "./components/pages/Register"
import Login from "./components/pages/Login"
import Choices from "./components/pages/Choices"
import Author from "./components/pages/Author"
import AuthorBooks from "./components/pages/AuthorBooks"

function App() {
  return(<>
  <Router>
    <NavBar />
    <Routes>
 
 <Route path="/" element={<Home />} />
 <Route path="/register" element={<Register />} />
 <Route path="/login" element={<Login />} />
<Route path="/choices" element={<Choices />} />
<Route path="/show_author/:id" element={<Author />} />
<Route path="/author_books/:id" element={<AuthorBooks />} />

    </Routes>



  </Router>
  
  
  </>)
}

export default App