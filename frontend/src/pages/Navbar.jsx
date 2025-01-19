import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const isAuthenticated = !!localStorage.getItem('token');
  const userName = localStorage.getItem('name') || 'User';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav>
        <div className="navbar">
          <div className="logo">Logo</div>
          <div className="burger" onClick={toggleMenu}>
            ☰
          </div>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="Nav_links">Home</Link>
            <Link to="/Feedback" className="Nav_links">Feedback</Link>
            <Link to="/Category" className="Nav_links">Category</Link>

          <div className="auth-buttons">
            {isAuthenticated ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <button>
                  <Link to="/login">Login</Link>
                </button>
                <button>
                  <Link to="/register">Sign up</Link>
                </button>
              </>
            )}
          </div>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
