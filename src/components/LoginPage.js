import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/authThunk';

const Login = () => {
  const [email, setEmail] = useState('');
  const expiresInMins = '30';
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, error, loading } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    dispatch(loginUser({ email, password, expiresInMins }));
  };

  if (token) {
    navigate('/homepage');
    return null;
  }

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-group">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <button type="submit" disabled={loading} className="login-btn">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
