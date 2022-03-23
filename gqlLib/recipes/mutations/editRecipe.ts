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
  console.log(recipeInstruction);

  const recipeIngredientsString = (array) => {
    let recipeIngredientsModified;

    array?.forEach((itm) => {
      console.log(itm);

      recipeIngredientsModified = [
        ...itm?.portions?.map((elem) => {
          console.log(elem);
          if (elem.default === true) {
            return `
          {
            ingredientId: "${itm?._id}",
            weightInGram: ${elem?.meausermentWeight},
            selectedPortionName: "${elem?.measurement}"}
          `;
          }
        }),
      ];
    });

    // return(recipeIngredientsModified);
    recipeIngredientsModified = `[${recipeIngredientsModified?.toString()}]`;
    console.log(recipeIngredientsModified);
  };

  const recipeInstructionString = (array) => {
    let recipeInstructionModified = [];
    array?.forEach((itm) => {
      console.log(itm);
    });
  };

  recipeIngredientsString(recipeIngredients);

  recipeInstructionString(recipeInstruction);

  return gql`
    mutation {
      editARecipe(
        data: {
          editId: "${recipeId}"
          editableObject: {
            name: "${recipeName}"
            ingredients: [
              {
                ingredientId: "620b6bd640d3f19b558f0c1e"
                weightInGram: 100
                selectedPortionName: "cup"
              }
            ]
          }
        }
      )
    }
  `;
};
