import { gql } from "@apollo/client";

export const GET_SLIDER_WIDGET = gql`
  query GetRecipeWidget($widgetId: String!) {
    getWidgetsForClient(widgetId: $widgetId) {
      _id
      widgetName
      widgetType
      widgetCollections {
        _id
        themeLink
        displayName
        icon
        banner
        slug
        showTabMenu
        filter {
          filterType
          values {
            label
            value
          }
        }
        data {
          collectionType
          Recipe {
            name
            recipeIngredients
            recipeBlendCategory {
              _id
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

export const GET_GRID_WIDGET = gql`
  query GetRecipeWidget($id: String!) {
    getWidgetsForClient(widgetId: $id) {
      _id
      widgetCollections {
        slug
        displayName
        icon
      }
    }
  }
`;

export const GET_GRID_WIDGET_DATA = gql`
  query GetGridWidgetData($collection: String!, $widget: String!) {
    getWidgetCollectionbyDisplayName(slug: $collection, widgetid: $widget) {
      displayName
      icon
      themeLink
      bannerLink
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
`;
