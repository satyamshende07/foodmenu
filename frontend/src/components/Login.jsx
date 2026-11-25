
import { useState } from "react";
import { loginUser } from "../services/authService";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const data = await loginUser(username, password);

      localStorage.setItem("token", data.token);

      setMessage("Login successful!");
      onLoginSuccess();
    } catch (error) {
  console.error("Login error:", error.response?.data || error.message);
  setMessage(
    error.response?.data?.message ||
    `Login failed: ${error.response?.status || error.message}`
  );
}
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
