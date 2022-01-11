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
          _id
          name
          image {
            default
            image
          }
        }
      }
    }
  }
`;

export default CREATE_NEW_USER;
