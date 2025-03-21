import React from 'react';
import { Navbar, Container, Form, Button, Nav } from 'react-bootstrap';
import { FaNewspaper, FaMagnifyingGlass, FaBell, FaGear, FaUser } from 'react-icons/fa6';

function Header() {
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
            <Nav.Link href="#" className="fw-medium"></Nav.Link>
            <Nav.Link href="#" className="fw-medium"></Nav.Link>
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
              <FaMagnifyingGlass className="position-absolute text-muted" style={{ left: '5px', top: '20px' }} />
            </div>
            
            <div className="d-flex gap-3">
              <Button variant="light" className="rounded-circle p-2">
                <FaBell size={18} />
              </Button>
              <Button variant="light" className="rounded-circle p-2">
                <FaGear size={18} />
              </Button>
              <Button variant="light" className="rounded-circle p-2">
                <FaUser size={18} />
              </Button>
            </div>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;