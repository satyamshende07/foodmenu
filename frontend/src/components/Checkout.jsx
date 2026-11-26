
import { useState } from "react";
import api from "../services/api";

function Checkout({ cart, onBack, onOrderSuccess }) {
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);

  const totalPrice = cart.reduce(
    (total, food) => total + food.price * food.quantity,
    0
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
   setErrorMessage("");

    const orderData = {
      customerName,
      mobileNumber,
      address,
      paymentMethod,
      items: cart.map((food) => ({
        foodId: food.id,
        foodName: food.name,
        price: food.price,
        quantity: food.quantity,
      })),
      totalAmount: totalPrice,
    };

    try {
      const response = await api.post("/orders/place", orderData);

     setPlacedOrder(response.data);

      if (onOrderSuccess) {
        onOrderSuccess();
      }
    } catch (error) {
      console.error("Order placement failed:", error);

      setErrorMessage(
        error.response?.data?.message ||
        "Unable to place your order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  if (placedOrder) {
  return (
    <section className="checkout-page">
      <div className="order-confirmation">
        <div className="success-icon">✓</div>

        <h2>Order Placed Successfully!</h2>

        <p>Thank you for ordering with Crave & Co.</p>

        <div className="confirmation-details">
          <p>
            <strong>Order ID:</strong> {placedOrder.id}
          </p>

          <p>
            <strong>Order Status:</strong> {placedOrder.orderStatus}
          </p>

          <p>
            <strong>Payment Method:</strong> {placedOrder.paymentMethod}
          </p>

          <p>
            <strong>Total Amount:</strong> ₹{placedOrder.totalAmount}
          </p>
        </div>

        <button type="button" onClick={onBack}>
          Continue Ordering
        </button>
      </div>
    </section>
  );
}

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

      <form className="delivery-form" onSubmit={handleSubmit}>
        <h3>Delivery Details</h3>

        <label>Customer Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={customerName}
          onChange={(event) => setCustomerName(event.target.value)}
          required
        />

        <label>Mobile Number</label>
        <input
          type="tel"
          placeholder="Enter your 10-digit mobile number"
          value={mobileNumber}
          onChange={(event) => setMobileNumber(event.target.value)}
          pattern="[0-9]{10}"
          maxLength="10"
          required
        />

        <label>Delivery Address</label>
        <textarea
          placeholder="Enter your complete delivery address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          required
        />

        <label>Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(event) => setPaymentMethod(event.target.value)}
        >
          <option value="COD">Cash on Delivery</option>
        </select>

        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}

        <button type="submit" disabled={loading || cart.length === 0}>
          {loading ? "Placing Order..." : "Place Order"}
        </button>

        <button type="button" onClick={onBack} disabled={loading}>
          Back to Cart
        </button>
      </form>
    </section>
  );
}

export default Checkout;
