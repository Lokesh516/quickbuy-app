import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react"; // Import useState for toggle logic
import './Navbar.css';

const Navbar = () => {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track the menu toggle

  // Toggle menu visibility on mobile
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
      <Link to="/" className="logo">QuickBuy</Link>
      
      {/* Hamburger Icon */}
      <div className="hamburger" onClick={handleMenuToggle}>
        &#9776; {/* represents the hamburger icon */}
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cart">Cart ({cart.length})</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
