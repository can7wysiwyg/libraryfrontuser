import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import NavBar from "./components/header/Navbar"
import Home from "./components/pages/Home"
import Register from "./components/pages/Register"
import Login from "./components/pages/Login"
import Choices from "./components/pages/Choices"
import Author from "./components/pages/Author"
import AuthorBooks from "./components/pages/AuthorBooks"
import BooksByGenre from "./components/pages/BooksByGenre"
import BookSingle from "./components/pages/BookSingle"
import MyInfo from "./components/pages/MyInfo"
import MyTrolley from "./components/pages/MyTrolley"
import MyReadings from "./components/pages/MyReadings"

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
<Route path="/books_by_genre/:id" element={<BooksByGenre />} />
<Route path="/single_book/:id" element={<BookSingle />} />
<Route path="/my_info" element={<MyInfo />} />
<Route path="/my_trolley" element={<MyTrolley />} />
<Route path="/my_readings" element={<MyReadings />} />


    </Routes>



  </Router>
  
  
  </>)
}

export default App