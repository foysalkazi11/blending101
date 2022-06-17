import { gql } from "@apollo/client";

export const GET_CART_DATA = gql`
  query GetCartData($userId: String!) {
    getMyGroceryList(memberId: $userId) {
      ingredientId {
        _id
        ingredientName
        featuredImage
      }
      selectedPortion
      quantity
    }
    getPantryList(memberId: $userId) {
      ingredientId {
        _id
        ingredientName
        featuredImage
        portions {
          measurement
        }
      }
      selectedPortion
      quantity
    }
    getStapleList(memberId: $userId) {
      ingredientId {
        _id
        ingredientName
        featuredImage
        portions {
          measurement
        }
      }
      selectedPortion
      quantity
    }
  }
`;

export const SEARCH_INGREDIENTS_FOR_GROCERY = gql`
  query SearchIngredients($query: String!) {
    searchBlendIngredientsForGrocery(searchTerm: $query) {
      _id
      ingredientName
      featuredImage
      portions {
        measurement
      }
    }
  }
`;

export const ADD_GROCERY_ITEM = gql`
  mutation AddGrocery($data: CreateNewGroceries!) {
    addGroceryList(data: $data)
  }
`;

export const ADD_PANTRY_ITEM = gql`
  mutation AddPantry($data: CreateNewPantry!) {
    addPantryList(data: $data)
  }
`;

export const ADD_STAPLE_ITEM = gql`
  mutation AddGrocery($data: CreateNewGroceries!) {
    addGroceryList(data: $data)
  }
`;

export const DELETE_CART_ITEM = gql`
  mutation DeleteCartItem(
    $userId: String!
    $ingredients: [ID!]!
    $listType: String!
  ) {
    deleteSomeFromList(
      memberId: $userId
      ingredients: $ingredients
      listType: $listType
    )
  }
`;
