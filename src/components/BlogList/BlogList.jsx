import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Edit2, Trash2, BookOpen, Calendar, User } from 'lucide-react';
import styles from './BlogList.module.css';
import { Link , useNavigate } from 'react-router-dom';
const BlogList = () => {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://fastapi.phoneme.in/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data); 
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);


  const handleEdit = (id) => {
    console.log(`Editing blog ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting blog ${id}`);
  };

  const handleReadMore = (id) => {
    navigate(`/details/${id}`);  // Redirect to the details page for the clicked blog
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));


  return (
    <div className={styles.mainContainer}>
      <Container>
        <Row>
          {/* Users blog */}
          <Col lg={8}>
          <h3>Users Blog</h3>
            {blogs.map((blog) => (
              <div key={blog.id} className={styles.blogCard}>
                <div className={styles.imageContainer}>
                  <img
                    src={`http://fastapi.phoneme.in/${blog.image}`}
                    alt={blog.title}
                    className={styles.blogImage}
                  />
                </div>
                <div className={styles.contentContainer}>
                  <span className={styles.category}>{blog.category.category_name}</span>
                  <h2 className={styles.blogTitle}>{blog.title}</h2>
                  <p className={styles.blogContent}>{blog.post}</p>
                  <div className={styles.metadata}>
                    <span className="d-flex align-items-center gap-2">
                      <User size={14} />
                      {blog.created_user.name}
                    </span>
                    <span className="d-flex align-items-center gap-2">
                      <Calendar size={14} />
                      {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.buttonContainer}>
                    <Button variant="primary" className={`${styles.button} ${styles.readMoreBtn}`}onClick={() => handleReadMore(blog.id)} > <BookOpen size={14} /> Read More </Button>
                    <Button variant="warning" className={`${styles.button} ${styles.editBtn}`} onClick={() => handleEdit(blog.id)} ><Edit2 size={14} />  Edit </Button>
                    <Button variant="danger" className={`${styles.button} ${styles.deleteBtn}`}onClick={() => handleDelete(blog.id)}><Trash2 size={14} /> Delete</Button>
                  </div>
                </div>
              </div>
            ))}
          </Col>

          {/* recent posts */}
          <Col lg={4}>
          <div className={styles.recentPost}> 
            <div className="sticky-top" style={{ top: '2rem' }}>
              <h3 className={styles.sidebarTitle}>Recent Posts</h3>
              {sortedBlogs.slice(0, 5).map((blog) => (
                <div key={blog.id} className={styles.recentPost} onClick={() => handleReadMore(blog.id)}>
                  <img
                    src={`http://fastapi.phoneme.in/${blog.image}`}
                    alt={blog.title}
                    className={styles.recentPostImage}
                  />
                  <div className={styles.recentPostContent}>
                    <h4 className={styles.recentPostTitle}>{blog.title}</h4>
                    <div className={styles.recentPostDate}>
                    {new Date(blog.created_at).toLocaleDateString()}
                    </div>
                    <div className={styles.recentPostDate}>
                    {blog.created_user.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BlogList;
