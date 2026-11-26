
import { useState } from "react";
import api from "../services/api";

function Contact() {
  const [feedback, setFeedback] = useState({
    rating: "",
    message: "",
  });

  const [complaint, setComplaint] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [complaintMessage, setComplaintMessage] = useState("");

 const handleFeedbackSubmit = async (event) => {
  event.preventDefault();

  try {
    await api.post("/feedback", {
      rating: Number(feedback.rating),
      message: feedback.message,
    });

    setFeedbackMessage("Thank you for sharing your feedback!");
    setFeedback({ rating: "", message: "" });

  } catch (error) {
    console.error("Feedback submission failed:", error);
    setFeedbackMessage("Unable to submit feedback. Please try again.");
  }
};

  const handleComplaintSubmit = (event) => {
    event.preventDefault();
    setComplaintMessage("Your complaint has been submitted. Thank you!");
    setComplaint({
      name: "",
      email: "",
      category: "",
      message: "",
    });
  };

  return (
    <main className="contact-page">
      <section className="contact-section">
        <p className="section-tag">GET IN TOUCH</p>
        <h2>Contact Crave & Co.</h2>

        <p>
          Have a question, suggestion or feedback?
          We'd love to hear from you.
        </p>

        <div className="contact-details">
          <div>
            <h3>Visit Us</h3>
            <p>Come and enjoy a memorable dining experience.</p>
          </div>

          <div>
            <h3>Email Us</h3>
            <p>contact@craveandco.com</p>
          </div>

          <div>
            <h3>Opening Hours</h3>
            <p>Monday – Sunday: 10:00 AM – 10:00 PM</p>
          </div>
        </div>

        {/* Food Feedback Form */}
        <div className="contact-form-card">
          <p className="section-tag">YOUR EXPERIENCE MATTERS</p>
          <h2>Food Feedback</h2>
          <p>Tell us how you enjoyed your food!</p>

          <form onSubmit={handleFeedbackSubmit}>
            <label htmlFor="rating">How would you rate our food?</label>
            <select
              id="rating"
              value={feedback.rating}
              onChange={(e) =>
                setFeedback({ ...feedback, rating: e.target.value })
              }
              required
            >
              <option value="">Select your rating</option>
              <option value="5">★★★★★ - Excellent</option>
              <option value="4">★★★★ - Very Good</option>
              <option value="3">★★★ - Good</option>
              <option value="2">★★ - Average</option>
              <option value="1">★ - Poor</option>
            </select>

            <label htmlFor="feedback-message">
              Share your experience
            </label>
            <textarea
              id="feedback-message"
              placeholder="Tell us what you liked or what we can improve..."
              value={feedback.message}
              onChange={(e) =>
                setFeedback({ ...feedback, message: e.target.value })
              }
              required
              rows="5"
            />

            <button type="submit" className="primary-button">
              Submit Feedback
            </button>

            {feedbackMessage && (
              <p className="form-success">{feedbackMessage}</p>
            )}
          </form>
        </div>

        {/* Complaint Form */}
        <div className="contact-form-card">
          <p className="section-tag">WE ARE HERE TO HELP</p>
          <h2>Complaint Form</h2>
          <p>Let us know if something didn't go as expected.</p>

          <form onSubmit={handleComplaintSubmit}>
            <label htmlFor="complaint-name">Your Name</label>
            <input
              id="complaint-name"
              type="text"
              placeholder="Enter your name"
              value={complaint.name}
              onChange={(e) =>
                setComplaint({ ...complaint, name: e.target.value })
              }
              required
            />

            <label htmlFor="complaint-email">Email Address</label>
            <input
              id="complaint-email"
              type="email"
              placeholder="Enter your email"
              value={complaint.email}
              onChange={(e) =>
                setComplaint({ ...complaint, email: e.target.value })
              }
              required
            />

            <label htmlFor="complaint-category">Complaint Category</label>
            <select
              id="complaint-category"
              value={complaint.category}
              onChange={(e) =>
                setComplaint({ ...complaint, category: e.target.value })
              }
              required
            >
              <option value="">Select a category</option>
              <option value="Food Quality">Food Quality</option>
              <option value="Wrong Order">Wrong Order</option>
              <option value="Delivery">Delivery</option>
              <option value="Customer Service">Customer Service</option>
              <option value="Other">Other</option>
            </select>

            <label htmlFor="complaint-message">Describe Your Complaint</label>
            <textarea
              id="complaint-message"
              placeholder="Please explain the issue..."
              value={complaint.message}
              onChange={(e) =>
                setComplaint({ ...complaint, message: e.target.value })
              }
              required
              rows="5"
            />

            <button type="submit" className="primary-button">
              Submit Complaint
            </button>

            {complaintMessage && (
              <p className="form-success">{complaintMessage}</p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

export default Contact;
