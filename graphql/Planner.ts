import { gql } from "@apollo/client";

const PLANNER_RECIPE_LIST_FIELDS = gql`
  fragment RecipeFields on PlannerRecipe {
    recipes {
      isMatch
      recipeId {
        _id
        name
        recipeBlendCategory {
          name
          _id
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
      }
      defaultVersion {
        postfixTitle
        ingredients {
          ingredientId {
            _id
            ingredientName
            featuredImage
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
`;

export const GET_ALL_PLANNER_RECIPES = gql`
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
      ...RecipeFields
    }
  }
  ${PLANNER_RECIPE_LIST_FIELDS}
`;

export const GET_QUEUED_PLANNER_RECIPES = gql`
  query GetQueuedRecipesForPlanner($currentDate: String!, $user: String!) {
    getQuedPlanner(currentDate: $currentDate, userId: $user) {
      ...RecipeFields
    }
  }
  ${PLANNER_RECIPE_LIST_FIELDS}
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
        recipes: ProfileRecipes {
          recipeId {
            _id
            name
            recipeBlendCategory {
              name
            }
          }
          defaultVersion {
            ingredients {
              ingredientId {
                _id
              }
              selectedPortion {
                gram
              }
            }
          }
        }
        formatedDate
      }
      topIngredients {
        icon: featuredImage
        label: name
        quantity: count
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
  query GetFeaturedPlans($memberId: String!, $limit: Float!) {
    getAllRecentPlans(limit: $limit, memberId: $memberId) {
      _id
      planName
      description
      startDateString
      endDateString
      planCollections
      commentsCount
    }
    getAllRecommendedPlans(memberId: $memberId, limit: $limit) {
      _id
      planName
      description
      startDateString
      endDateString
      planCollections
      commentsCount
    }
    getAllPopularPlans(memberId: $memberId, limit: $limit) {
      _id
      planName
      description
      startDateString
      endDateString
      planCollections
      commentsCount
    }
  }
`;

export const GET_ALL_PLANS = gql`
  query GetAllGlobalPlans($page: Float, $limit: Float, $memberId: String) {
    getAllGlobalPlans(page: $page, limit: $limit, memberId: $memberId) {
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
        memberId
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
        icon: featuredImage
        label: name
        quantity: count
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

export const ADD_TO_MY_PLAN = gql`
  mutation AddToMyPlan(
    $type: mergerOrRemove!
    $planId: String!
    $memberId: String!
    $startDate: String!
    $endDate: String!
  ) {
    mergeOrReplacePlanner(
      mergeOrReplace: $type
      planId: $planId
      memberId: $memberId
      startDate: $startDate
      endDate: $endDate
    )
  }
`;

// PLAN SHARE
export const SHARE_PLAN = gql`
  mutation SharePlan($userId: String!, $planId: String!) {
    sharePlan(memberId: $userId, planId: $planId)
  }
`;

export const PLAN_SHARE_INFO = gql`
  query GetPlanShareInfo($token: String!) {
    getPlanShareInfo(planShareId: $token) {
      plan {
        _id
        planName
      }
      recipes {
        _id
        name
        image {
          image
          default
        }
      }

      recipeCount
      invitedBy {
        displayName
        email
        firstName
        _id
      }
    }
  }
`;
// PLAN COLLECTION
export const ADD_TO_LAST_MODIFIED_PLAN_COLLECTION = gql`
  mutation AddToLastModifiedPlanCollection(
    $planId: String!
    $memberId: String!
  ) {
    addToLastModifiedPlanCollection(planId: $planId, memberId: $memberId) {
      _id
      name
    }
  }
`;

export const GET_ALL_PLAN_COLLECTION = gql`
  query GetAllPlanCollection($memberId: String!) {
    getAllPlanCollection(memberId: $memberId) {
      planCollections {
        plans
        _id
        collectionDataCount
        image
        name
        slug
      }
    }
  }
`;
export const ADD_NEW_PLAN_COLLECTION = gql`
  mutation AddNewPlanCollection($data: CreateNewPlanCollection!) {
    addNewPlanCollection(data: $data) {
      plans
      _id
      collectionDataCount
      image
      name
      slug
    }
  }
`;
export const EDIT_PLAN_COLLECTION = gql`
  mutation EditAPlanCollection($data: EditPlanCollection!) {
    editAPlanCollection(data: $data) {
      plans
      _id
      collectionDataCount
      image
      name
      slug
    }
  }
`;
export const DELETE_PLAN_COLLECTION = gql`
  mutation DeletePlanCollection($memberId: String!, $collectionId: String!) {
    deletePlanCollection(memberId: $memberId, collectionId: $collectionId) {
      planCollections {
        plans
        _id
        collectionDataCount
        image
        name
        slug
      }
    }
  }
`;

export const ADD_OR_REMOVE_PLAN_COLLECTION = gql`
  mutation addOrRemovePlanCollection(
    $planId: String!
    $memberId: String!
    $collectionIds: [String!]!
  ) {
    addOrRemovePlanCollection(
      planId: $planId
      memberId: $memberId
      collectionIds: $collectionIds
    ) {
      planCollections {
        plans
        _id
        collectionDataCount
        image
        name
        slug
      }
    }
  }
`;

export const GET_ALL_PLANS_FOR_A_COLLECTION = gql`
  query GetAllPlansForACollection(
    $slug: String
    $memberId: String
    $limit: Float
    $page: Float
  ) {
    getAllPlansForACollection(
      slug: $slug
      memberId: $memberId
      limit: $limit
      page: $page
    ) {
      totalPlans
      plans {
        _id
        planName
        description
        startDateString
        endDateString
        planCollections
        commentsCount
      }
    }
  }
`;
