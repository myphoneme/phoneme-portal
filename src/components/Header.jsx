import React, { useContext, useEffect, useRef, useState } from 'react';
import { Navbar, Container, Form, Button, Nav, ListGroup } from 'react-bootstrap';
import { FaNewspaper, FaSearch, FaMoon, FaSun, FaPencilAlt} from 'react-icons/fa';  // Ensure FaSun is imported
import { useNavigate, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { globalContext } from "./Context";
import '../index.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const { mode, setMode } = useContext(globalContext);  
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const searchRef = useRef(null);

  const handleCreateBlog = () => {
    navigate('/createblog');
  };

  const handleBlogListClick = () => {
    navigate('/list');
  };

  const handleCategoryListClick = () => {
    navigate('/categorieslist');
  };

  useEffect(() => {
    fetch("http://192.168.1.6:7100/posts")
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error("Error fetching blogs:", error));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredBlogs([]);
      setShowDropdown(false);
      return;
    }

    const filtered = blogs.filter(blog => 
      blog.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBlogs(filtered);
    setShowDropdown(true);
  };

  const handleBlogClick = (blogId) => {
    setShowDropdown(false);
    setSearchQuery('');
    navigate(`/details/${blogId}`); // Adjust this path according to your routing setup
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      const filtered = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      navigate('/search-results', { state: { results: filtered } });
    }
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
          <SignedIn>
          <Form className="d-flex align-items-center" onSubmit={handleSearchSubmit}>
            <div className="position-relative me-3" ref={searchRef}>
              <Form.Control
                type="search"
                placeholder="Search news..."
                value={searchQuery}
                onChange={handleSearch}
                className={`ps-5 rounded-pill ${mode === 'light' ? 'bg-light' : 'bg-secondary text-light'}`}
                style={{ width: '300px' }}
              />
              <FaSearch
                className={`position-absolute ${mode === 'light' ? 'text-muted' : 'text-light'}`}
                style={{ left: '15px', top: '25px',   transform: 'translateY(-50%)', cursor: 'pointer' }}
                onClick={handleSearchSubmit}
              />
              {showDropdown && filteredBlogs.length > 0 && (
                <ListGroup 
                  // className="position-absolute w-100 mt-1 shadow-lg"
                  // style={{ maxHeight: '300px', overflowY: 'auto', zIndex: 1000 }}
                  className="position-absolute bg-white shadow-lg w-100"
                   style={{
                    top: "100%",  // Pushes it below the search bar
                    left: 0,
                    zIndex: 1050,  // Ensures it stays on top
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}
                >
                  {filteredBlogs.map((blog) => (
                    <ListGroup.Item 
                      key={blog.id}
                      action
                      onClick={() => handleBlogClick(blog.id)}
                      className={`${mode === 'dark' ? 'bg-dark text-light' : ''} border-bottom`}
                      style={{ cursor: 'pointer',
                      borderColor: mode === 'dark' ? '#555' : '#ddd'
                       }}
                    >
                      {blog.title}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            

            </div>
            </Form>
            </SignedIn>

            {/* Theme Toggle Button */}
            <div className="d-flex align-items-center gap-2 left-btn">
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
                  onClick={() => navigate('/login', { state: { from: location.pathname } })}
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
            </div>
       
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