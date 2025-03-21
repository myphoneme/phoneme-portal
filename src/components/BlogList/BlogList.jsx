import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Edit2, Trash2, BookOpen, Calendar, User } from 'lucide-react';
import styles from './BlogList.module.css';


const blogs = [
  {
    id: 1,
    title: "The Future of Web Development: What's Next in 2024",
    category: "Technology",
    content: "As we dive deeper into 2024, the web development landscape continues to evolve at an unprecedented pace. From AI-powered development tools to new framework innovations, discover what's shaping the future of web development...",
    author: "John Doe",
    createdAt: "2024-03-15",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Mastering Modern UI Design Principles",
    category: "Design",
    content: "Understanding modern UI design principles is crucial for creating engaging and user-friendly applications. Learn about the latest trends in typography, color theory, and layout design that are defining today's digital experiences...",
    author: "Jane Smith",
    createdAt: "2024-03-14",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Building Scalable Applications with React",
    category: "Programming",
    content: "React continues to be a powerhouse in frontend development. Discover best practices for building scalable applications, managing state effectively, and optimizing performance in large-scale React applications...",
    author: "Alex Johnson",
    createdAt: "2024-03-13",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "The Rise of AI in Modern Development",
    category: "Technology",
    content: "Artificial Intelligence is revolutionizing how we approach software development. From code completion to automated testing, explore how AI is changing the development landscape...",
    author: "Sarah Wilson",
    createdAt: "2024-03-12",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Optimizing Performance in Web Applications",
    category: "Performance",
    content: "Performance optimization is crucial for modern web applications. Learn about the latest techniques and best practices for building fast and efficient web applications...",
    author: "Mike Brown",
    createdAt: "2024-03-11",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  }
  
];

const recentBlogs = blogs.slice(0, 5);

const BlogList = () => {
  const handleEdit = (id) => {
    console.log(`Editing blog ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting blog ${id}`);
  };

  const handleReadMore = (id) => {
    console.log(`Reading blog ${id}`);
  };

  return (
    <div className={styles.mainContainer}>
      <Container>
        <Row>
          <Col lg={8}>
            {blogs.map((blog) => (
              <div key={blog.id} className={styles.blogCard}>
                <div className={styles.imageContainer}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className={styles.blogImage}
                  />
                </div>
                <div className={styles.contentContainer}>
                  <span className={styles.category}>{blog.category}</span>
                  <h2 className={styles.blogTitle}>{blog.title}</h2>
                  <p className={styles.blogContent}>{blog.content}</p>
                  <div className={styles.metadata}>
                    <span className="d-flex align-items-center gap-2">
                      <User size={14} />
                      {blog.author}
                    </span>
                    <span className="d-flex align-items-center gap-2">
                      <Calendar size={14} />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.buttonContainer}>
                    <Button
                      variant="primary"
                      className={`${styles.button} ${styles.readMoreBtn}`}
                      onClick={() => handleReadMore(blog.id)}
                    >
                      <BookOpen size={14} />
                      Read More
                    </Button>
                    <Button
                      variant="warning"
                      className={`${styles.button} ${styles.editBtn}`}
                      onClick={() => handleEdit(blog.id)}
                    >
                      <Edit2 size={14} />
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className={`${styles.button} ${styles.deleteBtn}`}
                      onClick={() => handleDelete(blog.id)}
                    >
                      <Trash2 size={14} />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Col>
          <Col lg={4}>
            <div className="sticky-top" style={{ top: '2rem' }}>
              <h3 className={styles.sidebarTitle}>Recent Posts</h3>
              {recentBlogs.map((blog) => (
                <div key={blog.id} className={styles.recentPost}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className={styles.recentPostImage}
                  />
                  <div className={styles.recentPostContent}>
                    <h4 className={styles.recentPostTitle}>{blog.title}</h4>
                    <div className={styles.recentPostDate}>
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BlogList;
