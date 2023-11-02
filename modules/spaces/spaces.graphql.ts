import { gql } from "@apollo/client";

export const GET_ALL_SPACES = gql`
  query GetAllSpaces {
    getAllSpaces {
      _id
      name
      members {
        email
      }
      facilitators {
        email
      }
    }
  }
`;

export const GET_MY_SPACES = gql`
  query GetMySpaces($userId: ID) {
    getAllSpaces(userId: $userId) {
      _id
      name
      members {
        email
      }
      facilitators {
        email
      }
    }
  }
`;

export const JOIN_SPACE = gql`
  mutation JoinSpace($userId: ID!, $spaceId: ID!) {
    joinASpace(userId: $userId, spaceId: $spaceId)
  }
`;
