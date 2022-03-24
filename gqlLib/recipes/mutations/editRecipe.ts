import { gql } from "@apollo/client";

interface editARecipeInterface {
  recipeId: any;
  recipeName: string;
  recipeIngredients: object[];
  recipeInstruction: object[];
}

export const EDIT_A_RECIPE = ({
  recipeId,
  recipeName,
  recipeIngredients,
  recipeInstruction,
}: editARecipeInterface) => {
  const recipeIngredientsString = (array) => {
    let recipeIngredientsModified = [];
    array?.map((elem) => {
      elem?.portions?.forEach((itm) => {
        if (itm.default === true) {
          recipeIngredientsModified = [
            ...recipeIngredientsModified,
            `{ingredientId: "${elem?._id}",weightInGram: ${itm?.meausermentWeight},selectedPortionName: "${itm?.measurement}"}`,
          ];
        }
      });
    });
    return `[${recipeIngredientsModified}]`;
  };

  const recipeInstructionString = (array) => {
    let recipeInstructionModified = [];
    array?.forEach((itm) => {
      recipeInstructionModified = [...recipeInstructionModified, `"${itm.step}"`];
    });

    return(`[${recipeInstructionModified}]`)
  };

  return gql`
    mutation {
      editARecipe(
        data: {
          editId: "${recipeId}"
          editableObject: {
            name: "${recipeName}"
            ingredients: ${recipeIngredientsString(recipeIngredients)}
            recipeInstructions: ${recipeInstructionString(recipeInstruction)}
          }
        }
      )
    }
  `;
};
