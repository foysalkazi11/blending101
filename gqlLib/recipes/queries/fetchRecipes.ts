import { gql } from "@apollo/client";

export const FETCH_RECOMMENDED_RECIPES = `
query {
    getAllrecomendedRecipes{
     datePublished
     name,
       recipeIngredients
      recipeBlendCategory{
        name
      }
     testIngredient{
       quantity,
       unit,
       name
     }
     image{
       image,
       default
     },
     description,
     prepTime,
     cookTime,
     totalTime,
     _id,
     url,
     favicon,

   }
}`;

export const FETCH_POPULAR_RECIPES = `
query {
    getAllpopularRecipes{
     datePublished
     name,
       recipeIngredients
     recipeBlendCategory{
      name
    }
     testIngredient{
       quantity,
       unit,
       name
     }
     image{
       image,
       default
     },
     description,
     prepTime,
     cookTime,
     totalTime,
     _id,
     url,
     favicon,

   }
}
`;

export const FETCH_LATEST_RECIPES = `
query {
    getAllLatestRecipes{
     datePublished
     name,
    recipeIngredients
     recipeBlendCategory{
      name
    }
     testIngredient{
       quantity,
       unit,
       name
     }
     image{
       image,
       default
     },
     description,
     prepTime,
     cookTime,
     totalTime,
     _id,
     url,
     favicon,

   }
}
`;

export const FETCH_RECIPES_BY_BLEND = (TYPE: any) => (
    `
    query {
        getAllRecipesByBlendCategory(blendTypes: ${JSON.stringify(TYPE)}){
          name,
          image{
            image,
            default
          },
          description,
          prepTime,
          recipeInstructions,
          recipeIngredients,
          testIngredient{
            quantity,
            unit,
            name
          }
          url,
          favicon

        }
    }`
)