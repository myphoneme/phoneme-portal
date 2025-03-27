import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { Container, Row, Col } from 'react-bootstrap';
// import UserProfile from "../../User";
// import { useUser } from "@clerk/clerk-react";

import {
  Calendar,
  Clock,
  User,
  Heart,
  Share2,
  Bookmark,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  ThumbsUp,
  Tag
} from 'lucide-react';
import styles from './BlogDetail.module.css';
import { UserProfile } from '@clerk/clerk-react';

function BlogDetails() {
  const relatedPosts = [
    {
      title: "The Impact of AI on Software Development",
      date: "March 12, 2024",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&auto=format&fit=crop&q=60"
    },
    {
      title: "Future of Cloud Computing in 2024",
      date: "March 10, 2024",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60"
    }
  ];



  const { id } = useParams(); // Get the id from the URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch the full post using the id from the URL
    fetch(`http://fastapi.phoneme.in/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error('Error fetching post details:', error));
  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }
  // const { user } = useUser();
  return (
    <div className={styles.blogDetailsContainer}>
      <div className={styles.heroSection}>
        <Container>
          <div className={styles.heroContent}>
            <div className={styles.categories}>
              <span className={styles.category}>{post.category.category_name}</span>
              {/* <span className={styles.category}>Innovation</span> */}
            </div>
            
            <h1>{post.title}</h1>
            <div className={styles.postMeta}>
              <div className={styles.author}>
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60"
                  alt="Author"
                />
                <span>{post.created_user?.name || 'Anonymous'}</span>
              </div>
              <div className={styles.metaInfo}>
                <span><Calendar size={16} /> {new Date(post.created_at).toLocaleDateString()}</span>
                <span><Clock size={16} /> 8 min read</span>
                <span><MessageCircle size={16} /> 24 Comments</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <Row className={styles.mainContent}>
          <Col lg={8}>
            <div className={styles.featuredImage}>
              <img
                src={`http://fastapi.phoneme.in/${post.image}`} 
                alt="Featured"
              />
            </div>
           
            <div className={styles.contentWrapper}>
              {/* <div className={styles.socialShare}>
                <button className={styles.shareButton}><Heart size={20} /> 245</button>
                <button className={styles.shareButton}><Share2 size={20} /></button>
                <button className={styles.shareButton}><Bookmark size={20} /></button>
              </div> */}

              <div className={styles.articleContent}>
                <p className={styles.lead}>
                  {post.post}
                </p>

                {/* <h2>The Rise of AI-Powered Development</h2>
                <p>
                  Artificial Intelligence has become an integral part of modern web development.
                  From code completion to automated testing, AI tools are revolutionizing how
                  developers work. This integration has led to:
                </p>
                <ul>
                  <li>Increased development speed and efficiency</li>
                  <li>More accurate bug prediction and prevention</li>
                  <li>Automated performance optimization</li>
                  <li>Enhanced user experience through AI-driven personalization</li>
                </ul>

                <div className={styles.quoteBlock}>
                  <blockquote>
                    "The future of web development lies in the seamless integration of human
                    creativity and artificial intelligence, creating experiences that were
                    previously impossible."
                  </blockquote>
                  <cite>- Tech Visionary Magazine</cite>
                </div>

                <h2>Web3 and Decentralized Applications</h2>
                <p>
                  The emergence of Web3 technologies has opened new possibilities in web
                  development. Decentralized applications (dApps) are becoming increasingly
                  popular, offering:
                </p>
                <ul>
                  <li>Enhanced security through blockchain technology</li>
                  <li>Improved data ownership and privacy</li>
                  <li>New monetization opportunities</li>
                  <li>Community-driven development</li>
                </ul> */}
              </div>

              <div className={styles.tagSection}>
                <Tag size={20} />
                <span className={styles.tag}>Web Development</span>
                <span className={styles.tag}>Technology</span>
                <span className={styles.tag}>Innovation</span>
                <span className={styles.tag}>AI</span>
              </div>

              <div className={styles.socialShareBottom}>
                <p>Share this article:</p>
                <div className={styles.socialButtons}>
                  <button className={`${styles.socialButton} ${styles.facebook}`}>
                    <Facebook size={20} />
                  </button>
                  <button className={`${styles.socialButton} ${styles.twitter}`}>
                    <Twitter size={20} />
                  </button>
                  <button className={`${styles.socialButton} ${styles.linkedin}`}>
                    <Linkedin size={20} />
                  </button>
                </div>
              </div>

              <div className={styles.authorBox}>
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60"
                  
                  alt="Author"
                />
                <div className={styles.authorInfo}>
                  <h3>John Doe</h3>
                  <p>Senior Tech Writer & Developer Advocate</p>
                  <p>
                    John is a seasoned developer and tech enthusiast with over 10 years
                    of experience in web development. He writes about emerging technologies
                    and their impact on the future of software development.
                  </p>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={4}>
            <div className={styles.sidebar}>
              <div className={styles.sidebarSection}>
                <h3>Related Articles</h3>
                {relatedPosts.map((post, index) => (
                  <div key={index} className={styles.relatedPost}>
                    <img src={post.image} alt={post.title} />
                    <div>
                      <h4>{post.title}</h4>
                      <span><Calendar size={14} /> {post.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.sidebarSection}>
                <h3>Popular Tags</h3>
                <div className={styles.tagCloud}>
                  <span className={styles.tag}>JavaScript</span>
                  <span className={styles.tag}>React</span>
                  <span className={styles.tag}>Web3</span>
                  <span className={styles.tag}>AI</span>
                  <span className={styles.tag}>Cloud</span>
                
                  <span className={styles.tag}>DevOps</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BlogDetails;