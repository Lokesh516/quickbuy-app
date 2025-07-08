import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./Wishlist.css";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="wishlist-empty-text">Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <div key={product.id} className="wishlist-card">
              <img src={product.image} alt={product.title} className="wishlist-image" />
              <Link to={`/product/${product.id}`} className="wishlist-title-link">{product.title}</Link>
              <p className="wishlist-price">${product.price}</p>
              <div className="wishlist-buttons">
                <button onClick={() => addToCart(product)}>Add to Cart</button>
                <button onClick={() => removeFromWishlist(product.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
