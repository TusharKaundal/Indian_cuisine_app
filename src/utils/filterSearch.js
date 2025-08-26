export const searchDishes = (dishesData, query) => {
  const lowercaseQuery = query.toLowerCase();
  return dishesData.filter((dish) => {
    return (
      dish?.name?.toLowerCase().includes(lowercaseQuery) ||
      dish?.ingredients?.some((ingredient) =>
        ingredient?.toLowerCase().includes(lowercaseQuery)
      ) ||
      dish?.state?.toLowerCase().includes(lowercaseQuery) ||
      dish?.region?.toLowerCase().includes(lowercaseQuery)
    );
  });
};

export const getSuggestedDishes = (selectedIngredients, dishesData) => {
  if (selectedIngredients.length === 0) return [];

  return dishesData.filter((dish) => {
    return selectedIngredients.every((ingredient) =>
      dish.ingredients.some((dishIngredient) =>
        dishIngredient.toLowerCase().includes(ingredient.toLowerCase())
      )
    );
  });
};
