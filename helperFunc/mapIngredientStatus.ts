const mapIngredientStatus = (ingredients = [], errorIngredients = []) => {
  return [
    ...ingredients?.map((ing) => ({
      ...ing,
      ingredientStatus: "ok",
    })),
    ...errorIngredients?.map((ing) => ({
      ...ing,
      ingredientStatus: "partial_ok",
      _id: ing?.qaId,
      ingredientName: ing?.errorString,
    })),
  ];
};

export default mapIngredientStatus;
