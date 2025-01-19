import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Adddata.css'

const AddCart = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8001/products');
        setProducts(response.data);
        console.log('my console.', response)
      } catch (error) {
        console.error('Error fetching products:', error.response?.data || error.message);
      }
    };
    fetchProducts();
  }, []);

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to view your cart.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8001/carts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       
        setCart(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error('Error fetching cart:', error.response?.data || error.message);
      }
    };
    fetchCart();
  }, []);


  

  // Add to cart
  const addToCart = async (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must log in to add items to your cart.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8001/carts',
        { productId: product.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Item added to cart successfully!');
      setCart((prevCart) => [...prevCart, response.data]);
    } catch (error) {
      console.error('Error adding to cart:', error.response?.data || error.message);
      alert('Failed to add item to cart.');
    }
  };
  const removeFromCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must log in to remove items from your cart.');
      return;
    }
  
    try {
      const response = await axios.delete(`http://localhost:8001/carts/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Item removed from cart successfully!');
      setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    } catch (error) {
      console.error('Error removing from cart:', error.response?.data || error.message);
      alert('Failed to remove item from cart.');
    }
  };
  console.log(products)
console.log("my cart",cart)
  return (
    <div className="cart-container">
    <h1>Your Cart</h1>
    {cart.length > 0 ? (
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item._id}>
            <div className="product-info">
              {/* Product image */}
              <img 
                src={item.product.image} 
                alt={item.product.name} 
                className="product-image" 
              />
              <div>
                <span className="product-name">{item.product.name}</span>
                <span>Price: ${item.product.price}</span>
                <span>Quantity: {item.product.quantity}</span>
              </div>
            </div>
            <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
          </li>
        ))}
      </ul>
    ) : (
      <div className="empty-message">Your cart is empty.</div>
    )}
  </div>
  
  );
};

export default AddCart;
