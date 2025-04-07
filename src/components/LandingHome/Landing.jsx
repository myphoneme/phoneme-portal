import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { FaRegThumbsUp, FaRegCommentAlt, FaShare, FaClock ,FaRegBookmark } from 'react-icons/fa';
import styles from './Landing.module.css';
// import { Link } from 'react-router-dom';  
import axios from "axios";
import { Link } from 'react-router-dom';
import { globalContext } from '../Context';

const NewsDashboard = () => {

  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [articles, setArticles] = useState([]);
  const { mode } = useContext(globalContext);
  const[isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    fetch('http://fastapi.phoneme.in/posts')
      .then((response) => response.json())
      .then((data) => {
        setFeaturedBlogs(data.slice(0,6));
      })
      .catch((error) => {
        console.error('Error fetching the API data:', error);
      });
  }, []); 

  useEffect(() => {
    axios.get("https://newsapi.org/v2/everything?q=trading&apiKey=75930e8401c24bca8b8ee0dfaec77cf9")
        .then(response => setArticles(response.data.articles))
        .catch(error => console.error(error));
}, []);

useEffect(() => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    setIsLoggedIn(true);
  }
}, []);
  return (
    <div
  className={`${styles.mainWrap} ${mode === 'light' ? "bg-light text-dark" : "text-light"}`}
  style={mode === 'dark' ? { backgroundColor: '#2c2c2c' } : {}}
>


    <Container  className={`${styles.mainContainer} ${mode === 'light' ? "bg-light text-dark" : "text-light"}`}
  style={mode === 'dark' ? { backgroundColor: '#2c2c2c', boxShadow: 'none' } : {}}
>
      <Row className="my-3">
        {/* Main News Section with Slider */}
        <Col md={8}>
        {articles.length > 20 && (
          <a href={articles[20].url} target="_blank" rel="noopener noreferrer" className={styles.newsLink}>
          <Card className={`${styles.bodyCard} ${mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`} style={mode === 'dark' ? { boxShadow: 'none'  } : {}}>
            <Card.Img variant="top" className={styles.mainImage} src={articles[20].urlToImage || "https://via.placeholder.com/150"} />
            <Card.Body>
              
            <Card.Title>{articles[20].title}</Card.Title>
              <div className="d-flex align-items-center">
                <FaRegThumbsUp className="me-2" /> 54
                <FaRegCommentAlt className="mx-2" /> 12
                <FaShare className="mx-2" />
              </div>
            </Card.Body>
          </Card>
          </a>
        )}
        </Col>
        {/* Top Stories and Market Section */}
        <Col md={4}>
          <Card className={`${styles.bodyCard} ${mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`} style={mode === 'dark' ? { boxShadow: 'none' } : {}} >
            <Card.Body>
              <Card.Title>Top Stories</Card.Title>
              <ul>
                <li>Justice Yashwant Varma stripped of judicial work: Delhi HC issues circular</li>
                <li>Can't speak whatever he wants: Maharashtra govt vs oppn over Kunal...</li>
                <li>VIDEO: Bulldozer Action Against Nagpur Violence Key Accused</li>
              </ul> 
            </Card.Body>
          </Card>
          <Card className={`${styles.bodyCard} ${mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`} style={mode === 'dark' ? { boxShadow: 'none' } : {}}>
            <Card.Body>
              <Card.Title>Markets</Card.Title>
              <p>NIFTY <span className="text-success">+1.24%</span></p>
              <p>SENSEX <span className="text-success">+1.29%</span></p>
              <p>Gold <span className="text-success">+0.28%</span></p>
              {/* <p>Silver <span className="text-success">+0.80%</span></p>
              <p>USD/INR <span className="text-danger">-0.28%</span></p> */}
            </Card.Body>
          </Card>
        
        </Col>
      </Row>

      {/* Additional News and Ads */}
      <Row className='mb-4'>
        <Col md={4}>
        {articles.length > 0 && (
            <Link to={articles[0].url} target="_blank" className="text-decoration-none h-100">
          <Card className={`${styles.bodyCard} ${styles.heightFul} ${mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`} style={mode === 'dark' ? { boxShadow: 'none' } : {}}>
            <Card.Img variant="top" className={styles.imgWidth} src={articles[0].urlToImage || "https://via.placeholder.com/150"} />
            <Card.Body>
            {articles.length > 0 && <Card.Title>{articles[0].title}</Card.Title>}
            </Card.Body>
          </Card>
          </Link>
        )}
        </Col>
        <Col md={4}>
        {articles.length > 1 && (
            <Link to={articles[1].url} target="_blank" className="text-decoration-none h-100">
          <Card className={`${styles.bodyCard} ${styles.heightFul}  ${mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`} style={mode === 'dark' ? { boxShadow: 'none' } : {}}>
            <Card.Img variant="top" className={styles.imgWidth} src={articles[1].urlToImage || "https://via.placeholder.com/150"} />
          
            <Card.Body>
            {articles.length > 1 && <Card.Title>{articles[1].title}</Card.Title>}
            </Card.Body>
          </Card>
           </Link>
          )}
        </Col>
        <Col md={4}>
        {articles.length > 2 && (
            <Link to={articles[2].url} target="_blank" className="text-decoration-none h-100">
          <Card className={`${styles.bodyCard} ${styles.heightFul}  ${mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`} style={mode === 'dark' ? { boxShadow: 'none' } : {}}>
            <Card.Img variant="top" className={styles.imgWidth} src={articles[2].urlToImage || "https://via.placeholder.com/150"} />
           <Card.Body>
           {articles.length > 2 && <Card.Title>{articles[2].title}</Card.Title>}
            </Card.Body>
          </Card>
          </Link>
          )} 
        </Col>
      </Row>

      <Row>
        <Col md={6}>
        {articles.length > 3 && (
            <Link to={articles[3].url} target="_blank" className="text-decoration-none">
          <Card className={`${styles.bodyCard} ${styles.heightFul}  ${mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`} style={mode === 'dark' ? { boxShadow: 'none' } : {}}>
            <Card.Img variant="top" className={styles.mainImage} src={articles[3].urlToImage || "https://via.placeholder.com/150"} />
            <Card.Body>
              {articles.length > 3 && <Card.Title>{articles[3].title}</Card.Title>}
            </Card.Body>
          </Card>
          </Link>
          )}
        </Col>
        <Col md={6}>  {articles.length > 4 && (
            <Link to={articles[4].url} target="_blank" className="text-decoration-none">
          <Card className={`${styles.bodyCard} ${styles.heightFul}  ${mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`} style={mode === 'dark' ? { boxShadow: 'none' } : {}}>
            <Card.Img variant="top" className={styles.mainImage}  src={articles[4].urlToImage || "https://via.placeholder.com/150"}/>
            <Card.Body>
              {articles.length > 4 && <Card.Title>{articles[4].title}</Card.Title>}
            </Card.Body>
          </Card>
          </Link>
          )}
        </Col>
      </Row>

      {/* Featured Blogs Section  */}
      <div className="mt-5">
            <h2 className="d-flex align-items-center mb-4">
            {/* <FaArrowTrendUp className="text-primary me-2" size={24} /> */}
            <span className="fw-bold">Featured Blogs</span>
            </h2>
            <Row>
            {featuredBlogs.map((blog, index) => (
                <Col key={index} lg={4} md={6} className="mb-4">
                <Card className={`${styles.bodyCard} ${mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`} style={mode === 'dark' ? { boxShadow: 'none' } : {}}>
                    <Card.Img 
                    variant="top" 
                    src={`http://fastapi.phoneme.in/${blog.image}`}
                    style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <Card.Body>
                    <Badge bg="primary" className="mb-2">{blog.category.category_name}</Badge>
                    <Card.Title className="fw-bold mb-3">{blog.title}</Card.Title>
                    <Card.Text >{blog.post ?(
                      <span dangerouslySetInnerHTML={{ __html: blog.post.substring(0, 150) + "..." }} />
                      //  blog.post.substring(0, 150) + "..." : "Content not available"}</Card.Text>
                    ) : (
                      "Content not available"
                    )}
                  </Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="d-flex align-items-center text-muted">
                        <FaClock size={14} />
                        <small className="ms-2">2 hours ago</small>
                        </div>
                        {/* Link to the individual blog details page */}
                    {/* <Link to={`/details/${blog.id}`} className="btn btn-success mt-3"> */}
                    <Link to = '/login' className='btn btn-success mt-3'>
                    {/* <Link to={isLoggedIn ? `/details/${blog.id}` : '/login'} className='btn btn-success mt-3'> */}
                      Read More
                    </Link>
                        {/* <FaRegBookmark className="text-muted cursor-pointer" size={16} /> */}
                    </div>
                    
                    </Card.Body>
                </Card>
                </Col>
            ))}
            </Row>
        </div>
          {/* Some More News Section */}
        <Row className='my-4'>
          <h2>
          <span className="fw-bold">Some More News</span>
          </h2>
        <Col md={3}>
        {articles.length > 5 && (
           <Link to={articles[5].url} target="_blank" className="text-decoration-none h-100">
          <Card className={`${styles.bodyCard} ${styles.heightFul} ${mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`} style={mode === 'dark' ? { boxShadow: 'none' } : {}}>
            <Card.Img variant="top" className={styles.imgWidth} src={articles[5].urlToImage || "https://via.placeholder.com/150"} />
            <Card.Body>
            <Card.Title>{articles[5].title}</Card.Title>
            </Card.Body>
          </Card>
          </Link>
        )}
        </Col>
        <Col md={3}>
        {articles.length > 6 && (
          <Link to={articles[6].url} target="_blank" className="text-decoration-none h-100">
          <Card className={`${styles.bodyCard} ${styles.heightFul} ${mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`} style={mode === 'dark' ? { boxShadow: 'none' } : {}}>
            <Card.Img variant="top" className={styles.imgWidth} src={articles[6].urlToImage || "https://via.placeholder.com/150"} />
            <Card.Body>
            <Card.Title>{articles[6].title}</Card.Title>
            </Card.Body>
          </Card>
          </Link>
        )}
        </Col>
        <Col md={6}>
        {articles.length > 7 && (
          <Link to={articles[7].url} target="_blank" className="text-decoration-none h-100">
          <Card className={`${styles.bodyCard} ${styles.heightFul} ${mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`} style={mode === 'dark' ? { boxShadow: 'none' } : {}}>
            <Card.Img variant="top" className={styles.imgWidth}  src={articles[7].urlToImage || "https://via.placeholder.com/150"} />
            <Card.Body>
            <Card.Title>{articles[7].title}</Card.Title>
            </Card.Body>
          </Card>
           </Link>
        )}
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default NewsDashboard;
