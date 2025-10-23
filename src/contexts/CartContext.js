import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [totalItems, setTotalItems] = useState(0);

  const addToCart = (productId) => {
    setCartItems(prev => {
      const newItems = { ...prev };
      newItems[productId] = (newItems[productId] || 0) + 1;
      return newItems;
    });
    setTotalItems(prev => prev + 1);
  };

  const clearCart = () => {
    setCartItems({});
    setTotalItems(0);
  };

  const getItemCount = (productId) => {
    return cartItems[productId] || 0;
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      totalItems,
      addToCart,
      clearCart,
      getItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
