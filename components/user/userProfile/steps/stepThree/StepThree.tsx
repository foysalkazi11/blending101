import React from "react";
import SectionWithInput from "../../sectionWithInput/SectionWithInput";

type StepThreeProps = {
  userProfile: any;
  updateUserProfile: Function;
};

const StepThree = ({ userProfile, updateUserProfile }: StepThreeProps) => {
  return (
    <>
      <SectionWithInput
        title="What are your pre-existing medical conditions?"
        fieldName="medicalCondition"
        maxWidth={"600px"}
        value={userProfile?.medicalCondition}
        setValue={updateUserProfile}
        placeholder="Enter Conditions..."
      />
      <SectionWithInput
        title="What medications are you currently taking?"
        fieldName="medicationCurrentlyTaking"
        maxWidth={"600px"}
        value={userProfile?.medicationCurrentlyTaking}
        setValue={updateUserProfile}
        placeholder="Enter Medications..."
      />
    </>
  );
};

export default StepThree;
