
function Cart({
  cart,
  showCart,
  onClose,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
    onCheckout,
})  {
  if (!showCart) {
    return null;
  }

  const totalPrice = cart.reduce(
    (total, food) => total + food.price * food.quantity,
    0
  );

  return (
    <section className="cart-page">
      <div className="cart-page-header">
        <h2>Your Shopping Cart</h2>
        <button onClick={onClose}>Back</button>
      </div>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((food) => (
              <div className="cart-item" key={food.id}>
                <div>
                  <h3>{food.name}</h3>
                  <p>₹{food.price}</p>
                </div>

                <div className="quantity-controls">
                  <button
                    onClick={() => decreaseQuantity(food.id)}
                  >
                    −
                  </button>

                  <span>{food.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(food.id)}
                  >
                    +
                  </button>
                </div>
                <button
  className="remove-cart-button"
  onClick={() => removeFromCart(food.id)}
>
  Remove
</button>
              </div>
            ))}
          </div>

          <div className="cart-total">
  <h3>Total: ₹{totalPrice}</h3>

  <button
  className="checkout-button"
  onClick={onCheckout}
>
  Proceed to Checkout
</button>
</div>
        </>
      )}
    </section>
  );
}

export default Cart;
