// SCHEMA: UserChallenge
export interface Challenge {
  _id: string;
  canInviteWithOthers: boolean;
  challengeName: string;
  days: number;
  description: string;
  endDate: string;
  hasCreatedByMe: boolean;
  isActive: boolean;
  memberId: string;
  notification: boolean;
  startDate: string;
  startingDate: string;
}

// API TYPES

export interface GetAllChallenges {
  getMyChallengeList: Challenge[];
}
