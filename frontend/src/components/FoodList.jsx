
import {useCallback, useEffect, useRef, useState } from "react";
import { getAllFood, searchFood } from "../services/foodService";

function FoodList({ isLoggedIn, cart, setCart }) {
  const [foods, setFoods] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const toastTimer = useRef(null);

const showToast = (foodName) => {
  setToastMessage(`${foodName} added to cart!`);

  if (toastTimer.current) {
    clearTimeout(toastTimer.current);
  }

  toastTimer.current = setTimeout(() => {
    setToastMessage("");
    toastTimer.current = null;
  }, 2000);
};

useEffect(() => {
  return () => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }
  };
}, []);
 const addToCart = (food) => {

  setCart((previousCart) => {
    const existingItem = previousCart.find(
      (item) => item.id === food.id
    );

    if (existingItem) {
      return previousCart.map((item) =>
        item.id === food.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...previousCart, { ...food, quantity: 1 }];
  });

  showToast(food.name);
};

  const handleLoadFoods = useCallback(async () => {
    try {
      setLoading(true);
      setMessage("");

      const data = await getAllFood();

      console.log("Food API response:", data);

      setFoods(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("Food loading error:", error);
      setMessage("Unable to load food items.");
    } finally {
      setLoading(false);
    }
  },[]);


const handleSearch = async () => {
  try {
    setLoading(true);
    setMessage("");

    if (!searchTerm.trim()) {
      await handleLoadFoods();
      return;
    }

    const data = await searchFood(searchTerm);

    console.log("Search API response:", data);

    setFoods(Array.isArray(data) ? data : data.data || []);

  } catch (error) {
    console.error("Search error:", error);
    setMessage("Unable to search food items.");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
  if (isLoggedIn) {
    handleLoadFoods();
  } else {
    setFoods([]);
    setMessage("");
  }
}, [isLoggedIn, handleLoadFoods]);

  return (
    <div>
      {toastMessage && (
  <div className="toast-message">
    <span className="toast-check">✓</span>
    {toastMessage}
  </div>
)}
      {!isLoggedIn && (
  <p>Please log in to explore our delicious menu.</p>
)}

{isLoggedIn && message && <p>{message}</p>}

      {loading && <p>Loading food items...</p>}


<div className="food-search">
  <input
    type="text"
    placeholder="Search food... (e.g. Pizza)"
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
  />

  <button onClick={handleSearch}>
    Search
  </button>

  <button onClick={handleLoadFoods}>
    Show All
  </button>
</div>


      {!loading && foods.length === 0 && !message && (
        <p>No food items available.</p>
      )}

      {!loading && foods.length > 0 && (
        <div className="food-grid">
         {foods.map((food) => (
  <div className="food-card" key={food.id}>
    <div className="food-card-image">
      <img
        src={
          {
            "Paneer Tikka Masala": "public/images/paneer-tikka.png",
            "Butter Chicken": "public/images/butter-chicken.png",
            "Paneer Biryani": "public/images/paneer-biryani.png",
            "White Sauce Pasta": "public/images/white-sauce-pasta.png",
          }[food.name] || "/images/default-food.jpg"
        }
        alt={food.name}
      />
    </div>

    <div className="food-card-content">
      <h3>{food.name}</h3>
      <p>{food.category}</p>
      <h4>₹{food.price}</h4>
     <button
  className="add-cart-button"
  onClick={() => addToCart(food)}
>
  Add to Cart
</button>
    </div>
  </div>
))}
        </div>
      )}
    </div>
  );
}

export default FoodList;
