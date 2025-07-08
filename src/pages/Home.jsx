import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    "All",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  return (
    <div className="home-container">
      <h2 className="home-title">Products</h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search products..."
        className="search-box"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="category-buttons">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={cat === "All" ? "/" : `/category/${cat}`}
            className="category-btn-link"
          >
            <button className="category-btn">{cat}</button>
          </Link>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <p>No matching products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <div className="product-header">
                <h3 className="product-title">
                  <Link to={`/product/${product.id}`}>{product.title}</Link>
                </h3>
                <button
                  className="wishlist-btn"
                  onClick={() =>
                    isInWishlist(product.id)
                      ? removeFromWishlist(product.id)
                      : addToWishlist(product)
                  }
                >
                  {isInWishlist(product.id) ? (
                    <FaHeart color="red" />
                  ) : (
                    <FaRegHeart color="gray" />
                  )}
                </button>
              </div>
              <p className="product-price">${product.price}</p>

              <button
                onClick={() => {
                  if (user) {
                    addToCart(product);
                  } else {
                    navigate("/login", { state: { from: location.pathname } });
                  }
                }}
                className="add-to-cart-btn"
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
