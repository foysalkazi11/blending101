import { gql } from "@apollo/client";

export const GET_30DAYS_CHALLENGE = gql`
  query Get30DaysChallenge($userId: String!, $startDate: String) {
    getMyThirtyDaysChallenge(memberId: $userId, startDate: $startDate) {
      challenge {
        _id
        date: formattedDate
        disabled
        posts {
          _id
          recipeBlendCategory {
            _id
            name
          }
          name
          images
          note
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
      challengeInfo {
        longestStreak
        currentStreak
        blendScore
        daysRemaining
        challengeName
        totalChallengePosts
        startDate
        endDate
      }
    }
  }
`;

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
              ingredientName
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
              ingredientName
            }
            selectedPortion {
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

/*
 * -------------------------------------------------*
 * CHALLENGE API
 * SETTINGS API
 * -------------------------------------------------*
 */

export const CREATE_CHALLENGE_POST = gql`
  mutation CreateChallengePost($data: CreateChallengePost!) {
    createChallengePost(data: $data)
  }
`;

export const EDIT_CHALLENGE_POST = gql`
  mutation EditChallengePost($data: EditChallengePost!) {
    editAChallengePost(data: $data)
  }
`;

export const GET_CHALLENGES = gql`
  query GetAllChallenges($memberId: String!) {
    getMyChallengeList(memberId: $memberId) {
      _id
      challengeName
      days
      isActive
      startingDate
      startDate
      endDate
      description
      notification
    }
  }
`;

export const CREATE_CHALLENGE = gql`
  mutation CreateChallenge($data: CreateUserChallenge!) {
    createUserChallenge(data: $data)
  }
`;

export const EDIT_CHALLENGE = gql`
  mutation EditChallenge($data: CreateEditUserChallenge!) {
    editUserChallenge(data: $data)
  }
`;

export const DELETE_CHALLENGE = gql`
  mutation DeleteChallenge($challengeId: String!) {
    deleteUserChallenge(challengeId: $challengeId)
  }
`;

export const ACTIVATE_CHALLENGE = gql`
  mutation ActivateChallenge($memberId: ID!, $challengeId: ID!) {
    editUserChallenge(
      data: { memberId: $memberId, challengeId: $challengeId, isActive: true }
    )
  }
`;

export const CHALLENGE_GALLERY = gql`
  query GetChallengeGallery($memberId: String!) {
    getAChallengeGallery(memberId: $memberId) {
      images
      assignDate
    }
  }
`;

export const ADD_TO_GROCERY_LIST = gql`
  mutation AddToGroceryFromPlanner($recipeId: String!, $memberId: String!) {
    addToGroceryFromPlanner(recipeId: $recipeId, memberId: $memberId)
  }
`;
