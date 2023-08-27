import { Navbar, Nav } from 'react-bootstrap';
import "../styles/navbar.css"


function NavBar() {
    return(<>
    <Navbar bg="info" variant="light" expand="lg" className="p-3">
      <div className="container-fluid">
        <Navbar.Brand href="#">VirtualLibrary</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNavDropdown" />
        <Navbar.Collapse id="navbarNavDropdown">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="mx-2 active">Home</Nav.Link>
            <Nav.Link href="/contact" className="mx-2">Contact Us</Nav.Link>
            <Nav.Link href="/about" className="mx-2">About Us</Nav.Link>
            {/* <NavDropdown title="Company" id="navbarDropdownMenuLink" className="mx-2">
              <NavDropdown.Item href="#">Blog</NavDropdown.Item>
              <NavDropdown.Item href="#">About Us</NavDropdown.Item>
              <NavDropdown.Item href="#">Contact us</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav className="ms-auto d-none d-lg-inline-flex">
            <Nav.Link href="#" target="_blank" className="mx-2"><i className="fab fa-google-plus-square"></i></Nav.Link>
            <Nav.Link href="#" target="_blank" className="mx-2"><i className="fab fa-twitter"></i></Nav.Link>
            <Nav.Link href="#" target="_blank" className="mx-2"><i className="fab fa-facebook-square"></i></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
    
    
    </>)
}

export default NavBar
