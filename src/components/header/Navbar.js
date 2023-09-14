import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import "../styles/navbar.css"
import { useContext, useEffect, useState } from 'react';
import {GlobalState} from "../GlobalState"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { getCart, itemTotal } from '../api/TrolleyApi';




function NavBar() {
 const state = useContext(GlobalState)
 const[isLogged] = state.userApi.isLogged
 const[isUser] = state.userApi.isUser
 const[onSuspension] = state.userApi.onSuspension
 const[genres] = state.genresApi.genres
 const [items, setItems] = useState([]);

 useEffect(() => {
  const cartItems = getCart().map(item => ({ ...item, quantity: 1 }));
  setItems(cartItems);
}, []);




const showTrolley = () => {

  if(items.length !== 0) {

    return(<>
    <nav>
      <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>

      <li className='nav-item'>
                  <a className="nav-link pe-3 me-4 fw-bold active" aria-current="page" href="/my_trolley" >
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <span> {itemTotal()} </span>
                      </a>
      
                  </li>



      </ul>
    </nav>
    
    
    </>)

  } else{
    return(<>
    
    
    
    </>)
  }

}


 const logoutUser = () => {
  localStorage.removeItem("usertoken")
  window.location.href = "/"

 }


 const userRouter = () => {
  return(<>

<nav>
              <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                  <li className='nav-item'>
                  <a className="nav-link pe-3 me-4 fw-bold active" aria-current="page" href="/my_readings" >
                        MY READINGS
                      </a>
      
                  </li>
                  <li className='nav-item'>
                  <a className="nav-link pe-3 me-4 fw-bold active" aria-current="page" href="/my_info" >
                        MY INFO
                      </a>
      
                  </li>

                  {showTrolley()}
                  <li className='nav-item'>
              <a className="nav-link pe-3 me-4 fw-bold active" aria-current="page" href="/" onClick={logoutUser}>
                    LOGOUT
                  </a>
                  </li>
  
      
                  
              </ul>
      
          </nav>
  </>)
 }


 const suspendedRouter = () => {
  return(<>

<nav>
              <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                  <li className='nav-item'>
                  <a className="nav-link pe-3 me-4 fw-bold active" aria-current="page" href="/submit_report" >
                        SUBMIT REPORT
                      </a>
      
                  </li>
                  
                  <li className='nav-item'>
              <a className="nav-link pe-3 me-4 fw-bold active" aria-current="page" href="/" onClick={logoutUser}>
                    LOGOUT
                  </a>
                  </li>
  
      
                  
              </ul>
      
          </nav>
  </>)
 }





 const MelonFriend = () =>  {
  if(isUser) {
    return userRouter()
  } else if(onSuspension) {
    return suspendedRouter()
  }
 }


 

    return(<>
    <Navbar bg="info" variant="light" expand="lg" className="p-3">
      <div className="container-fluid">
        <Navbar.Brand href="#">VirtualLibrary</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNavDropdown" />
        <Navbar.Collapse id="navbarNavDropdown">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="mx-2 active">Home</Nav.Link>
                
                {MelonFriend()}

            <Nav.Link href="/contact" className="mx-2">Contact Us</Nav.Link>
            <Nav.Link href="/about" className="mx-2">About Us</Nav.Link>


            <NavDropdown title="Book Genres" id="navbarDropdownMenuLink" className="mx-2">
            
              {
                genres?.map((genre) => (
                  <NavDropdown.Item key={genre._id} href={`/books_by_genre/${genre._id}`}>{genre.genreName}</NavDropdown.Item>
                ))
              }
              
            </NavDropdown>

            {isLogged === true ? "" :   <Nav.Link href="/choices" className="mx-2">LOGIN-REGISTER</Nav.Link>
 }
          </Nav>
          
        </Navbar.Collapse>
      </div>
    </Navbar>
    
    
    </>)
}

export default NavBar
