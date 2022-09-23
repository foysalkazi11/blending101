import { gql } from "@apollo/client";

const GET_RECIPE_WIDGET = gql`
  query GetRecipeWidget {
    getWidgetsForClient(widgetId: "62597e685e28381b901eff23") {
      _id
      widgetName
      widgetType
      widgetCollections {
        _id
        themeLink
        displayName
        icon
        banner
        showTabMenu
        filter {
          filterType
          values
        }
        data {
          collectionType
          Recipe {
            name
            recipeIngredients
            recipeBlendCategory {
              name
            }

            image {
              image
              default
            }
            description
            prepTime
            cookTime
            totalTime
            _id
            url
            favicon
            averageRating
            numberOfRating
            foodCategories
            notes
            addedToCompare
          }
        }
      }
    }
  }
`;

export default GET_RECIPE_WIDGET;
