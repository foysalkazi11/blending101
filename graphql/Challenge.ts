import { gql } from "@apollo/client";
/*
 * -------------------------------------------------*
 * CHALLENGE API
 * SETTINGS API
 * -------------------------------------------------*
 */

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

export const GET_30DAYS_CHALLENGE = gql`
  query Get30DaysChallenge(
    $userId: String!
    $startDate: String
    $challengeId: String
    $token: String
  ) {
    getMyThirtyDaysChallenge(
      memberId: $userId
      startDate: $startDate
      challengeId: $challengeId
      token: $token
    ) {
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
        challengeId
        longestStreak
        currentStreak
        blendScore
        daysRemaining
        challengeName
        totalChallengePosts
        startDate
        endDate
        viewOnly
        memberInfo {
          image
        }
        sharedWith {
          memberId {
            displayName
          }
          blendScore
        }
        topIngredients {
          ingredientId {
            ingredientName
            featuredImage
          }
          count
        }
      }
    }
  }
`;

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

export const DELETE_CHALLENGE_POST = gql`
  mutation DeleteChallengePost($postId: String!, $challengeId: String!) {
    deleteAChallengePost(postId: $postId, docId: $challengeId)
  }
`;

export const COPY_CHALLENGE_POST = gql`
  mutation DuplicateChallenge(
    $memberId: String!
    $date: String!
    $postId: String!
    $challengeId: String!
  ) {
    copyAChallengePost(
      memberId: $memberId
      assignDate: $date
      postId: $postId
      docId: $challengeId
    )
  }
`;

export const MOVE_CHALLENGE_POST = gql`
  mutation DuplicateChallenge(
    $memberId: String!
    $date: String!
    $postId: String!
    $challengeId: String!
  ) {
    moveAChallengePost(
      memberId: $memberId
      assignDate: $date
      postId: $postId
      docId: $challengeId
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

export const SHARE_CHALLENGE = gql`
  mutation ShareChallenge($userId: String!, $challengeId: String!) {
    shareGlobalChallenge(memberId: $userId, challengeId: $challengeId)
  }
`;

export const GET_SHARED_CHALLENGE_DETAILS = gql`
  query GetSharedChallengeInfo($challengeId: String!) {
    getChallengeInfoById(challengeId: $challengeId, token: "") {
      challengeName
      memberInfo {
        displayName
      }
    }
  }
`;

export const INVITE_CHALLENGE = gql`
  mutation InviteChallenge(
    $shareWithOther: Boolean!
    $emails: [String!]!
    $user: String!
    $challengeId: String!
  ) {
    inviteToChallenge(
      canInviteWithOthers: $shareWithOther
      invitedWith: $emails
      invitedBy: $user
      challengeId: $challengeId
    )
  }
`;

export const ACCEPT_CHALLENGE = gql`
  mutation AcceptChallenge($user: String!, $token: String!) {
    acceptChallenge(memberId: $user, inviteId: $token)
  }
`;

export const GET_INVITE_CHALLENGE_DETAILS = gql`
  query GetInviteChallenge($id: String!) {
    getInviteChallengeInfo(inviteId: $id) {
      invitedBy {
        displayName
      }
      challengeId {
        challengeName
        challengeId
      }
    }
  }
`;
