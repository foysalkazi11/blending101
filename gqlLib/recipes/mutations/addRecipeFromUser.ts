import { gql } from "@apollo/client";

interface createNewRecipeFromUserInterface {
  userId?: string;
  description?: string;
  ingredients?: any;
  image?: any;
  recipeInstructions?: any;
  recipeName?: string;
  SelecteApiParameter?: any;
}

export const CREATE_NEW_RECIPE_FROM_USER = ({
  userId,
  ingredients,
  image,
  recipeInstructions,
  recipeName,
  SelecteApiParameter,
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

  const convertImageArrayToString = (arr) => {
    let imageArr = [];
    arr &&
      arr.map((elem, index) => {
        if (index === 0) {
          imageArr.push(`
        {
          image : "${elem}",
          default : true
        }
        `);
        } else {
          imageArr.push(`
        {
          image : "${elem}",
          default : false
        }
        `);
        }
      });
    return `[${imageArr}]`;
  };

  const converInstructionToString = (arr) => {
    let instructionArr = [];
    arr &&
      arr.map((elem, index) => {
        // console.log(elem);
        instructionArr.push(`"${elem.step}"`);
      });

    return `[${instructionArr}]`;
  };

  return gql`
 mutation {
   addRecipeRecipeFromUser(data: {
     userId: ${JSON.stringify(userId)}
     name: ${JSON.stringify(recipeName)},
     description: "none",
     recipeIngredients: [""]
     ingredients:${convertArrToString(ingredients)}
     image:${convertImageArrayToString(image)}
     recipeInstructions:${converInstructionToString(recipeInstructions)}
   }){
     foodCategories
     recipeInstructions
     name
   image{
     image,
     default
   }
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
