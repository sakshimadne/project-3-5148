import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/exploreDiscount.css';  // Assuming you'll use a separate CSS file for styling.

const ExploreDiscount = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    // Navigate to the student discount page
    navigate('/student-discount');
  };

  return (
    <div className="explore-card">
      <h3>Explore Student Discounts</h3>
      <p>Discover exclusive discounts available to students on a variety of products and offers. Don't miss out on your savings!</p>
      <button className="explore-button" onClick={handleExploreClick}>
        Explore Now
      </button>
    </div>
  );
};

export default ExploreDiscount;
