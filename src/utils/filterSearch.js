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
