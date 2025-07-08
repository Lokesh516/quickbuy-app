import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find((u) => u.email === email);

    if (found) {
      setMessage(`✅ Your password is: ${found.password}`);
    } else {
      setMessage("❌ No user found with this email.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your registered email"
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p style={{ marginTop: "10px", color: "darkblue" }}>{message}</p>}
      <p style={{ marginTop: "16px" }}>
        Remember now?{" "}
        <span
          onClick={() => navigate("/login")}
          style={{ color: "#2563eb", cursor: "pointer" }}
        >
          Go back to login
        </span>
      </p>
    </div>
  );
};

export default ForgotPassword;
