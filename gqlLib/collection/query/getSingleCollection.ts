import { gql } from "@apollo/client";

const GET_SINGLE_COLLECTION = gql`
  query GetASingleCollection(
    $userId: String!
    $slug: String!
    $collectionId: String
    $token: String
    $singleRecipeCollectionId: String
    $page: Float
    $limit: Float
  ) {
    getASingleCollection(
      userId: $userId
      slug: $slug
      collectionId: $collectionId
      token: $token
      singleRecipeCollectionId: $singleRecipeCollectionId
      page: $page
      limit: $limit
    ) {
      _id
      creatorInfo {
        _id
        displayName
        email
        firstName
        image
        lastName
      }
      description
      image
      name
      slug
      recipes {
        addedToCompare
        allRecipes
        isMatch
        myRecipes
        notes
        userCollections
        versionCount
        defaultVersion {
          _id
          description
          postfixTitle
          recipeId
          recipeInstructions
          servingSize
          ingredients {
            ingredientId {
              ingredientName
              _id
              images
              featuredImage
            }

            portions {
              name
              gram
              default
              quantity
            }
            weightInGram
            selectedPortion {
              name
              quantity
              gram
            }
          }
        }
        recipeId {
          _id
          name
          image {
            image
            default
          }
          userId {
            _id
            displayName
            image
          }
          brand {
            _id
            brandName
            brandImage
          }
          averageRating
          numberOfRating
          servings
          servingSize
          totalRating
          description
          recipeBlendCategory {
            _id
            name
          }
          originalVersion {
            _id
            description
            postfixTitle
            servingSize
            recipeInstructions
            recipeId
          }
        }
      }
    }
  }
`;

export default GET_SINGLE_COLLECTION;
