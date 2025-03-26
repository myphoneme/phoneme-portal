import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Home.module.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    fetch('http://fastapi.phoneme.in/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));

    fetch('http://fastapi.phoneme.in/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.blogContainer}>
      <Container>
        {/* Categories Section */}
        <div className={styles.categorySection}>
          <h3 className={styles.sectionTitle}>Explore Categories</h3>
          <div className="d-flex flex-wrap">
            {categories.length === 0 ? (
              <p>Loading categories...</p>
            ) : (
              categories.map((category) => (
                <span key={category.name} className={styles.categoryTag}>
                  {category.category_name}
                </span>
              )))
            }
          </div>
        </div>

        <Row className={styles.mainContent}>
          {/* Main Blog Post - Left Side */}
          <Col md={8}>
            {currentPosts.length === 0 ? (
              <p>Loading posts...</p>
            ) : (
              currentPosts.map((post) => (
                <article key={post.id} className={styles.blogPost}>
                  <div>
                    <img
                      src={`http://fastapi.phoneme.in/${post.image}`}
                      alt={post.title}
                      className={styles.blogImage}
                    />
                  </div>
                  <div className={styles.homeBlog}>
                    <h1 className={styles.blogTitle}>{post.title}</h1>
                    <div className={styles.blogContent}>
                      <p>{post.post ? post.post.substring(0, 150) + '...' : 'Content not available'}</p>
                    </div>
                    <div className={styles.blogMeta}>
                      <span><User size={18} /> {post.created_user?.name || 'Anonymous'}</span>
                      <span><Calendar size={18} /> {new Date(post.created_at).toLocaleDateString() || 'N/A'}</span>
                      <span><Tag size={18} /> {post.category?.category_name || 'General'}</span>
                      <span><Clock size={18} /> 8 min read</span>
                    </div>
                  </div>
                </article>
              ))
            )}
            {/* Pagination */}
            <Pagination className={styles.paginationContainer}>
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>

          {/* Recent Posts Section - Right Side */}
          <Col md={4}>
            <h3 className={styles.sectionTitle}>Recent Posts</h3>
            {posts
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .slice(0, 5)
              .map(post => (
                <div key={post.id} className={styles.recentPost}>
                  <img
                    src={`http://fastapi.phoneme.in/${post.image}`}
                    alt={post.title}
                    className={styles.recentPostImage}
                  />
                  <h5 className={styles.recentPostTitle}>{post.title}</h5>
                  <div className={styles.recentPostDate}>
                    <Clock size={16} />
                    {new Date(post.created_at).toLocaleDateString()} 
                    <span style={{ margin: '0 8px' }}>•</span>
                    <Clock size={16} />
                    {post.created_user?.name || 'Anonymous'}
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
