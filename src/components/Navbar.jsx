import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import './Navbar.css';

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
      <Link to="/" className="logo">QuickBuy</Link>

      <div className="hamburger" onClick={handleMenuToggle}>
        &#9776;
      </div>

      <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
        <li><Link to="/">Home</Link></li>

        {!isAuthPage && (
          <>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li>
              <Link to="/cart" className="cart-link">
                🛒 <span className="badge">{cart.length}</span>
              </Link>
            </li>
          </>
        )}

        {user ? (
          <>
            <li className="welcome-msg">Welcome, {user.username}</li>
            <li><button onClick={logout} className="logout-btn">Logout</button></li>
          </>
        ) : (
          !isAuthPage && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          )
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
