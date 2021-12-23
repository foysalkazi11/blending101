import React from "react";
import SectionWithIcon from "../../sectionWithIcon/SectionWithIcon";

const dietary = [
  {
    icon: "/images/healthy-food.png",
    label: "low fodmap",
  },
  {
    icon: "/images/avocado-1.png",
    label: "ketogenic",
  },
  {
    icon: "/images/milk.png",
    label: "vegetarian dairy",
  },
  {
    icon: "/images/vegetarian.png",
    label: "vegetarian no dairy",
  },
  // {
  //   icon: "/images/milk.png",
  //   label: "vegetarian dairy",
  // },
  // {
  //   icon: "/images/milk.png",
  //   label: "vegetarian dairy",
  // },
];
const allergies = [
  {
    icon: "/images/milk-bottle.png",
    label: "low",
  },
  {
    icon: "/images/peanut.png",
    label: "moderate",
  },
  {
    icon: "/images/almond.png",
    label: "high",
  },
];

type StepTwoProps = {
  userProfile: any;
  updateUserProfile: Function;
};
const StepTwo = ({ userProfile, updateUserProfile }: StepTwoProps) => {
  return (
    <>
      <SectionWithIcon
        title="Which dietary lifestyle applies to you?"
        body={dietary}
        fieldName="dieteryLifeStyle"
        updateUserProfile={updateUserProfile}
        userProfile={userProfile}
      />
      <SectionWithIcon
        title="Which allergies do you have?"
        body={allergies}
        fieldName="allergies"
        updateUserProfile={updateUserProfile}
        userProfile={userProfile}
      />
    </>
  );
};

export default StepTwo;
