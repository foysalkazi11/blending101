import { Ingredient } from "../type/recipeType";

// joni ingredients
const joniIngredients = (ingredients: Ingredient[] = []) => {
  let ingredientsArr: string[] = [];
  ingredients?.forEach((ing) => {
    const ingredient = ing?.ingredientId?.ingredientName;
    if (ingredient) ingredientsArr.push(ingredient);
  });
  return ingredientsArr.join(", ");
};

export default joniIngredients;
