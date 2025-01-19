import React from 'react'
import './Footer.css'
import Chatbot from '../components/chatbot'
const Footer = () => {
  return (
    <div>
  <footer>
    <div className="footer-container">
      <div className="footer-row">
        <div className="footer-column">
          <h2 className="footer-logo">MIT market place</h2>
          <p className="footer-description">
          "Discover and shop your favorite things with ease, all from the comfort of your home. Enjoy a wide variety of products delivered right to your door, making shopping more convenient than ever!"
          </p>
        </div>
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/Feedback">Feeback</a></li>
          </ul>
            </div>
               <Chatbot/>
        <div className="footer-column">
          <h3>Connect With Us</h3>
          <ul className="social-icons">
            <li><a href="https://facebook.com" target="_blank"></a></li>
            <li><a href="https://twitter.com" target="_blank"></a></li>
            <li><a href="https://linkedin.com" target="_blank"></a></li>
            <li><a href="https://instagram.com" target="_blank"></a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 MIT Market Place Build in Hackthon.</p>
      </div>
    </div>
  </footer>


    </div>
  )
}

export default Footer
