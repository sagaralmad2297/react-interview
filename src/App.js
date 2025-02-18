import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import CartPage from './components/CartPage';
import Checkout from './components/Checkout'; 


function App() {
 
  const authToken = localStorage.getItem('authToken');

  return (
    <Router>
      <div className="App">
        
        {!authToken && (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
   
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/cart/:productId" element={<CartPage />} /> 
          <Route path="/checkout/:productId"  element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
