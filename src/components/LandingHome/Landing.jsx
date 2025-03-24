
import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { FaRegThumbsUp, FaRegCommentAlt, FaShare } from 'react-icons/fa';
import styles from './Landing.module.css';


const NewsDashboard = () => {
  return (
    <div className={styles.mainWrap}>

    <Container className={styles.mainContainer}>
      <Row className="my-3">
        {/* Main News Section with Slider */}
        <Col md={8}>
          <Card className={styles.bodyCard}>
            <Card.Img variant="top" className={styles.mainImage} src="https://c.ndtvimg.com/2024-05/jcmupb7_ms-dhoni-bcci_625x300_20_May_24.jpg?im=FeatureCrop,algorithm=dnn,width=806,height=605" />
            <Card.Body>
              <Card.Title>MS Dhoni Proves His Class With a Humble Gesture for CSK Captain Ruturaj Gaikwad in IPL 2025</Card.Title>
              <div className="d-flex align-items-center">
                <FaRegThumbsUp className="me-2" /> 54
                <FaRegCommentAlt className="mx-2" /> 12
                <FaShare className="mx-2" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* Top Stories and Market Section */}
        <Col md={4}>
          <Card className={styles.bodyCard}>
            <Card.Body>
              <Card.Title>Top Stories</Card.Title>
              <ul>
                <li>Justice Yashwant Varma stripped of judicial work: Delhi HC issues circular</li>
                <li>Can't speak whatever he wants: Maharashtra govt vs oppn over Kunal...</li>
                <li>VIDEO: Bulldozer Action Against Nagpur Violence Key Accused</li>
              </ul> 
            </Card.Body>
          </Card>
          <Card className={styles.bodyCard}>
            <Card.Body>
              <Card.Title>Markets</Card.Title>
              <p>NIFTY <span className="text-success">+1.24%</span></p>
              <p>SENSEX <span className="text-success">+1.29%</span></p>
              {/* <p>Gold <span className="text-success">+0.28%</span></p>
              <p>Silver <span className="text-success">+0.80%</span></p>
              <p>USD/INR <span className="text-danger">-0.28%</span></p> */}
            </Card.Body>
          </Card>
          <Card className={styles.bodyCard}>
            <Card.Body>
              <Card.Title>Markets</Card.Title>
              <p>NIFTY <span className="text-success">+1.24%</span></p>
              <p>SENSEX <span className="text-success">+1.29%</span></p>
              {/* <p>Gold <span className="text-success">+0.28%</span></p>
              <p>Silver <span className="text-success">+0.80%</span></p>
              <p>USD/INR <span className="text-danger">-0.28%</span></p> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Additional News and Ads */}
      <Row>
        <Col md={4}>
          <Card className={`${styles.bodyCard} ${styles.heightFul}`}>
            <Card.Img variant="top" className={styles.imgWidth} src="https://static.toiimg.com/thumb/imgsize-23456,msid-100636216,width-600,resizemode-4/100636216.jpg" />
            <Card.Body>
              <Card.Title>Canada’s New PM Mark Carney To Call Early Elections Amid Trade Tensions With US.</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className={`${styles.bodyCard} ${styles.heightFul}`}>
            <Card.Img variant="top" className={styles.imgWidth} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTbX8hTaMYJpm4c0RtBno7asJUtPb-2PRrEw&s" />
            <Card.Body>
              <Card.Title>ICICI Bank Coral Credit Card - Apply Now..</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className={`${styles.bodyCard} ${styles.heightFul}`}>
            <Card.Img variant="top" className={styles.imgWidth} src="https://os-wordpress-media.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2022/02/15202055/Laptop-to-Desktop-Conversion-02.jpg" />
            <Card.Body>
              <Card.Title>Techie shares top 'resource' to crack coding interviews in viral post, Google reacts.</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className={`${styles.bodyCard} ${styles.heightFul}`}>
            <Card.Img variant="top" src="https://www.portronics.com/cdn/shop/articles/laptop_stand_with_fan_your_guide_to_choose_the_best_one_in_2024.png?v=1739535854&width=1920" />
            <Card.Body>
              <Card.Title>Canada’s New PM Mark Carney To Call Early Elections Amid Trade Tensions With US</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className={`${styles.bodyCard} ${styles.heightFul}`}>
            <Card.Img variant="top" src="https://c0.wallpaperflare.com/preview/646/108/836/turned-on-laptop-computer.jpg" />
            <Card.Body>
              <Card.Title>ICICI Bank Coral Credit Card - Apply Now..</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="mb-5">
            <h2 className="d-flex align-items-center mb-4">
            {/* <FaArrowTrendUp className="text-primary me-2" size={24} /> */}
            <span className="fw-bold">Featured Blogs</span>
            </h2>
            <Row>
            {featuredNews.map((news, index) => (
                <Col key={index} lg={4} md={6} className="mb-4">
                <Card className="h-100 border-0 shadow-sm hover-shadow">
                    <Card.Img 
                    variant="top" 
                    src={news.image} 
                    style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <Card.Body>
                    <Badge bg="primary" className="mb-2">{news.category}</Badge>
                    <Card.Title className="fw-bold mb-3">{news.title}</Card.Title>
                    <Card.Text className="text-muted">{news.excerpt}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="d-flex align-items-center text-muted">
                        {/* <FaClock size={14} /> */}
                        <small className="ms-2">2 hours ago</small>
                        </div>
                        {/* <FaRegBookmark className="text-muted cursor-pointer" size={16} /> */}
                    </div>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            </Row>
        </div>
        <Row>
        <Col md={3}>
          <Card className={`${styles.bodyCard} ${styles.heightFul}`}>
            <Card.Img variant="top" className={styles.imgWidth} src="https://static.toiimg.com/thumb/imgsize-23456,msid-100636216,width-600,resizemode-4/100636216.jpg" />
            <Card.Body>
              <Card.Title>Canada’s New PM Mark Carney To Call Early Elections Amid Trade Tensions With US.</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className={`${styles.bodyCard} ${styles.heightFul}`}>
            <Card.Img variant="top" className={styles.imgWidth} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTbX8hTaMYJpm4c0RtBno7asJUtPb-2PRrEw&s" />
            <Card.Body>
              <Card.Title>ICICI Bank Coral Credit Card - Apply Now..</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className={`${styles.bodyCard} ${styles.heightFul}`}>
            <Card.Img variant="top" className={styles.imgWidth} src="https://os-wordpress-media.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2022/02/15202055/Laptop-to-Desktop-Conversion-02.jpg" />
            <Card.Body>
              <Card.Title>Techie shares top 'resource' to crack coding interviews in viral post, Google reacts.</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className={`${styles.bodyCard} ${styles.heightFul}`}>
            <Card.Img variant="top" className={styles.imgWidth} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTbX8hTaMYJpm4c0RtBno7asJUtPb-2PRrEw&s" />
            <Card.Body>
              <Card.Title>ICICI Bank Coral Credit Card - Apply Now..</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};


const featuredNews = [
  {
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
    category: "Technology",
    title: "The Future of AI: Breaking New Boundaries",
    excerpt: "Artificial Intelligence continues to evolve, pushing the boundaries of what's possible in technology..."
  },
  {
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e",
    category: "Business",
    title: "Global Markets Show Strong Recovery Signs",
    excerpt: "Economic indicators point to a robust recovery in global markets as investor confidence grows..."
  }
  ,
  {
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e",
    category: "Business",
    title: "Global Markets Show Strong Recovery Signs",
    excerpt: "Economic indicators point to a robust recovery in global markets as investor confidence grows..."
  }
];
export default NewsDashboard;
