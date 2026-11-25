
import api from "./api";


export const getAllFood = async () => {
  try {
    const response = await api.get("/all-food");
    return response.data;
  } catch (error) {
    console.error("Error fetching food:", error);
    throw error;
  }
};


export const searchFood = async (name) => {
  try {
    const response = await api.get("/search", {
      params: { name },
    });

    return response.data;
  } catch (error) {
    console.error("Error searching food:", error);
    throw error;
  }
};
