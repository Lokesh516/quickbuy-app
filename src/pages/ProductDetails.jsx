import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { user } = useAuth(); 

  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);

  const [reviews, setReviews] = useState(() => {
    try {
      const stored = localStorage.getItem(`reviews_${id}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  useEffect(() => {
    if (id) {
      localStorage.setItem(`reviews_${id}`, JSON.stringify(reviews));
    }
  }, [reviews, id]);

  const handleReviewSubmit = (e) => {
  e.preventDefault();
  if (!newReview.trim()) return;
  setReviews((prev) => [
    ...prev,
    {
      text: newReview,
      rating: newRating,
      user: user?.username || "Anonymous"
    },
  ]);
  setNewReview("");
  setNewRating(5);
};

  const averageRating = () => {
    if (!reviews.length) return null;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const renderStars = (rating, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        onClick={interactive ? () => setNewRating(i + 1) : undefined}
        style={{
          color: i < rating ? "#f59e0b" : "#d1d5db",
          fontSize: "20px",
          cursor: interactive ? "pointer" : "default",
          marginRight: "4px",
        }}
      >
        ★
      </span>
    ));
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details-container">
      <img src={product.image} alt={product.title} className="details-image" />
      <div className="details-info">
        <h2>{product.title}</h2>

        {reviews.length > 0 && (
          <p className="details-rating">
            Rating: {averageRating()} ⭐ ({reviews.length} review{reviews.length > 1 ? "s" : ""})
          </p>
        )}

        <p className="details-price">${product.price}</p>
        <p className="details-desc">{product.description}</p>

        {user ? (
          <button onClick={() => addToCart(product)} className="details-add-btn">
            Add to Cart
          </button>
        ) : (
          <p className="login-msg">⚠️ Please login to add to cart</p>
        )}

        <h3 className="review-heading">Leave a Review</h3>
        <form onSubmit={handleReviewSubmit}>
          <textarea
            className="review-input"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here..."
          />
          <div style={{ marginTop: "10px" }}>
            <span style={{ fontWeight: "500", marginRight: "8px" }}>Your Rating:</span>
            {renderStars(newRating, true)}
          </div>
          <button type="submit" className="submit-review-btn">
            Submit Review
          </button>
        </form>

       {reviews.length > 0 && (
  <>
    <h4 className="review-heading">User Reviews</h4>
    <ul className="review-list">
      {reviews.map((r, i) => (
        <li key={i} className="review-item">
          <strong>{r.user}</strong>: {renderStars(r.rating)} – {r.text}
        </li>
      ))}
    </ul>
  </>
)}
      </div>
    </div>
  );
};

export default ProductDetails;
