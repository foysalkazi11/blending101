import { gql } from "@apollo/client";

const REJECT_CHALLENGE_SHARE = gql`
  mutation RejectChallengeInvite($memberId: String!, $inviteId: String!) {
    rejectChallengeInvite(memberId: $memberId, inviteId: $inviteId) {
      shareNotifications {
        _id
        image
        type
        shareData {
          _id
          entityId {
            _id
            name
          }
        }
        sharedBy {
          _id
          displayName
          email
          firstName
          lastName
          image
        }
      }
      totalNotification
    }
  }
`;

export default REJECT_CHALLENGE_SHARE;
