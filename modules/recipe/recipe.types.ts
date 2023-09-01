export interface Ingredient {
  ingredientId: {
    _id: string;
    ingredientName: string;
    featuredImage: string;
    portions: {
      measurement: string;
      meausermentWeight: string;
    }[];
  };
  selectedPortion: {
    name: string;
    quantity: number;
    gram: number;
  };
}

export interface ProfileRecipe {
  isMatch: boolean;
  recipeId: {
    _id: string;
    name: string;
    recipeBlendCategory: {
      name: string;
      _id: string;
    };
    averageRating?: number;
    totalRating?: number | null;
    brand?: {
      brandName: string;
    };
    image?: {
      image: string;
      default: boolean;
    }[];
  };
  defaultVersion: {
    postfixTitle: string;
    calorie: {
      value: number;
    };
    gigl: {
      netCarbs: number;
      rxScore: number | null;
    };
    ingredients: Ingredient[];
  };
}

export default Ingredient;
