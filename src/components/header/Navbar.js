import { Navbar, Nav } from 'react-bootstrap';
import "../styles/navbar.css"
import { useContext } from 'react';
import {GlobalState} from "../GlobalState"


function NavBar() {
 const state = useContext(GlobalState)
 const[isLogged] = state.userApi.isLogged
 const[isUser] = state.userApi.isUser
 const[onSuspension] = state.userApi.onSuspension

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


            {/* <NavDropdown title="Company" id="navbarDropdownMenuLink" className="mx-2">
              <NavDropdown.Item href="#">Blog</NavDropdown.Item>
              <NavDropdown.Item href="#">About Us</NavDropdown.Item>
              <NavDropdown.Item href="#">Contact us</NavDropdown.Item>
            </NavDropdown> */}

            {isLogged === true ? "" :   <Nav.Link href="/choices" className="mx-2">LOGIN-REGISTER</Nav.Link>
 }
          </Nav>
          
        </Navbar.Collapse>
      </div>
    </Navbar>
    
    
    </>)
}

export default NavBar
