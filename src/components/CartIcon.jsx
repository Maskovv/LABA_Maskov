import React from 'react';
import { useCart } from '../contexts/CartContext';

const CartIcon = () => {
  const { totalItems, clearCart } = useCart();

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
      <button
        className="btn btn-outline-primary position-relative"
        onClick={clearCart}
        title="Очистить корзину"
      >
        <i className="bi bi-cart3"></i>
        {totalItems > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {totalItems}
          </span>
        )}
      </button>
    </div>
  );
};

export default CartIcon;
