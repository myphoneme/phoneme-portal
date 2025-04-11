import React, { useContext,useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Home.module.css';
import { globalContext } from '../Context';

function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);  // Track current page
  const postsPerPage = 5;  // Number of posts per page
 
   const { mode } = useContext(globalContext);//theme

  useEffect(() => {
    // Fetch data from API using fetch
    fetch('http://192.168.1.11:8000/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));

    fetch('http://192.168.1.11:8000/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));

  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId); // Set the selected category ID in state
  };

  // Filter posts based on selected category
  const filteredPosts = selectedCategoryId
    ? posts.filter(post => post.category?.id === selectedCategoryId)
    : posts;
  // Get the posts for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className={`${styles.blogContainer} ${mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`}>
      <Container>
        {/* Categories Section */}
        <div className={`${styles.categorySection} ${mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`}>
          <h3 className={styles.sectionTitle}>Explore Categories</h3>
          <div className="d-flex flex-wrap">
            {categories.length === 0 ? (
              <p>Loading categories...</p>
            ) : (
              categories.map((category) => (
                <span
                  key={category.id}
                  // className={styles.categoryTag}
                  className={`${styles.categoryTag} ${selectedCategoryId === category.id ? styles.activeCategory : ''}`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.category_name}
                </span>
              ))
            )}
          </div>
        </div>
        <Row className={styles.mainContent}>
          {/* Main Blog Post - Left Side */}
          <Col md={8} >
            {currentPosts.length === 0 ? (
              <p>No posts available for this category...</p>
            ) : (
              currentPosts.map((post) => (
                <article key={post.id} className={`${styles.blogPost} ${mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`}>
                  <Link to={`/details/${post.id}`} className={`${styles.articleLink} `}>
                  <Row className='align-items-center'>
                  <Col md={4}>
                    <div>
                      <img
                        src={`http://192.168.1.11:8000/${post.image}`}
                        alt={post.title}
                        className={styles.blogImage}
                      />
                    </div>
                  </Col>
                  <Col md={8}>
                  
                    <div className={styles.homeBlog}>
                      <h1 className={styles.blogTitle}>{post.title}</h1>
                      <div className={styles.blogContent}>
                        {/* <p>{post.post ? post.post.substring(0, 150) + "..." : "Content not available"}</p> */}
                        <p>
                           {post.post ? (
                            <span dangerouslySetInnerHTML={{ __html: post.post.substring(0, 150) + "..." }} />
                          ) : (
                            "Content not available"
                            )}
                        </p>

                      </div>
                      <div className={styles.blogMeta}>
                        <span>
                          <User size={10} />
                          {post.created_user?.name || "Anonymous"}
                        </span>
                        <span>
                          <Calendar size={10} />
                          {new Date(post.created_at).toLocaleDateString() || "N/A"}
                        </span>
                        <span>
                          <Tag size={10} />
                          {post.category?.category_name || "General"}
                        </span>
                        <span>
                          <Clock size={10} />
                          8 min read
                        </span>
                      </div>
                    </div>
                    </Col>
                    </Row>
                  </Link>
                </article>
              ))
            )}
            {/* Pagination Controls */}
            {filteredPosts.length > postsPerPage && (
              <div className={styles.pagination}>
                {[...Array(Math.ceil(filteredPosts.length / postsPerPage))].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={currentPage === index + 1 ? styles.activePage : ''}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </Col>
          {/* Recent Posts Section - Right Side */}
          <Col md={4}>
            <h3 className={styles.sectionTitle}>Recent Posts</h3>
            {posts
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort by created_at in descending order
              .slice(0,5 )  // Get the latest 5 posts
              .map(post => (
                <Link to={`/details/${post.id}`} key={post.id} className={styles.recentPostLink}>
                  <div key={post.id} className={`${styles.recentPost} ${mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`}>
                   
                   <div>
                    <h5 className={styles.recentPostTitle}>
                        {post.title}
                      </h5>
                      <div className={styles.recentPostDate}>
                        <Clock size={14} />
                        {new Date(post.created_at).toLocaleDateString()} 
                        <span style={{ margin: '0 8px' }}>•</span>
                        <Clock size={14} />
                        {post.created_user.name || 'Anonymous'}
                      </div>
                   </div>
                   <div>
                      <img
                        src={`http://192.168.1.11:8000/${post.image}`}
                        alt={post.title}
                        className={styles.recentPostImage}
                      />
                    </div>
                  
                  </div>
                </Link>
              ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
