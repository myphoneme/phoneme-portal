import React from "react";
import { Row, Col, Card, Badge } from "react-bootstrap";
import { FaArrowTrendUp, FaClock, FaRegBookmark, FaStar } from "react-icons/fa";
import styles from "./NewsSection.module.css"; // Import CSS Module

const NewsSection = ({ latestNews, featuredNews }) => {
  return (
    <div className={styles.newsContainer}>
      <Row>
        {/* Left Section - Latest News */}
        <Col lg={8} md={12} className={styles.latestNewsSection}>
          <h2 className="d-flex align-items-center mb-4">
            <FaArrowTrendUp className="text-primary me-2" size={24} />
            <span className="fw-bold">Latest News</span>
          </h2>
          
          <Row>
            {latestNews.map((news, index) => (
              <Col key={index} lg={6} md={6} className="mb-4">
                <Card className={`h-100 border-0 shadow-sm ${styles.newsCard}`}>
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
        </Col>

        {/* Right Section - Featured News */}
        <Col lg={4} md={12} className={styles.featuredNewsSection}>
          <h2 className="d-flex align-items-center mb-4">
            <FaStar className="text-warning me-2" size={24} />
            <span className="fw-bold">Featured News</span>
          </h2>

          {featuredNews.map((news, index) => (
            <Card key={index} className={`mb-4 border-0 shadow-sm ${styles.featuredCard}`}>
              <Card.Body>
                <Badge bg="danger" className="mb-2">{news.category}</Badge>
                <Card.Title className="fw-bold mb-2">{news.title}</Card.Title>
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
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default NewsSection;
