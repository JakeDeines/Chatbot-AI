import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import './Header.css';

const Header = () => {
  const { currentUser, signOut } = useAuth();
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  return (
    <header className="navbar">
      <h1>Chatbot App</h1>
      <nav>
        {!isLoginPage && !currentUser && (
          <Link to="/login">Login</Link>
        )}
        {currentUser && (
          <button onClick={signOut}>Logout</button>
        )}
      </nav>
    </header>
  );
};

export default Header;
