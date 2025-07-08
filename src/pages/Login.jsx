import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate("/");
    } else {
      setErr("Invalid email or password");
    }
  };

  return (
  <div className="auth-container">
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
    
    {err && <p style={{ color: "red" }}>{err}</p>}

    <p className="auth-footer-text">
      Don't have an account? <Link to="/signup">Sign Up</Link>
    </p>

    <p style={{ marginTop: "12px" }}>
  <span
    style={{ color: "#2563eb", cursor: "pointer" }}
    onClick={() => navigate("/forgot-password")}
  >
    Forgot Password?
  </span>
</p>
  </div>
);
}

export default Login;
