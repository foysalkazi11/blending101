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
        weight
        age
        height
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
          ingredients {
            _id
            ingredientId
            ingredientName
            category
            blendStatus
            classType
            nutrients {
              sourceId
              value
            }
            portions {
              measurement
              measurement2
              meausermentWeight
              sourceId
            }
            source
            description
            sourceId
            sourceCategory
            featuredImage
            images
          }
          url
          discovery
          favicon
        }
      }
    }
  }
`;

export default CREATE_NEW_USER;
