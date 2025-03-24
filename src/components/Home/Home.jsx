import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Calendar, Clock, User, Tag, Bookmark, TrendingUp, Coffee, Heart, Globe, Shield } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Home.module.css';

function Home() {
  const categories = [
    { name: 'Technology', icon: <Shield size={16} /> },
    { name: 'Travel', icon: <Globe size={16} /> },
    { name: 'Food', icon: <Coffee size={16} /> },
    { name: 'Lifestyle', icon: <Heart size={16} /> },
    { name: 'Trending', icon: <TrendingUp size={16} /> },
    { name: 'Bookmarks', icon: <Bookmark size={16} /> }
  ];
 
  const recentPosts = [
    {
      id: 1,
      title: "The Future of AI in 2024: Breaking New Grounds",
      date: "March 15, 2024",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&auto=format&fit=crop&q=60",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Hidden Gems: Unexplored Travel Destinations",
      date: "March 14, 2024",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&auto=format&fit=crop&q=60",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "Mindful Living: A Guide to Better Health",
      date: "March 13, 2024",
      image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=500&auto=format&fit=crop&q=60",
      readTime: "6 min read"
    }
  ];


  
  return (
    <div className={styles.blogContainer}>
      <Container>
        {/* Categories Section */}
        <div className={styles.categorySection}>
          <h3 className={styles.sectionTitle}>Explore Categories</h3>
          <div className="d-flex flex-wrap">
            {categories.map((category) => (
              <span key={category.name} className={styles.categoryTag}>
                {category.icon}
                {category.name}
              </span>
            ))}
          </div>
        </div>

        <Row className={styles.mainContent}>
          {/* Main Blog Post - Left Side */}
          <Col md={8}>
            <article className={styles.blogPost}>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60"
                  alt="Main Blog Post"
                  className={styles.blogImage}
                />
              </div>
              <div className={styles.homeBlog}>
                <h1 className={styles.blogTitle}>
                  The Evolution of Web Development in 2024: A New Era of Innovation
                </h1>       
                <div className={styles.blogContent}>
                  <p>
                    Web development has undergone a remarkable transformation since its inception.
                    As we navigate through 2024, we're witnessing groundbreaking changes in how
                    websites are conceptualized, built, and deployed.                 
                  </p>
                </div>   
                <div className={styles.blogMeta}>
                  <span>
                    <User size={18} />
                    John Doe
                  </span>
                  <span>
                    <Calendar size={18} />
                    March 15, 2024
                  </span>
                  <span>
                    <Tag size={18} />
                    Technology
                  </span>
                  <span>
                    <Clock size={18} />
                    8 min read
                  </span>
                </div>
              </div>
            </article>
            <article className={styles.blogPost}>
              <div>
                <img
                  src="https://png.pngtree.com/thumb_back/fh260/background/20230704/pngtree-office-essentials-technology-and-gadgets-illustration-featuring-laptop-printer-camera-tablet-image_3748458.jpg"
                  alt="Main Blog Post"
                  className={styles.blogImage}
                />
              </div>
              <div className={styles.homeBlog}>
                <h1 className={styles.blogTitle}>
                  The Evolution of Web Development in 2024: A New Era of Innovation
                </h1>       
                <div className={styles.blogContent}>
                  <p>
                    Web development has undergone a remarkable transformation since its inception.
                    As we navigate through 2024, we're witnessing groundbreaking changes in how
                    websites are conceptualized, built, and deployed.                 
                  </p>
                </div>   
                <div className={styles.blogMeta}>
                  <span>
                    <User size={18} />
                    John Doe
                  </span>
                  <span>
                    <Calendar size={18} />
                    March 15, 2024
                  </span>
                  <span>
                    <Tag size={18} />
                    Technology
                  </span>
                  <span>
                    <Clock size={18} />
                    8 min read
                  </span>
                </div>
              </div>
            </article>
            <article className={styles.blogPost}>
              <div>
                <img
                  src="https://img.freepik.com/free-photo/business-desk-arrangement-with-laptop-high-angle_23-2149073040.jpg"
                  alt="Main Blog Post"
                  className={styles.blogImage}
                />
              </div>
              <div className={styles.homeBlog}>
                <h1 className={styles.blogTitle}>
                  The Evolution of Web Development in 2024: A New Era of Innovation
                </h1>       
                <div className={styles.blogContent}>
                  <p>
                    Web development has undergone a remarkable transformation since its inception.
                    As we navigate through 2024, we're witnessing groundbreaking changes in how
                    websites are conceptualized, built, and deployed.                 
                  </p>
                </div>   
                <div className={styles.blogMeta}>
                  <span>
                    <User size={18} />
                    John Doe
                  </span>
                  <span>
                    <Calendar size={18} />
                    March 15, 2024
                  </span>
                  <span>
                    <Tag size={18} />
                    Technology
                  </span>
                  <span>
                    <Clock size={18} />
                    8 min read
                  </span>
                </div>
              </div>
            </article>
            <article className={styles.blogPost}>
              <div>
                <img
                  src="https://images.pexels.com/photos/705164/computer-laptop-work-place-camera-705164.jpeg"
                  alt="Main Blog Post"
                  className={styles.blogImage}
                />
              </div>
              <div className={styles.homeBlog}>
                <h1 className={styles.blogTitle}>
                  The Evolution of Web Development in 2024: A New Era of Innovation
                </h1>       
                <div className={styles.blogContent}>
                  <p>
                    Web development has undergone a remarkable transformation since its inception.
                    As we navigate through 2024, we're witnessing groundbreaking changes in how
                    websites are conceptualized, built, and deployed.                 
                  </p>
                </div>   
                <div className={styles.blogMeta}>
                  <span>
                    <User size={18} />
                    John Doe
                  </span>
                  <span>
                    <Calendar size={18} />
                    March 15, 2024
                  </span>
                  <span>
                    <Tag size={18} />
                    Technology
                  </span>
                  <span>
                    <Clock size={18} />
                    8 min read
                  </span>
                </div>
              </div>
            </article>
          </Col>

          {/* Recent Posts Section - Right Side */}
          <Col md={4}>
            <h3 className={styles.sectionTitle}>Recent Posts</h3>
            {recentPosts.map((post) => (
              <div key={post.id} className={styles.recentPost}>
                <img
                  src={post.image}
                  alt={post.title}
                  className={styles.recentPostImage}
                />
                <h5 className={styles.recentPostTitle}>{post.title}</h5>
                <div className={styles.recentPostDate}>
                  <Clock size={16} />
                  {post.date}
                  <span style={{ margin: '0 8px' }}>•</span>
                  <Clock size={16} />
                  {post.readTime}
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
