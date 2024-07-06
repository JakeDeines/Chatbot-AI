import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="navbar">
      <h1>Chatbot App</h1>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/chatbot">Chatbot</Link>
      </nav>
    </header>
  );
};

export default Header;
