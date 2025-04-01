import react from "react";
import './style.css';

    const Footer = () => {
        return (
          <footer className="footer">
            <div className="footer-container">
              <div className="footer-section">
                <h2>Job Portal</h2>
              </div>
              <div className="footer-section">
                <h3>Quick Links</h3>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Jobs</a></li>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h3>Follow Us</h3>
                <div className="social-icons">
                  <a href="#"><i className="fab fa-facebook"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-linkedin"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; {new Date().getFullYear()} Job Portal. All rights reserved.</p>
            </div>
          </footer>
        );
      };

export default Footer;