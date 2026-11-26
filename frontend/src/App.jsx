
import "./App.css";
import FoodList from "./components/FoodList";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import heroFood from "./assets/hero-food.png";

import { useState } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const [cart, setCart] = useState([]);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCart([]);
  };

  const increaseQuantity = (foodId) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === foodId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (foodId) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === foodId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (foodId) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== foodId)
    );
  };

  return (
    <div className="app">

      {/* Navigation */}
      <header className="navbar">
        <h1 className="logo">
          Crave <span>&</span> Co.
        </h1>

        <nav>
          <Link to="/">Home</Link>
          <a href="/#menu">Menu</a>
          <a href="/#about">About Us</a>
          <a href="/#contact">Contact</a>
        </nav>

        <div className="nav-actions">
          <button
            className="cart-button"
            onClick={() => navigate("/cart")}
          >
            🛒 <span>{cart.length}</span>
          </button>

          {isLoggedIn ? (
            <button className="signup-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <a
              href="/#login"
              className="signup-button"
              onClick={() => setShowRegister(true)}
            >
              Sign Up
            </a>
          )}
        </div>
      </header>

      {/* Page Routes */}
      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <section className="hero" id="home">
                <div className="hero-content">
                  <p className="hero-tagline">
                    WELCOME TO Crave & Co.
                  </p>

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
                    src={heroFood}
                    alt="Crave and Co signature food bowl"
                  />
                </div>
              </section>

              {/* Food Menu */}
              <section className="menu-section" id="menu">
                <p className="section-tag">OUR SPECIALITIES</p>
                <h2>Popular Dishes</h2>

                {isLoggedIn ? (
                  <FoodList
                    isLoggedIn={isLoggedIn}
                    cart={cart}
                    setCart={setCart}
                  />
                ) : (
                  <p>
                    Please log in to explore our delicious menu.
                  </p>
                )}
              </section>

              {/* Login and Registration */}
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
                        onRegisterSuccess={() =>
                          setShowRegister(false)
                        }
                      />
                    ) : (
                      <Login
                        onLoginSuccess={() =>
                          setIsLoggedIn(true)
                        }
                      />
                    )}
                  </div>
                </section>
              )}

              {/* Footer */}
              <footer id="contact">
                <h2>Crave & Co.</h2>
                <p>Good Food. Great Experience.</p>
                <p>© 2026 Crave & Co. All rights reserved.</p>
              </footer>
            </>
          }
        />

        {/* Cart Page */}
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              showCart={true}
              onClose={() => navigate("/")}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
              onCheckout={() => navigate("/checkout")}
            />
          }
        />

        {/* Checkout Page */}
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              onBack={() => navigate("/cart")}
            />
          }
        />

      </Routes>
    </div>
  );
}

export default App;
