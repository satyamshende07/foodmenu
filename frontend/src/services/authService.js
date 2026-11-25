
import api from "./api";

export const loginUser = async (username, password) => {
  const response = await api.post("/auth/login", {
    username,
    password,
  });
  

  return response.data;
};
// Register a new user
export const registerUser = async (username, password) => {
  const response = await api.post("/auth/register", {
    username,
    password,
  });

  return response.data;
};