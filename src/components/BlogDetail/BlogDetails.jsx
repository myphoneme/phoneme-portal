import React, { useContext,useEffect, useState } from 'react';
import { useParams , Link } from 'react-router-dom'; 
import { Container, Row, Col } from 'react-bootstrap';
// import UserProfile from "../../User";
import { useUser } from "@clerk/clerk-react";
import { globalContext } from '../Context';

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

  const { id } = useParams(); // Get the id from the URL
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const { user } = useUser();

  const { mode } = useContext(globalContext);//theme

  useEffect(() => {
    // Fetch the full post using the id from the URL
    fetch(`http://192.168.1.11:8000/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error('Error fetching post details:', error));

      fetch(`http://192.168.1.11:8000/posts?limit=5`)
      .then((response) => response.json())
      .then((data) => {
        const sortedPosts = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setRelatedPosts(sortedPosts.slice(0, 5));
      })
      .catch((error) => console.error('Error fetching related posts:', error));

  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }
  
  return (
    <div  className={`${styles.blogDetailsContainer} ${mode === 'light' ? 'bg-light text-dark' : 'text-light'}`}
        style={mode === 'dark' ? { backgroundColor: '#1a1a1a' } : {}}>
      {/* <div className={styles.heroSection}>
        <Container>
          <div className={styles.heroContent}>
            <div className={styles.categories}>
              <span className={styles.category}>{post.category.category_name}</span>
              <span className={styles.category}>Innovation</span>
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
      </div> */}

      <Container >
        <Row className={styles.mainContent}>
        <h5 >{post.title}</h5>
          <Col lg={8} className='mt-4'>
            {/* <div className={styles.featuredImage}>
              <img
                src={`http://192.168.1.11:8000/${post.image}`} 
                alt="Featured"
              />
            </div> */}
           
            <div className={`${styles.contentWrapper} ${mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`}>
              {/* <div className={styles.socialShare}>
                <button className={styles.shareButton}><Heart size={20} /> 245</button>
                <button className={styles.shareButton}><Share2 size={20} /></button>
                <button className={styles.shareButton}><Bookmark size={20} /></button>
              </div> */}
               <div className={styles.featuredImage}>
              <img
                src={`http://192.168.1.11:8000/${post.image}`} 
                alt="Featured"
              />
            </div>
              <div className={styles.articleContent}>
                {/* <p className={styles.lead}>
                  {post.post}
                </p> */}

                <p className={styles.lead}>
                  {post.post ? (
                    <span dangerouslySetInnerHTML={{ __html: post.post.substring(0, 150) + "..." }} />
                  ) : (
                    "Content not available"
                    )}
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

                {/* <div className={styles.tagSection}>
                  <Tag size={20} />
                  <span className={styles.tag}>Web Development</span>
                  <span className={styles.tag}>Technology</span>
                  <span className={styles.tag}>Innovation</span>
                  <span className={styles.tag}>AI</span>
                </div> */}

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
              <div className={`${styles.authorBox} ${mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`}>
                <img
                  src={user?.imageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60"}
                
                  alt="Author"
                />
                <div className={styles.authorInfo}>
                  <h3>{post.created_user.name}</h3>
                  <p >Senior Tech Writer & Developer Advocate</p>
                  <p >
                    John is a seasoned developer and tech enthusiast with over 10 years
                    of experience in web development. He writes about emerging technologies
                    and their impact on the future of software development.
                  </p>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={4} className='mt-4'>
            <div className={`${styles.sidebar}`}>
              <div className={`${styles.sidebarSection} ${mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`}>
                <h3>Related Articles</h3>
                {relatedPosts.map((blog, index) => (
                  <Link to={`/details/${blog.id}`} key={blog.id} className={styles.relatedPostLink}>
                  <div key={index} className={styles.relatedPost}>
                    <img src={`http://192.168.1.11:8000/${blog.image}`} alt={blog.title} />
                    <div>
                      <h4>{blog.title}</h4>
                      <span><Calendar size={14} />  {new Date(blog.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  </Link>
                ))}
              </div>

              {/* <div className={styles.sidebarSection}>
                <h3>Popular Categories</h3>
                <div className={styles.tagCloud}>
                  <span className={styles.tag}>JavaScript</span>
                  <span className={styles.tag}>React</span>
                  <span className={styles.tag}>Web3</span>
                  <span className={styles.tag}>AI</span>
                  <span className={styles.tag}>Cloud</span>
        
                  <span className={styles.tag}>DevOps</span>
                </div>
              </div> */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BlogDetails;