import React from 'react';
import { Container, Row, Col, Button,  } from 'react-bootstrap';
import { Mail, MapPin, Link as LinkIcon, Twitter, Github, Linkedin, Award, Book, Users, Briefcase, Calendar, Star, User, BookOpen, Edit2, Trash2  } from 'lucide-react';
import styles from './Profile.module.css';
function Profile() {
  const stats = [
    { icon: <Book size={20} />, label: 'Posts', value: '125' },
    { icon: <Users size={20} />, label: 'Followers', value: '12.5K' },
    { icon: <Star size={20} />, label: 'Points', value: '1.2K' }
  ];

  const experiences = [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Innovators Inc.',
      period: '2022 - Present',
      description: 'Leading development of cloud-native applications and microservices architecture.'
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions Ltd.',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple web applications using React and Node.js.'
    }
  ];
 

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
    
  ];

  const skills = ['Health', 'education', 'TypeScript', 'Python', ];

  return (
    <div className={styles.profileContainer}>
      <Container>
        <div className={styles.profileHeader}>
          <div className={styles.coverImage}></div>
          <div className={styles.profileInfo}>
            <div className={styles.avatarWrapper }>
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60"
                alt="Profile"
                className={styles.avatar}
              />
              <div className={styles.onlineStatus}></div>
            </div>
            <div className={styles.headerContent}>
              <h1 className={styles.name}>David Anderson</h1>
              <p className={styles.title}>Senior Software Engineer & Tech Blogger</p>
              <div className={styles.locationInfo}>
                <span><MapPin size={16} /> San Francisco, CA</span>
                <span><Mail size={16} /> david.anderson@email.com</span>
                <span><LinkIcon size={16} /> portfolio.dev/david</span>
              </div>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink}><Twitter size={20} /></a>
                <a href="#" className={styles.socialLink}><Github size={20} /></a>
                <a href="#" className={styles.socialLink}><Linkedin size={20} /></a>
              </div>
              <div className='text-end'>
                <Button className={styles.proEdit}>Edit Profile</Button>
              </div>
            </div>
          </div>
        </div>

        {/* <Row className={styles.statsContainer}>
          {stats.map((stat, index) => (
            <Col key={index} md={4}>
              <div className={styles.statCard}>
                {stat.icon}
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </Col>
          ))}
        </Row> */}

        <Row className={styles.mainContent}>
          <Col md={8}>
            {/* <div className={styles.contentSection}>
              <h2 className={styles.sectionTitle}>
                <Briefcase size={24} />
                Your blogs
              </h2>
              {experiences.map((exp, index) => (
                <div key={index} className={styles.experienceCard}>
                  <div className={styles.expHeader}>
                    <h3>{exp.title}</h3>
                    <span className={styles.period}>
                      <Calendar size={16} />
                      {exp.period}
                    </span>
                  </div>
                  <h4>{exp.company}</h4>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div> */}
            <div>
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
                          <User/>
                          {blog.author}
                        </span>
                        <span className="d-flex align-items-center gap-2">
                          <Calendar size={14} />
                          {new Date(blog.createdAt).toLocaleDateString()}
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
             </div>
          </Col>

          <Col md={4}>
            <div className={styles.sideSection}>
              <h2 className={styles.sectionTitle}>Latest Achievements</h2>
              <div className={styles.achievementsList}>
                <div className={styles.achievement}>
                  <Star className={styles.achievementIcon} />
                  <div>
                    <h4>Tech Speaker of the Year</h4>
                    <p>Recognized at DevCon 2024</p>
                  </div>
                </div>
                <div className={styles.achievement}>
                  <Award className={styles.achievementIcon} />
                  <div>
                    <h4>Open Source Contributor</h4>
                    <p>100+ Contributions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.contentSection}>
              <h2 className={styles.sectionTitle}>
                <Award size={24} />
                Users Category
              </h2>
              <div className={styles.skillsGrid}>
                {skills.map((skill, index) => (
                  <div key={index} className={styles.skillTag}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;