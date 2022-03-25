import { gql } from "@apollo/client";

interface createNewRecipeFromUserInterface {
  userId?: string;
  description?: string;
  ingredients?: any;
  image?: any;
  recipeInstructions?: any;
  recipeName?: string;
  SelectedblendCategory?: any;
}

export const CREATE_NEW_RECIPE_FROM_USER = ({
  userId,
  ingredients,
  image,
  recipeInstructions,
  recipeName,
  SelectedblendCategory,
}: createNewRecipeFromUserInterface) => {
  let SelectedblendCategory_id = SelectedblendCategory && SelectedblendCategory[0]?._id;
  const convertArrToString = (arr) => {
    arr = arr?.map((itm) => {
      return `
            {
              ingredientId: "${itm.ingredientId}",
              weightInGram: ${itm.weightInGram},
              selectedPortionName: "${itm.selectedPortionName?.replace(/"/g, '\\"')}"
            }
          `;
    });
    arr = `[${arr.toString()}]`;
    return arr;
  };

  const convertImageArrayToString = (arr) => {
    let imageArr = [];
    arr &&
      arr?.map((elem, index) => {
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
      arr?.map((elem, index) => {
        // console.log(elem);
        instructionArr.push(`"${elem.step}"`);
      });

    return `[${instructionArr}]`;
  };

  // console.log({ recipeName });
  // console.log({ ingredients });
  // console.log({ image });
  // console.log({ recipeInstructions });
  // console.log({ SelectedblendCategory_id });

  return gql`
 mutation {
   addRecipeFromUser(data: {
     userId: ${JSON.stringify(userId)}
     name: ${JSON.stringify(recipeName)}
     description: "none"
     recipeIngredients: [""]
     ingredients:${convertArrToString(ingredients)}
     recipeBlendCategory: "${SelectedblendCategory_id}"
     image:${convertImageArrayToString(image)}
     recipeInstructions:${converInstructionToString(recipeInstructions)}
   }){
     _id
     foodCategories
     recipeInstructions
     name
   image{
     image,
     default
   }
     ingredients{
       weightInGram
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
