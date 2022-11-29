import { gql } from "@apollo/client";

export const GET_RECIPES_FOR_PLANNER = gql`
  query GetRecipesForPlanner(
    $searchTerm: String!
    $page: Float!
    $limit: Float!
    $type: String!
    $user: String!
  ) {
    getAllRecipesForPlanner(
      page: $page
      limit: $limit
      userId: $user
      searchTerm: $searchTerm
      recipeBlendCategory: $type
    ) {
      recipes {
        isMatch
        _id
        name
        recipeBlendCategory {
          _id
          name
        }
        averageRating
        totalRating
        brand {
          brandName
        }
        image {
          image
          default
        }
        defaultVersion {
          postfixTitle
          ingredients {
            ingredientId {
              _id
              ingredientName
            }
            selectedPortion {
              name
              quantity
              gram
            }
          }
        }
      }
      totalRecipe
    }
  }
`;

export const GET_QUEUED_RECIPES_FOR_PLANNER = gql`
  query GetQueuedRecipesForPlanner(
    $currentDate: String!
    $searchTerm: String!
    $page: Float!
    $limit: Float!
    $type: String!
    $user: String!
  ) {
    getQuedPlanner(
      currentDate: $currentDate
      page: $page
      limit: $limit
      userId: $user
      searchTerm: $searchTerm
      recipeBlendCategory: $type
    ) {
      recipes {
        isMatch
        _id
        name
        recipeBlendCategory {
          name
        }
        averageRating
        totalRating
        brand {
          brandName
        }
        image {
          image
          default
        }
        defaultVersion {
          postfixTitle
          ingredients {
            ingredientId {
              _id
              ingredientName
            }
            selectedPortion {
              name
              quantity
              gram
            }
          }
        }
      }
      totalRecipe
    }
  }
`;

export const GET_PLANNER_BY_WEEK = gql`
  query GetPlannerByWeek(
    $userId: String!
    $startDate: String!
    $endDate: String!
  ) {
    getPlannerByDates(
      userId: $userId
      startDate: $startDate
      endDate: $endDate
    ) {
      _id
      recipes {
        _id
        name
        recipeBlendCategory {
          name
        }
        ingredients {
          ingredientId {
            _id
          }
          selectedPortion {
            gram
          }
        }
      }
      formatedDate
    }
  }
`;

export const ADD_RECIPE_TO_PLANNER = gql`
  mutation AddRecipeToPlanner(
    $userId: ID!
    $recipeId: ID!
    $assignDate: String!
  ) {
    createPlanner(
      data: { memberId: $userId, recipe: $recipeId, assignDate: $assignDate }
    ) {
      _id
    }
  }
`;

export const GET_INGREDIENTS_BY_RECIPE = gql`
  query getIngredientsByRecipe($recipeId: String!) {
    getIngredientsFromARecipe(recipeId: $recipeId) {
      ingredientId {
        _id
        ingredientName
      }
      selectedPortion {
        name
        quantity
        gram
      }
    }
  }
`;

export const MOVE_PLANNER = gql`
  mutation MovePlanner($data: MovePlanner!) {
    movePlanner(data: $data) {
      _id
    }
  }
`;

export const DELETE_RECIPE_FROM_PLANNER = gql`
  mutation DeleteRecipeFromPlanner($plannerId: String!, $recipeId: String!) {
    deletePlanner(plannerId: $plannerId, recipeId: $recipeId)
  }
`;

export const CLEAR_PLANNER = gql`
  mutation ClearPlanner(
    $userId: String!
    $startDate: String!
    $endDate: String!
  ) {
    clearPlannerByDates(
      userId: $userId
      startDate: $startDate
      endDate: $endDate
    )
  }
`;

export const ADD_TO_GROCERY_LIST = gql`
  mutation AddToGroceryFromPlanner($recipeId: String!, $memberId: String!) {
    addToGroceryFromPlanner(recipeId: $recipeId, memberId: $memberId)
  }
`;
