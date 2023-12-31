import { gql } from "@apollo/client";

const PLANNER_RECIPE_LIST_FIELDS = gql`
  fragment PlanRecipeFields on PlannerRecipe {
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
        calorie {
          value
        }
        gigl {
          netCarbs
          rxScore
        }
        ingredients {
          ingredientId {
            _id
            ingredientName
            featuredImage
            portions {
              measurement
              meausermentWeight
            }
          }
          quantityString
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

const PLAN_FIELDS = gql`
  fragment PlanFields on PlansWithTotal {
    plans {
      _id
      planName
      description
      startDateString
      endDateString
      planCollections
      commentsCount
      myRating
      averageRating
      numberOfRating
      totalRating
      image {
        url
        hash
      }
      calorie {
        value
      }
      gigl {
        netCarbs
        rxScore
      }
    }
    totalPlans
  }
`;

const INSIGHTS_FIELDS = gql`
  fragment TopIngredients on TopIngredientData {
    icon: featuredImage
    label: name
    quantity: count
  }
  fragment MacroMakeup on MacroMakeup {
    carbs
    protein
    fats
  }
  fragment CategoryPercentage on CategoryPercentage {
    name
    percentage
  }
`;

const PLAN_COLLECTION_FIELDS = gql`
  fragment PlanCollection on PlanCollection {
    _id
    plans
    collectionDataCount
    image
    name
    slug
  }
`;

export const GET_ALL_PLANNER_RECIPES = gql`
  query GetRecipesForPlanner($searchTerm: String!, $page: Float!, $limit: Float!, $type: String!, $user: String!) {
    getAllRecipesForPlanner(
      page: $page
      limit: $limit
      userId: $user
      searchTerm: $searchTerm
      recipeBlendCategory: $type
    ) {
      ...PlanRecipeFields
    }
  }
  ${PLANNER_RECIPE_LIST_FIELDS}
`;

export const GET_QUEUED_PLANNER_RECIPES = gql`
  query GetQueuedRecipesForPlanner($startDate: String!, $endDate: String!, $user: String!) {
    getQuedPlanner(startDate: $startDate, endDate: $endDate, userId: $user) {
      ...PlanRecipeFields
    }
  }
  ${PLANNER_RECIPE_LIST_FIELDS}
`;

export const GET_PLANNER_BY_WEEK = gql`
  query GetPlannerByWeek($userId: String!, $startDate: String!, $endDate: String!) {
    getPlannerByDates(userId: $userId, startDate: $startDate, endDate: $endDate) {
      planners {
        _id
        recipes: ProfileRecipes {
          recipeId {
            _id
            name
            recipeBlendCategory {
              name
            }
            image {
              image
            }
          }
          defaultVersion {
            calorie {
              value
            }
            gigl {
              netCarbs
              rxScore
            }
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
        formatedDate
      }
      macroMakeup {
        ...MacroMakeup
      }
      topIngredients {
        ...TopIngredients
      }
      recipeCategoriesPercentage {
        ...CategoryPercentage
      }
      calorie
      rxScore
    }
  }
  ${INSIGHTS_FIELDS}
`;

export const ADD_RECIPE_TO_PLANNER = gql`
  mutation AddRecipeToPlanner($userId: ID!, $recipeId: ID!, $assignDate: String!) {
    createPlanner(data: { memberId: $userId, recipe: $recipeId, assignDate: $assignDate }) {
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

export const CREATE_PLAN = gql`
  mutation CreatePlan($data: CreateNewPlan!) {
    createAPlan(input: $data)
  }
`;

export const EDIT_PLAN = gql`
  mutation EditPlan($data: EditPlan!) {
    updateAPlan(input: $data)
  }
`;

export const DELETE_PLAN = gql`
  mutation DeletePlan($memberId: String!, $planId: String!) {
    deletePlan(memberId: $memberId, planId: $planId)
  }
`;

export const GET_ALL_PLANS = gql`
  query GetAllGlobalPlans($page: Float, $limit: Float, $memberId: String, $query: String!) {
    getAllGlobalPlans(page: $page, limit: $limit, memberId: $memberId, searchTerm: $query) {
      plans {
        _id
        planName
        description
        startDateString
        endDateString
        planCollections
        commentsCount
        myRating
        averageRating
        numberOfRating
        totalRating
        image {
          url
          hash
        }
        calorie {
          value
        }
        gigl {
          netCarbs
          rxScore
        }
      }
      totalPlans
    }
  }
`;

export const GET_FEATURED_PLANS = gql`
  query GetFeaturedPlans($memberId: String!, $limit: Float!) {
    getAllRecentPlans(limit: $limit, memberId: $memberId, page: 1) {
      ...PlanFields
    }
    getAllRecommendedPlans(memberId: $memberId, limit: $limit, page: 1) {
      ...PlanFields
    }
    getAllPopularPlans(memberId: $memberId, limit: $limit, page: 1) {
      ...PlanFields
    }
  }
  ${PLAN_FIELDS}
`;

export const GET_RECENT_PLANS = gql`
  query GetRecentPlans($memberId: String!, $limit: Float!, $page: Float!) {
    result: getAllRecentPlans(limit: $limit, memberId: $memberId, page: $page) {
      ...PlanFields
    }
  }
  ${PLAN_FIELDS}
`;
export const GET_RECCOMENDED_PLANS = gql`
  query GetReccomendedPlans($memberId: String!, $limit: Float!, $page: Float!) {
    result: getAllRecommendedPlans(memberId: $memberId, limit: $limit, page: $page) {
      ...PlanFields
    }
  }
  ${PLAN_FIELDS}
`;

export const GET_POPULAR_PLANS = gql`
  query GetPopularPlans($memberId: String!, $limit: Float!, $page: Float!) {
    result: getAllPopularPlans(memberId: $memberId, limit: $limit, page: $page) {
      ...PlanFields
    }
  }
  ${PLAN_FIELDS}
`;

export const GET_PLAN = gql`
  query GetAPlan($planId: String!, $token: String, $memberId: String) {
    getAPlan(planId: $planId, token: $token, memberId: $memberId) {
      plan {
        _id
        planName
        description
        memberId
        planCollections
        commentsCount
        myRating
        image {
          url
        }
        calorie {
          value
        }
        gigl {
          netCarbs
          rxScore
        }
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
              calorie {
                value
              }
              gigl {
                netCarbs
                rxScore
              }
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
      macroMakeup {
        ...MacroMakeup
      }
      topIngredients {
        ...TopIngredients
      }
      recipeCategoriesPercentage {
        ...CategoryPercentage
      }
    }
  }
  ${INSIGHTS_FIELDS}
`;

export const GET_PLAN_DETAILS = gql`
  query GetAPlan($planId: String!, $token: String, $memberId: String) {
    getAPlan(planId: $planId, token: $token, memberId: $memberId) {
      plan {
        _id
        planName
        description
        memberId
        planCollections
        commentsCount
        myRating
        image {
          url
        }
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
              calorie {
                value
              }
              gigl {
                netCarbs
                rxScore
              }
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
    createPlanComment(data: { planId: $planId, memberId: $memberId, comment: $comment }) {
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
      commentsCount
    }
  }
`;

export const EDIT_PLAN_COMMENT = gql`
  mutation EditPlanComment($memberId: ID!, $commentId: String!, $comment: String!) {
    editPlanComment(data: { editId: $commentId, memberId: $memberId, editableObject: { comment: $comment } }) {
      _id
    }
  }
`;

export const REMOVE_PLAN_COMMENT = gql`
  mutation RemovePlanComment($memberId: String!, $commentId: String!) {
    removeAPlanComment(memberId: $memberId, commentId: $commentId)
  }
`;

/*
  <=========
    <========= PLAN RATING =========>
  <=========
*/

export const UPDATE_PLAN_RATING = gql`
  mutation UpdatePlanRating($data: CreateNewPlanRating!) {
    updatePlanRating(data: $data) {
      averageRating
      myRating
      numberOfRating
    }
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

/*
  <=========
    <========= PLAN SHARE =========>
  <=========
*/

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
  mutation AddToLastModifiedPlanCollection($planId: String!, $memberId: String!) {
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
        ...PlanCollection
      }
    }
  }
  ${PLAN_COLLECTION_FIELDS}
`;

export const ADD_NEW_PLAN_COLLECTION = gql`
  mutation AddNewPlanCollection($data: CreateNewPlanCollection!) {
    addNewPlanCollection(data: $data) {
      ...PlanCollection
    }
  }
  ${PLAN_COLLECTION_FIELDS}
`;

export const EDIT_PLAN_COLLECTION = gql`
  mutation EditAPlanCollection($data: EditPlanCollection!) {
    editAPlanCollection(data: $data) {
      ...PlanCollection
    }
  }
  ${PLAN_COLLECTION_FIELDS}
`;

export const DELETE_PLAN_COLLECTION = gql`
  mutation DeletePlanCollection($memberId: String!, $collectionId: String!) {
    deletePlanCollection(memberId: $memberId, collectionId: $collectionId) {
      planCollections {
        ...PlanCollection
      }
    }
  }
  ${PLAN_COLLECTION_FIELDS}
`;

export const ADD_OR_REMOVE_PLAN_COLLECTION = gql`
  mutation addOrRemovePlanCollection($planId: String!, $memberId: String!, $collectionIds: [String!]!) {
    addOrRemovePlanCollection(planId: $planId, memberId: $memberId, collectionIds: $collectionIds) {
      planCollections {
        ...PlanCollection
      }
    }
  }
  ${PLAN_COLLECTION_FIELDS}
`;

export const GET_ALL_PLANS_FOR_A_COLLECTION = gql`
  query GetAllPlansForACollection($slug: String, $memberId: String, $limit: Float, $page: Float) {
    getAllPlansForACollection(slug: $slug, memberId: $memberId, limit: $limit, page: $page) {
      ...PlanFields
    }
  }
  ${PLAN_FIELDS}
`;

export const FILTER_PLAN = gql`
  query FilterPlans($userId: String!, $data: FilterPlan!, $page: Float, $limit: Float) {
    filterPlans(userId: $userId, data: $data, page: $page, limit: $limit) {
      ...PlanFields
    }
  }
  ${PLAN_FIELDS}
`;

/*
  <=========
    <========= ADD PLAN =========>
  <=========
*/

export const GET_PLAN_INSIGHTS = gql`
  query GetPlanInsights($recipes: [String!]!, $userId: String!, $days: Float!) {
    getPlannerInsights(recipeIds: $recipes, userId: $userId, numberOfDays: $days) {
      topIngredients {
        ...TopIngredients
      }
      recipeCategoriesPercentage {
        ...CategoryPercentage
      }
      macroMakeup {
        ...MacroMakeup
      }
      calorie
      rxScore
    }
  }
  ${INSIGHTS_FIELDS}
`;
