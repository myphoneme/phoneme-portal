import React from 'react';
import { Pen, Github, Twitter } from 'lucide-react';
import { Container} from 'react-bootstrap';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.mainFoot}>
        <Container >
        
      <div className={styles.mainFooter}>
          <div className="flex items-center gap-2">
            <Pen size={18} className="text-indigo-600" />
            <span className="text-xl font-semibold text-gray-900">DevBlog</span>
          </div>
          {/* <div className="">
            <a href="#" className={styles.footIcon}>
              <Github size={20} />
            </a>
            <a href="#"className={styles.footIcon}>
              <Twitter size={20} />
            </a>
          </div> */}
          <div>
          <p className="text-sm text-gray-500">
            © 2024 DevBlog. All rights reserved.
          </p>
          </div>
      </div>
      </Container>
    </footer>
  );
}