import { gql } from "@apollo/client";

const CREATE_NEW_USER = gql`
  mutation Mutation($data: NewUserInput!) {
    createNewUser(data: $data) {
      _id
      bio
      yourBlender
      provider
      displayName
      firstName
      orderHistoty
      lastName
      email
      location
      myCart
      recentViewedProducts
      image
      createdAt
      configuration {
        _id
        gender
        age {
          quantity
          years
          months
        }
        weightInKilograms
        heightInCentimeters
        pregnantOrLactating
        activity
        dieteryLifeStyle
        allergies
        preExistingMedicalConditions
        meditcation
        whyBlending
      }
      collections {
        _id
        name
        image
        recipes {
          image {
            default
            image
          }
          name
          _id
          description
          prepTime
          cookTime
          totalTime
          recipeYield
          recipeIngredients
          recipeInstructions
          recipeCuisines

          url
          discovery
          favicon
          averageRating
          numberOfRating
          ingredients {
            ingredientId {
              _id
              ingredientName
            }
          }
        }
      }
    }
  }
`;

export default CREATE_NEW_USER;
