import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Calendar, Clock, User, Tag, Bookmark, TrendingUp, Coffee, Heart, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Home.module.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    // Fetch data from API using fetch
    fetch('http://fastapi.phoneme.in/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));

      fetch('http://fastapi.phoneme.in/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));

  }, []);


  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId); // Set the selected category ID in state
    console.log('Selected Category ID:', categoryId); // Log or handle it here
  };

  // Filter posts based on selected category
  const filteredPosts = selectedCategoryId
    ? posts.filter(post => post.category?.id === selectedCategoryId) // Filter posts by category ID
    : posts; // If no category is selected, show all posts


  
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
              
                <span
                  key={category.id}  // Use category ID here
                  className={styles.categoryTag}
                  onClick={() => handleCategoryClick(category.id)} // Attach the click handler
                >
                {category.category_name}
              </span>
            )))}
          </div>
        </div>

        <Row className={styles.mainContent}>
          {/* Main Blog Post - Left Side */}
          <Col md={8}>
          {filteredPosts.length === 0 ? (
              <p>No posts available for this category...</p>
            ) : (
              filteredPosts.map((post) => (
            <article key={post.id} className={styles.blogPost}>
               <Link to={`/details/${post.id}`} className={styles.articleLink}>
              <div>
                <img
                  // src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60"
                  src={`http://fastapi.phoneme.in/${post.image}`}
                  alt={post.title}
                  className={styles.blogImage}
                />
              </div>
              <div className={styles.homeBlog}>
                <h1 className={styles.blogTitle}>
                {/* {post.title} */}
                {post.title}
                </h1>       
                <div className={styles.blogContent}>
                <p>{post.post ? post.post.substring(0, 150) + "..." : "Content not available"}</p>

                </div>   
                <div className={styles.blogMeta}>
                  <span>
                    <User size={18} />
                    {post.created_user?.name || "Anonymous"}
                  </span>
                  <span>
                    <Calendar size={18} />
                    {new Date(post.created_at).toLocaleDateString() || "N/A"}
                  </span>
                  <span>
                    <Tag size={18} />
                    {post.category?.category_name || "General"}
                  </span>
                  <span>
                    <Clock size={18} />
                    8 min read
                  </span>
                </div>
              </div>
              </Link>
            </article>
            ))
          )}
        </Col>
            

          {/* Recent Posts Section - Right Side */}
          <Col md={4}>
            <h3 className={styles.sectionTitle}>Recent Posts</h3>
            {posts
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))  // Sort by created_at in descending order
              .slice(0, 5)  // Get the latest 5 posts
              .map(post => (
                <Link to={`/details/${post.id}`} key={post.id} className={styles.recentPostLink}>
              <div key={post.id} className={styles.recentPost}>
                <img
                  src={`http://fastapi.phoneme.in/${post.image}`}
                  alt={post.title}
                  className={styles.recentPostImage}
                />
                <h5 className={styles.recentPostTitle}>
                  {post.title}
                  
                </h5>
                <div className={styles.recentPostDate}>
                  <Clock size={16} />
                  {new Date(post.created_at).toLocaleDateString()} 
                  <span style={{ margin: '0 8px' }}>•</span>
                  <Clock size={16} />
                  {post.created_user.name || 'Anonymous'}
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
