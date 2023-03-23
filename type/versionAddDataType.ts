interface ingredientsType {
  ingredientId: string;
  selectedPortionName: string;
  weightInGram: number;
}

export interface VersionAddDataType {
  description?: string;
  ingredients?: ingredientsType[];
  postfixTitle: string;
  recipeId: string;
  recipeInstructions?: string[];
  servingSize?: number;
  userId: string;
  selectedImage?: string;
}
