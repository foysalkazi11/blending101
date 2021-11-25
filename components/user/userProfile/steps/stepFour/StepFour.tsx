import React from "react";
import Goals from "../../goals/Goals";

const goals = [
  { id: 1, label: "loose weight" },
  { id: 2, label: "save time" },
  { id: 3, label: "prevent disease" },
  { id: 4, label: "make tastier blends" },
  { id: 5, label: "treat existing condition" },
  { id: 6, label: "get more nutrition" },
  { id: 7, label: "reduce dependence on medications" },
  { id: 8, label: "less food waste" },
  { id: 9, label: "workouts booster" },
  { id: 10, label: "healthier kids" },
  { id: 11, label: "eat more fruits and vegetables" },
];

type StepFourProps = {
  updateUserProfile: (name: string, value: any) => void;
  checkGoals: (id: number) => boolean;
};

const StepFour = ({ updateUserProfile, checkGoals }: StepFourProps) => {
  return (
    <Goals
      list={goals}
      title="Select all the goals you with like to achieve with Blending 101"
      fieldName="goals"
      updateUserProfile={updateUserProfile}
      alredyExistGoals={checkGoals}
    />
  );
};

export default StepFour;
