
import { useState } from "react";
import { registerUser } from "../services/authService";

function Register({ onRegisterSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const data = await registerUser(username, password);

      setMessage("Registration successful! You can now log in.");
      setUsername("");
      setPassword("");
      onRegisterSuccess();

      console.log("Registration response:", data);
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);

      setMessage(
        error.response?.data?.detail ||
error.response?.data?.message ||
"Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="register-container">
      <h2>Create Your Account</h2>
      <p>Join Crave & Co. today!</p>

      <form onSubmit={handleRegister}>
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

        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
