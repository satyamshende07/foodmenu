
import "./App.css";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";

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
          <Link to="/menu">Menu</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
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
            <Home
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              cart={cart}
              setCart={setCart}
              showRegister={showRegister}
              setShowRegister={setShowRegister}
            />
          }
        />
        {/* Menu Page */}
<Route
  path="/menu"
  element={
    <Menu
      isLoggedIn={isLoggedIn}
      cart={cart}
      setCart={setCart}
    />
  }
/>
{/* About Page */}
<Route
  path="/about"
  element={<About />}
/>

{/* Contact Page */}
<Route
  path="/contact"
  element={<Contact />}
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
              onOrderSuccess={() => setCart([])}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
