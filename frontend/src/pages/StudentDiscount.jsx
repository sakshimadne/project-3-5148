import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/studentDiiscount.css';  // Assuming we'll use a separate CSS file for styling.

const StudentDiscount = () => {
  const [discounts, setDiscounts] = useState([]);

  // Fetch data from Firebase
  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await axios.get('https://mit-marketplace-2bc8b-default-rtdb.firebaseio.com/studentDiscount.json');
        const data = response.data ? Object.values(response.data) : [];
        setDiscounts(data);
      } catch (error) {
        console.error('Error fetching student discounts:', error);
      }
    };

    fetchDiscounts();
  }, []);

  return (
    <div className="discounts-container">
      {discounts.map((discount, index) => (
        <div key={index} className="discount-card">
          <h3>{discount.title}</h3>
          <p><strong>Items:</strong> {discount.items.join(", ")}</p>
          <p><strong>Original Price:</strong> ${discount.original_price}</p>
          <p><strong>For Students:</strong> ${discount.for_students}</p>
          <p><strong>Savings:</strong> {discount.savings}</p>
          <button className="buy-button">Buy Now</button>
        </div>
      ))}
    </div>
  );
};

export default StudentDiscount;

