import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaArrowTrendUp, FaBookmark, FaRegBookmark, FaClock } from 'react-icons/fa6';
import { TbBackground } from 'react-icons/tb';

function Landing() {
  return (
    <div style={{ backgroundColor: '#f1f1f1'}}>
    <Container className="py-5"  >
        <Row>
    <Col md={8}>
        {/* Featured News Section */}
        <div className="mb-5">
            <h2 className="d-flex align-items-center mb-4">
            <FaArrowTrendUp className="text-primary me-2" size={24} />
            <span className="fw-bold">Featured Blogs</span>
            </h2>
            <Row>
            {featuredNews.map((news, index) => (
                <Col key={index} lg={6} md={6} className="mb-4">
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
                        <FaClock size={14} />
                        <small className="ms-2">2 hours ago</small>
                        </div>
                        <FaRegBookmark className="text-muted cursor-pointer" size={16} />
                    </div>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            </Row>
        </div>
    </Col>

    <Col md={4}>
      {/* Latest News Section */}
      <div>
        <h2 className="d-flex align-items-center mb-4">
          <FaArrowTrendUp className="text-primary me-2" size={24} />
          <span className="fw-bold">Latest News</span>
        </h2>
        <Row>
          {latestNews.map((news, index) => (
            <Col key={index} lg={12} className="mb-4">
              <Card className="h-100 border-0 shadow-sm hover-shadow">
                <Card.Body>
                  <Badge bg="primary" className="mb-2">{news.category}</Badge>
                  <Card.Title className="fw-bold mb-3">{news.title}</Card.Title>
                  <Card.Text className="text-muted">{news.excerpt}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex align-items-center text-muted">
                      <FaClock size={14} />
                      <small className="ms-2">1 hour ago</small>
                    </div>
                    <FaRegBookmark className="text-muted cursor-pointer" size={16} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        </div>
         </Col>
        </Row>
    </Container>
    </div>
  );
}

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
  },
  {
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7",
    category: "Health",
    title: "Breakthrough in Medical Research",
    excerpt: "Scientists announce major breakthrough in cancer research, offering new hope for treatment..."
  },
  {
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
    category: "Technology",
    title: "The Future of AI: Breaking New Boundaries",
    excerpt: "Artificial Intelligence continues to evolve, pushing the boundaries of what's possible in technology..."
  }
];

const latestNews = [
  {
    category: "Technology",
    title: "Latest Updates in Web Development",
    excerpt: "New frameworks and tools are revolutionizing how we build for the web..."
  },
  {
    category: "Science",
    title: "Space Exploration Milestone",
    excerpt: "Scientists discover potential signs of life on distant exoplanet..."
  },
  {
    category: "Sports",
    title: "Championship Finals Approach",
    excerpt: "Teams prepare for the ultimate showdown in this season's championship..."
  },
  {
    category: "Entertainment",
    title: "New Streaming Platform Launch",
    excerpt: "Major media company announces revolutionary streaming service..."
  },
  {
    category: "Politics",
    title: "Global Summit Results",
    excerpt: "World leaders reach landmark agreement on climate change initiatives..."
  },
  {
    category: "Economy",
    title: "Cryptocurrency Market Update",
    excerpt: "Digital currency markets show signs of stabilization amid regulatory changes..."
  }
];

export default Landing;