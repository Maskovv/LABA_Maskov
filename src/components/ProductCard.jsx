import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import "./ProductCard.scss";

const formatPrice = (value) => {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
};

const ProductCard = ({ product }) => {
  const { addToCart, getItemCount } = useCart();
  const [isPurchased, setIsPurchased] = useState(false);
  
  const { id, title, price, imageSrc, bonusPoints = 0, description } = product;
  const itemCount = getItemCount(id);

  const handleBuy = () => {
    if (!isPurchased) {
      addToCart(id);
      setIsPurchased(true);
    }
  };

  return (
    <div className={`card product-card ${isPurchased ? 'purchased' : ''}`}>
      <div className="product-card__image-wrapper position-relative">
        {bonusPoints > 0 && (
          <div className="product-card__badge badge bg-danger position-absolute top-0 start-0 m-2">
            {new Intl.NumberFormat("ru-RU").format(bonusPoints)} ₽
          </div>
        )}
        <img className="product-card__image card-img-top" src={imageSrc} alt={title} />
      </div>
      <div className="card-body">
        <h5 className="card-title product-card__title">{title}</h5>
        {description && <p className="card-text text-muted small">{description}</p>}
        <div className="d-flex justify-content-between align-items-center">
          <span className="product-card__price h5 text-primary mb-0">{formatPrice(price)}</span>
          {itemCount > 0 && (
            <span className="badge bg-success">В корзине: {itemCount}</span>
          )}
        </div>
        <button 
          className={`btn w-100 mt-2 ${isPurchased ? 'btn-success' : 'btn-primary'}`}
          onClick={handleBuy}
          disabled={isPurchased}
          type="button"
        >
          {isPurchased ? 'Куплено' : 'Купить'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;


