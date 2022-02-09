import { gql } from "@apollo/client";

interface createNewRecipeFromUserInterface {
  userId: string;
  UserName: string;
  description?: string;
  ingredients?: any;
}

export const CREATE_NEW_RECIPE_FROM_USER = ({
  userId,
  UserName,
  ingredients,
}: createNewRecipeFromUserInterface) => {
  const convertArrToString = (arr) => {
    arr = arr.map((itm) => {
      return `
            {
              ingredientId: "${itm.ingredientId}",
              weightInGram: ${itm.weightInGram},
              selectedPortionName: "${itm.selectedPortionName}"
            }
          `;
    });
    arr = `[${arr.toString()}]`;
    return arr;
  };
  return gql`
  mutation {
    addRecipeRecipeFromUser(data: {
      userId: ${JSON.stringify(userId)}
      name: ${JSON.stringify(UserName)},
      description: "none",
      recipeIngredients: [""]
      ingredients:${convertArrToString(ingredients)}
    }){
      foodCategories
      ingredients{
        weightInGram
        ingredientId,
        portions{
          name,
          quantity,
          default,
          gram
        }
        selectedPortion{
          name,
          quantity,
          gram
        }
      }
    }
  }
  `;
};
