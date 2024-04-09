import React, { useState, useEffect } from 'react';
import Header from './Header';
import ProductList from './ProductList';
import Cart from './Cart';
import Footer from './Footer';

const ProductPage = () => {
  // Initialize cartItems state with stored items from localStorage or an empty array
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    return storedCartItems || [];
  });

  // Update localStorage whenever cartItems state changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === id);
    const updatedCartItems = [...cartItems];
  
    if (existingItemIndex >= 0) {
      const existingItem = updatedCartItems[existingItemIndex];
      if (existingItem.quantity > 1) {
        // Reduce the quantity by 1
        existingItem.quantity -= 1;
      } else {
        // Remove the item from the cart
        updatedCartItems.splice(existingItemIndex, 1);
      }
    }
  
    setCartItems(updatedCartItems);
  };

  return (
    <div className="product-page">
      <Header />
      <table style={{ width: "100%" }}>
        <tr>
          <td style={{ verticalAlign: 'top' }}><ProductList onAddToCart={addToCart} /></td>
          <td style={{ verticalAlign: 'top' }}><Cart cartItems={cartItems} onRemove={removeFromCart} /></td>
        </tr>
      </table>
      <Footer />
    </div>
  );
};

export default ProductPage;