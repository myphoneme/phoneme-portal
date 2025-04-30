import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Home.module.css';
import { globalContext } from '../Context';
import Loading from '../Loading/Loading'; // ⭐️ Added loading component

function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [topCategories, setTopCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);  // Track current page
  const [isLoading, setIsLoading] = useState(true);  // ⭐️ Loading state for posts and categories
  const postsPerPage = 5;  // Number of posts per page

  const { mode } = useContext(globalContext); // theme

  useEffect(() => {
    setIsLoading(true); // ⭐️ Start loading

    // Fetch data from API using fetch
    fetch('https://fastapi.phoneme.in/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));

    fetch('https://fastapi.phoneme.in/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error))
      .finally(() => setIsLoading(false)); // ⭐️ Stop loading once data is fetched

  }, []);

  useEffect(() => {
    // Count posts per category
    const categoryPostCounts = categories.map(category => {
      const postCount = posts.filter(post => post.category?.id === category.id).length;
      return { ...category, postCount };
    });

    // Sort categories by post count in descending order and select top 5
    const sortedCategories = categoryPostCounts
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, 10);

    setTopCategories(sortedCategories);
  }, [categories, posts]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId); // Set the selected category ID in state
  };

  // Filter posts based on selected category
  const filteredPosts = selectedCategoryId
    ? posts.filter(post => post.category?.id === selectedCategoryId)
    : posts;
  const currentPosts = filteredPosts;

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) { // ⭐️ Show loader if data is still loading
    return <Loading />;
  }

  return (
    <div className={`${styles.blogContainer} ${mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`}>
      <Container className={styles.container}>
        {/* Categories Section */}
        <div className={`${styles.categorySection} ${mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`}>
          <h3 className={styles.sectionTitle}>Explore Categories</h3>
          <div className="d-flex flex-wrap">
            {topCategories.length === 0 ? (
              <p>Loading categories...</p>
            ) : (
              topCategories.map((category) => (
                <span
                  key={category.id}
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
                            src={`https://fastapi.phoneme.in/${post.image}`}
                            alt={post.title}
                            className={styles.blogImage}
                          />
                        </div>
                      </Col>
                      <Col md={8}>
                        <div className={styles.homeBlog}>
                          <h1 className={styles.blogTitle}>{post.title}</h1>
                          <div className={styles.blogContent}>
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
          </Col>
          {/* Recent Posts Section - Right Side */}
          <Col md={4}>
            <div className={styles.fixrecent}>
              <h3 className={styles.sectionTitle}>Recent Posts</h3>
              {posts
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort by created_at in descending order
                .slice(0, 5)  // Get the latest 5 posts
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
                          src={`https://fastapi.phoneme.in/${post.image}`}
                          alt={post.title}
                          className={styles.recentPostImage}
                        />
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
