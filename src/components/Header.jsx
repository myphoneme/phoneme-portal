import React from 'react';
import { Navbar, Container, Form, Button, Nav, NavLink } from 'react-bootstrap';
import { FaNewspaper, FaSearch, FaBell, FaCog, FaUser, FaPencilAlt, FaMoon} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";

function Header() {
  const navigate = useNavigate();

  const handleCreateBlog = () => {
    navigate('/createblog');
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm sticky-top z-index-999">
      <Container fluid className="px-4">
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <FaNewspaper className="text-primary" size={28} />
          <span className="ms-2 fw-semibold fs-4">Our Blogs</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link href="#" className="fw-medium">BlogList</Nav.Link>
            <Nav.Link href="#" className="fw-medium">Category List</Nav.Link>
            <Nav.Link href="#" className="fw-medium"></Nav.Link>
            <Nav.Link href="#" className="fw-medium"></Nav.Link>
          </Nav>
          <Form className="d-flex align-items-center">
            <div className="position-relative me-3">
              <Form.Control
                type="search"
                placeholder="Search news..."
                className="ps-4 rounded-pill"
                style={{ width: '300px', backgroundColor: '#f8f9fa' }}
              />
              <FaSearch className="position-absolute text-muted" style={{ left: '5px', top: '20px' }} />
            </div>
            <Button variant="light" className="rounded-circle p-2">
                <FaMoon size={18} />
              </Button>
            <div className="d-flex gap-3">
            <SignedOut>
              <Button variant="light" className="rounded-circle p-2" onClick={() => navigate('/login')}>
                <FaPencilAlt size={18} />
              </Button>
              <Button variant="light" className="rounded-circle p-2" onClick={() => navigate('/login')}> 
                Login
              </Button>
              </SignedOut> 
              <SignedIn>
              {/* <Button variant="light" className="rounded-circle p-2">
                <FaBell size={18} />
              </Button> */}
              <Button variant="light" className="rounded-circle p-2"  onClick={handleCreateBlog}  >
                <FaPencilAlt size={18} />
              </Button>
              {/* <Button variant="light" className="rounded-circle p-2">
                <FaCog size={18} />
              </Button> */}
              <Button variant="light" className="rounded-circle p-2">
              <UserButton />  
              </Button>
              </SignedIn>           
            </div>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;