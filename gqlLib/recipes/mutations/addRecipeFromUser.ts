import { gql } from "@apollo/client";

interface createNewRecipeFromUserInterface {
  userId: string;
  UserName: string;
  description?: string;
  ingredients?: any;
  image?: any;
}

export const CREATE_NEW_RECIPE_FROM_USER = ({
  userId,
  UserName,
  ingredients,
  image,
}: createNewRecipeFromUserInterface) => {
  console.log({ imageGQL: image });
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
    let imageArr=[];
    arr && arr.map((elem, index) => {
      if(index===0){
        imageArr.push(`
        {
          image : "${elem}",
          default : true
        }
        `)
      }
      else {
        imageArr.push(`
        {
          image : "${elem}",
          default : false
        }
        `)
      }
    });
  return(`[${imageArr}]`)
  };
  return gql`
  mutation {
    addRecipeRecipeFromUser(data: {
      userId: ${JSON.stringify(userId)}
      name: ${JSON.stringify(UserName)},
      description: "none",
      recipeIngredients: [""]
      ingredients:${convertArrToString(ingredients)}
      image:${convertImageArrayToString(image)}
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
