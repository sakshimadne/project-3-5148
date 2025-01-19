import React, { useState, useEffect } from 'react';
import '../styles/bundleOffers.css'; // Importing CSS from the styles folder


const BundleOffers = () => {
  const [offers, setOffers] = useState([]); // State to store the fetched bundle offers
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors

  // Fetch data from Firebase Realtime Database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mit-marketplace-2bc8b-default-rtdb.firebaseio.com/.json"
        );
        const data = await response.json();
        
        // Convert object data into an array of offers
        const offersArray = Object.values(data); // This will convert the object into an array
        setOffers(offersArray);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bundle-offers">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <h2>Exclusive Bundle Offers</h2>
      <div className="offers-grid">
        {offers.length > 0 ? (
          offers.map((offer, index) => (
          <div key={index} className="offer-card">
                    <h3>{offer.title}</h3>
                    <p>
                        <span>Items:</span> {offer.items?.join(", ")}
                    </p>
                    <p>
                        <span>Number of items:</span> {offer.no_of_items}
                    </p>
                    <p>
                        <span>Free Item:</span> {offer.free_item}
                    </p>
                    <p>
                        <span>Actual Price:</span> {offer.Actual_price}
                    </p>
                    <p>
                        <span>Offer Price:</span> {offer.OfferPrice}
                    </p>
                    {/* Add a Buy button */}
                    <button className="buy-btn">Buy Now</button>
                    </div>

          ))
        ) : (
          <p>No offers available</p>
        )}
      </div>
    </div>
  );
};

export default BundleOffers;
