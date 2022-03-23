import React, { useState } from "react";
import Scale from "../../scale/Scale";
import ScaleHeight from "../../scale/ScaleHeight.";
import SectionWithIcon from "../../sectionWithIcon/SectionWithIcon";

const gender = [
  {
    icon: "/images/mars-1.png",
    label: "male",
  },
  {
    icon: "/images/femenine.png",
    label: "female",
  },
  {
    icon: "/images/mars-2.png",
    label: "others",
  },
];
const activity = [
  {
    icon: "/images/ski-lift-regular.png",
    label: "low",
  },
  {
    icon: "/images/walking-regular-1.png",
    label: "moderate",
  },
  {
    icon: "/images/running-regular.png",
    label: "high",
  },
];

type StepOneProps = {
  userProfile: any;
  updateUserProfile: Function;
};

const StepOne = ({ userProfile, updateUserProfile }: StepOneProps) => {
  return (
    <>
      <SectionWithIcon
        title="Select Your Gender"
        body={gender}
        fieldName="gender"
        updateUserProfile={updateUserProfile}
        userProfile={userProfile}
      />
      {/* <Scale
        title="How old are you?"
        resultWithText="years old"
        fieldName="age"
        setValue={updateUserProfile}
        value={userProfile?.age?.quantity}
        min={"0"}
        max={"100"}
        shortLineDivider={2}
        longLineDivider={10}
      /> */}

      <Scale
        title="What's your current weight?"
        resultWithText="pounds"
        fieldName="weight"
        setValue={updateUserProfile}
        value={userProfile?.weight}
        min={"145"}
        max={"200"}
        longLineDivider={5}
      />
      {/* <ScaleHeight
        title="What's your current height?"
        resultWithText="inches"
        fieldName="height"
        setValue={updateUserProfile}
        value={userProfile?.height}
        min={"108"}
        max={"216"}
        longLineDivider={18}
        shortLineDivider={3}
      /> */}
      <SectionWithIcon
        title="Your Activity"
        body={activity}
        fieldName="activity"
        updateUserProfile={updateUserProfile}
        userProfile={userProfile}
      />
    </>
  );
};

export default StepOne;
