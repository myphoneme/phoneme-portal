import React from 'react';
import { Container, Row, Col, Button, } from 'react-bootstrap';
import { Mail, MapPin, Link as LinkIcon, Twitter, Github, Linkedin, Award, Book, Users, Briefcase, Calendar, Star } from 'lucide-react';
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

  const skills = ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker', 'GraphQL', 'MongoDB'];

  return (
    <div className={styles.profileContainer}>
      <Container>
        <div className={styles.profileHeader}>
          <div className={styles.coverImage}></div>
          <div className={styles.profileInfo}>
            <div className={styles.avatarWrapper}>
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
            <div className={styles.contentSection}>
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
            </div>


            <div className={styles.contentSection}>
              <h2 className={styles.sectionTitle}>
                <Award size={24} />
                Skills & Expertise
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;