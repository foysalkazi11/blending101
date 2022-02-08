import { gql } from "@apollo/client";

interface createNewRecipeFromUserInterface {
  userId: string;
  UserName: string;
  description?: string;
  ingredients?: any;
}

// { ingredientId: "61c6e4453a320071dc96ab1a", customWeightInGram: 88 }
// {
//               ingredientId: "61c6e4453a320071dc96ab3e"
//               portion: { measurement: "Cup", meausermentWeight: "32" }
// }
// { ingredientId: "61c6e4493a320071dc96acc4", customWeightInGram: 44 }

export const CREATE_NEW_RECIPE_FROM_USER = ({
  userId,
  UserName,
  ingredients,
}: createNewRecipeFromUserInterface) => {
  return gql`
    mutation {
      addRecipeRecipeFromUser(
        data: {
          userId: ${JSON.stringify(userId)}
          name: ${JSON.stringify(UserName)}
          description: "none"
          recipeIngredients: [""]
          ingredients: [
            ${ingredients.map((elem, index) => {
              return JSON.parse(elem.ingredientId);
            })}
          ]
        }
      ) {
        name
        foodCategories
        ingredients {
          ingredientId
          portion {
            measurement
            meausermentWeight
          }
        }
      }
    }
  `;
};
