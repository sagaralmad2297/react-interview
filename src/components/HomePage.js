import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsThunk, fetchCategoriesThunk, setSelectedCategory, setPage } from '../redux/productSlice';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, categories, selectedCategory, page, totalPages, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsThunk({ category: selectedCategory, page }));
  }, [dispatch, selectedCategory, page]);

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    dispatch(setSelectedCategory(e.target.value));
  };

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleAddToCart = (productId) => {
    navigate(`/cart/${productId}`);
  };

  return (
    <div className="home-page">
      <h2>Product List</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <span>${product.price}</span>
            <button 
  style={{
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    marginTop: '10px'
  }} 
  onClick={() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('Please log in to continue');
    } else {
      handleAddToCart(product.id);
    }
  }}
>
  Add to Cart
</button>

          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
        <span>{page}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default HomePage;
