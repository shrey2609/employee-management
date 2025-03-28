import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './CSS/LoginPage.css'

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error msg
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // previous-error clear

    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/users");
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
