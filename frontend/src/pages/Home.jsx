
import FoodList from "../components/FoodList";
import Login from "../components/Login";
import Register from "../components/Register";
import heroFood from "../assets/hero-food.png";

function Home({
  isLoggedIn,
  setIsLoggedIn,
  cart,
  setCart,
  showRegister,
  setShowRegister,
}) {
  return (
    <>
      {/* Hero Section */}
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

      {/* Popular Dishes */}
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
                onRegisterSuccess={() => setShowRegister(false)}
              />
            ) : (
              <Login
                onLoginSuccess={() => setIsLoggedIn(true)}
              />
            )}
          </div>
        </section>
      )}

      {/* Why Choose Crave & Co. */}
      <section className="why-choose-section">
        <p className="section-tag">
          THE CRAVE & CO. EXPERIENCE
        </p>

        <h2>Why Choose Crave & Co.?</h2>

        <p className="why-choose-description">
          We believe great food is more than just a meal.
          It's about quality, passion and unforgettable flavours.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✦</div>
            <h3>Fresh Ingredients</h3>
            <p>
              We use quality ingredients to bring freshness
              and flavour to every dish.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">♨</div>
            <h3>Expert Preparation</h3>
            <p>
              Every dish is prepared with care, passion
              and attention to detail.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">♡</div>
            <h3>Made With Love</h3>
            <p>
              We want every meal to give you a memorable
              and satisfying experience.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <h2>Crave & Co.</h2>
        <p>Good Food. Great Experience.</p>
        <p>© 2026 Crave & Co. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Home;
