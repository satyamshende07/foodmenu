
import "./App.css";
import FoodList from "./components/FoodList";
import Login from "./components/Login";
import heroFood from "./assets/hero-food.png";
import { useState } from "react";
import Register from "./components/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
  Boolean(localStorage.getItem("token"))
);
const [showRegister, setShowRegister] = useState(false);
const handleLogout = () => {
  localStorage.removeItem("token");
  setIsLoggedIn(false);
};
  return (
    
    <div className="app">

      {/* Navigation */}
      <header className="navbar">
        <h1 className="logo">Crave <span>&</span> Co.</h1>

        <nav>
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav-actions">
  <button className="cart-button">🛒</button>

  {isLoggedIn ? (
    <button className="signup-button" onClick={handleLogout}>
      Logout
    </button>
  ) : (
    <a
  href="#login"
  className="signup-button"
  onClick={() => setShowRegister(true)}
>
  Sign Up
</a>
  )}
</div>
        
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="hero-tagline">WELCOME TO Crave & Co.</p>

          <h2>
            It's Not Just
            <br />
            Food, It's An
            <br />
            Experience.
          </h2>

          <p className="hero-description">
            Discover delicious flavours and enjoy
            every bite with us.
          </p>

          <div className="hero-buttons">
            <a href="#menu" className="primary-button">
              View Menu
            </a>

            <a href="#contact" className="secondary-button">
              Book A Table
            </a>
          </div>

          
        </div>

        <div className="hero-image">
          <img
            src="src/assets/hero-food.png"
            alt="Crave and Co signature food bowl" 
          />
        </div>
      </section>

      {/* Food Menu */}
<section className="menu-section" id="menu">
  <p className="section-tag">OUR SPECIALITIES</p>
  <h2>Popular Dishes</h2>

  {isLoggedIn ? (
    <FoodList isLoggedIn={isLoggedIn} />
  ) : (
    <p>Please log in to explore our delicious menu.</p>
  )}
</section>

{/* Login Section */}
{!isLoggedIn && (
  <section className="login-section" id="login">
    <div className="auth-container">

      <div className="auth-tabs">
        <button
          className={!showRegister ? "active" : ""}
          onClick={() => setShowRegister(false)}
        >
          Login
        </button>

        <button
          className={showRegister ? "active" : ""}
          onClick={() => setShowRegister(true)}
        >
          Register
        </button>
      </div>

      {showRegister ? (
        <Register
  onRegisterSuccess={() => setShowRegister(false)}
/>
      ) : (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      )}

    </div>
  </section>
)}


      {/* Footer */}
      <footer id="contact">
        <h2>Crave & Co.</h2>
        <p>Good Food. Great Experience.</p>
        <p>© 2026 Crave & Co.. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;
