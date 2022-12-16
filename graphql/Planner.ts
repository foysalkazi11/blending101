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
      planners {
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
      topIngredients {
        featuredImage
        name
        count
      }
      recipeCategoriesPercentage {
        _id
        name
        count
        percentage
      }
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

export const ADD_TO_GROCERY_LIST = gql`
  mutation AddToGroceryFromPlanner($recipeId: String!, $memberId: String!) {
    addToGroceryFromPlanner(recipeId: $recipeId, memberId: $memberId)
  }
`;

export const CREATE_PLAN = gql`
  mutation CreatePlan($data: CreateNewPlan!) {
    createAPlan(input: $data)
  }
`;

export const GET_FEATURED_PLANS = gql`
  query GetFeaturedPlans {
    getAllRecentPlans(limit: 8) {
      _id
      planName
      description
      startDateString
      endDateString
    }
    getAllRecommendedPlans(limit: 8) {
      _id
      planName
      description
      startDateString
      endDateString
    }
    getAllPopularPlans(limit: 8) {
      _id
      planName
      description
      startDateString
      endDateString
    }
  }
`;
export const GET_ALL_PLANS = gql`
  query GetAllPlan($limit: Float!, $page: Float!) {
    getAllGlobalPlans(limit: $limit, page: $page) {
      plans {
        _id
        planName
        description
      }
      totalPlans
    }
  }
`;

export const GET_PLAN = gql`
  query GetPlan($planId: String!) {
    getAPlan(planId: $planId) {
      plan {
        _id
        planName
        description
        planData {
          id: _id
          day
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
        }
      }
      topIngredients {
        name
        count
        featuredImage
      }
      recipeCategoriesPercentage {
        name
        percentage
      }
    }
  }
`;

// PLANNER COMMENTS
export const GET_ALL_PLAN_COMMENTS = gql`
  query GetPlanComments($id: String!) {
    getAllCommentsForAPlan(planId: $id) {
      _id
      comment
      memberId {
        _id
        image
        displayName
        firstName
        lastName
      }
      createdAt
    }
  }
`;

export const ADD_PLAN_COMMENT = gql`
  mutation AddPlanComment($planId: ID!, $memberId: ID!, $comment: String!) {
    createPlanComment(
      data: { planId: $planId, memberId: $memberId, comment: $comment }
    ) {
      _id
    }
  }
`;

export const EDIT_PLAN_COMMENT = gql`
  mutation EditPlanComment(
    $memberId: ID!
    $commentId: String!
    $comment: String!
  ) {
    editPlanComment(
      data: {
        editId: $commentId
        memberId: $memberId
        editableObject: { comment: $comment }
      }
    ) {
      _id
    }
  }
`;

export const REMOVE_PLAN_COMMENT = gql`
  mutation RemovePlanComment($memberId: String!, $commentId: String!) {
    removeAPlanComment(memberId: $memberId, commentId: $commentId)
  }
`;
