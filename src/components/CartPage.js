import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductsThunk, fetchCategoriesThunk, setSelectedCategory, setPage } from '../redux/productSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, products, selectedCategory, page, totalPages, loading, error } = useSelector(
    (state) => state.products
  );
  const { productId } = useParams();
  const filteredProductId = Number(productId);

  useEffect(() => {
    dispatch(fetchProductsThunk({ category: selectedCategory, page }));
  }, [dispatch, selectedCategory, page]);

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  const productInCart = products.filter((product) => product.id === filteredProductId);

  const handleCheckout = () => {
    navigate(`/checkout/${productId}`);
  };

  return (
    <div className="cart-page">
      <h2>Cart</h2>
      {productInCart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className="cart-items">
          {productInCart.map((product, index) => (
            <div key={index} className="cart-item-card">
              <div className="cart-item-card-content">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="cart-item-card-image"
                />
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{product.title}</h3>
                  <p className="cart-item-description">{product.description}</p>
                  <span className="cart-item-price">${product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="checkout-container">
        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
