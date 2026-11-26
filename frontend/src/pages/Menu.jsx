import FoodList from "../components/FoodList";

function Menu({ isLoggedIn, cart, setCart }) {
  return (
    <main className="menu-page">
      <section className="menu-section">
        <p className="section-tag">EXPLORE OUR MENU</p>
        <h2>Our Delicious Menu</h2>

        {isLoggedIn ? (
          <FoodList
            isLoggedIn={isLoggedIn}
            cart={cart}
            setCart={setCart}
          />
        ) : (
          <p>Please log in to explore our delicious menu.</p>
        )}
      </section>
    </main>
  );
}

export default Menu;