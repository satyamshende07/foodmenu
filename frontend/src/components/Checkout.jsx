
function Checkout({ cart, onBack }) {
  const totalPrice = cart.reduce(
    (total, food) => total + food.price * food.quantity,
    0
  );

  return (
    <section className="checkout-page">
      <h2>Checkout</h2>

      <div className="checkout-summary">
        <h3>Order Summary</h3>

        {cart.map((food) => (
          <div className="checkout-item" key={food.id}>
            <span>
              {food.name} × {food.quantity}
            </span>

            <span>₹{food.price * food.quantity}</span>
          </div>
        ))}

        <h3>Total Amount: ₹{totalPrice}</h3>
      </div>

      <button onClick={onBack}>
        Back to Cart
      </button>
    </section>
  );
}

export default Checkout;
