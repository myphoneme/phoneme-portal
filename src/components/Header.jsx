import React, { useContext } from 'react';
import { Navbar, Container, Form, Button, Nav } from 'react-bootstrap';
import { FaNewspaper, FaSearch, FaMoon, FaSun, FaPencilAlt} from 'react-icons/fa';  // Ensure FaSun is imported
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { globalContext } from "./Context";

function Header() {
  const navigate = useNavigate();
  const { mode, setMode } = useContext(globalContext);  

  const handleCreateBlog = () => {
    navigate('/createblog');
  };

  const handleBlogListClick = () => {
    navigate('/list');
  };

  const handleCategoryListClick = () => {
    navigate('/categorieslist');
  };

  return (
    <Navbar
      bg={mode === 'light' ? 'white' : 'dark'}
      expand="lg"
      className={`shadow-sm sticky-top z-index-999 ${mode === 'dark' ? 'navbar-dark' : ''}`}
    >
      <Container fluid className="px-4">
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <FaNewspaper className="text-primary" size={28} />
          <span className={`ms-2 fw-semibold fs-4 ${mode === 'light' ? 'text-dark' : 'text-light'}`}>Our Blogs</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <SignedIn>
              <Nav.Link href="#" className={mode === 'light' ? 'text-dark' : 'text-light fw-medium'} onClick={handleBlogListClick}>Blog List</Nav.Link>
              <Nav.Link href="#" className={mode === 'light' ? 'text-dark' : 'text-light fw-medium'} onClick={handleCategoryListClick}>Category List</Nav.Link>
            </SignedIn>
          </Nav>
          <Form className="d-flex align-items-center">
            <div className="position-relative me-3">
              <Form.Control
                type="search"
                placeholder="Search news..."
                className={`ps-4 rounded-pill ${mode === 'light' ? 'bg-light' : 'bg-secondary text-light'}`}
                style={{ width: '300px' }}
              />
              <FaSearch
                className={`position-absolute ${mode === 'light' ? 'text-muted' : 'text-light'}`}
                style={{ left: '5px', top: '20px' }}
              />
            </div>

            {/* Theme Toggle Button */}
            <Button
              variant={mode === 'light' ? 'light' : 'secondary'}
              style={{ backgroundColor: 'transparent', border:'0', margin:'0' }}
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} // This will toggle the theme
            >
              {mode === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
            </Button>

            <div className="d-flex gap-3">
              <SignedOut>
                <Button
                  variant={mode === 'light' ? 'light' : 'secondary'}
                  style={{ backgroundColor: 'transparent', border:'0',  margin:'0' }}
                  onClick={() => navigate('/login')}
                >
                  <FaPencilAlt size={18} />
                </Button>
                <Button
                  variant={mode === 'light' ? 'light' : 'secondary'}
                  style={{ backgroundColor: 'transparent', border:'0', margin:'0' }}
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              </SignedOut>

              <SignedIn>
                <Button
                  variant={mode === 'light' ? 'light' : 'secondary'}
                  style={{ backgroundColor: 'transparent', border:'0', margin:'0' }}
                  onClick={handleCreateBlog}
                >
                  <FaPencilAlt size={18} />
                </Button>
                <Button
                  variant={mode === 'light' ? 'light' : 'secondary'}
                  style={{ backgroundColor: 'transparent', border:'0', color:'#000', margin:'0' }}
                >
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




// import React from 'react';
// import { Navbar, Container, Form, Button, Nav, NavLink } from 'react-bootstrap';
// import { FaNewspaper, FaSearch, FaBell, FaCog, FaUser, FaPencilAlt, FaMoon} from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";

// function Header() {
//   const navigate = useNavigate();

//   const handleCreateBlog = () => {
//     navigate('/createblog');
//   };

//   const handleBlogListClick = () => {
//     navigate('/list');
//   };

//   const handleCategoryListClick = () => {
//     navigate('/categorieslist');
//   };

//   return (
//     <Navbar bg="white" expand="lg" className="shadow-sm sticky-top z-index-999">
//       <Container fluid className="px-4">
//         <Navbar.Brand href="#" className="d-flex align-items-center">
//           <FaNewspaper className="text-primary" size={28} />
//           <span className="ms-2 fw-semibold fs-4">Our Blogs</span>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav className="me-auto">
//           <SignedIn>
//             <Nav.Link href="#" className="fw-medium" onClick={handleBlogListClick}>BlogList</Nav.Link>
//             <Nav.Link href="#" className="fw-medium" onClick={handleCategoryListClick}>Category List</Nav.Link>
//             {/* <Nav.Link href="#" className="fw-medium"></Nav.Link> */}
//             {/* <Nav.Link href="#" className="fw-medium"></Nav.Link> */}
//           </SignedIn>
//           </Nav>
//           <Form className="d-flex align-items-center">
//             <div className="position-relative me-3">
//               <Form.Control
//                 type="search"
//                 placeholder="Search news..."
//                 className="ps-4 rounded-pill"
//                 style={{ width: '300px', backgroundColor: '#f8f9fa' }}
//               />
//               <FaSearch className="position-absolute text-muted" style={{ left: '5px', top: '20px' }} />
//             </div>
//             <Button style={{ backgroundColor: 'transparent', border:'0', color:'#000', margin:'0' }}>
//                 <FaMoon size={18} />
//               </Button>
//             <div className="d-flex gap-3">
//             <SignedOut>
//               <Button  onClick={() => navigate('/login')}>
//                 <FaPencilAlt size={18} />
//               </Button>
//               <Button onClick={() => navigate('/login')}> 
//                 Login
//               </Button>
//               </SignedOut> 
//               <SignedIn>

//               {/* <Button variant="light" className="rounded-circle p-2">
//                 <FaBell size={18} />
//               </Button> */}

//               <Button  onClick={handleCreateBlog} style={{ backgroundColor: 'transparent', border:'0', color:'#000', margin:'0' }}>
//                 <FaPencilAlt size={18} />
//               </Button>

//               {/* <Button variant="light" className="rounded-circle p-2">
//                 <FaCog size={18} />
//               </Button> */}

//               <Button style={{ backgroundColor: 'transparent', border:'0', color:'#000', margin:'0'}}>
//               <UserButton />  
//               </Button>
//               </SignedIn>           
//             </div>
//           </Form>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }
// export default Header;