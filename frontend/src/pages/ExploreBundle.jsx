import React from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import for react-router-dom v6
import '../styles/exploreBundle.css'

const ExploreCard = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleExploreClick = () => {
    // Navigate to ExploreBundle component
    navigate('/explore-bundle');
  };

  return (
    <div className="card-container">
      <div className="card_E">
        <h2>Exclusive Bundle Offer</h2>
        <p>Get amazing discounts on bundle deals</p>
        <button className="explore-btn" onClick={handleExploreClick}>
          Explore Bundle
        </button>
      </div>
    </div>
  );
};

export default ExploreCard;
