/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const DishContext = createContext();
export const DishProvider = ({ children }) => {
  const [dishes, setDishes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDishes = async () => {
    try {
      const response = await axios.get(
        `/api/dishes`
      );
      setDishes(response.data);
    } catch (err) {
      console.error("Error fetching dishes:", err);
    }
  };

  const fetchIngredients = async () => {
    try {
      const response = await axios.get(
        `/api/ingredients`
      );
      setIngredients(response.data);
    } catch (err) {
      console.error("Error fetching ingredients:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchDishes(), fetchIngredients()]);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const value = {
    dishes,
    ingredients,
    loading,
    getDishes: fetchDishes,
    getIngredients: fetchIngredients,
  };

  return <DishContext.Provider value={value}>{children}</DishContext.Provider>;
};

export const useDish = () => {
  const context = useContext(DishContext);
  if (!context) {
    throw new Error("context must be used within a DishProvider");
  }
  return context;
};
