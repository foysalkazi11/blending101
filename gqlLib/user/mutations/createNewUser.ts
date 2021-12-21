import { gql } from "@apollo/client";

const CREATE_NEW_USER = gql`
  mutation Mutation($data: NewUserInput!) {
    createNewUser(data: $data) {
      _id
      bio
      provider
      socialAccounts {
        name
        link
      }
      displayName
      firstName
      orderHistoty
      lastName
      gender
      email
      mobileNumber
      address {
        streetAddress
        apartmentNo
        city
        state
      }
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
    }
  }
`;

export default CREATE_NEW_USER;
