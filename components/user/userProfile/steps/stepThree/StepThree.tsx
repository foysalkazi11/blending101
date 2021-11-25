import React from "react";
import SectionWithInput from "../../sectionWithInput/SectionWithInput";

type StepThreeProps = {
  userProfile: any;
  updateUserProfile: (name: string, value: any) => void;
  removeInput: (name: string, value: any) => void;
};

const StepThree = ({
  userProfile,
  updateUserProfile,
  removeInput,
}: StepThreeProps) => {
  return (
    <>
      <SectionWithInput
        title="What are your pre-existing medical conditions?"
        fieldName="medicalCondition"
        maxWidth={"600px"}
        value={userProfile?.medicalCondition}
        setValue={updateUserProfile}
        placeholder="Enter Conditions..."
        removeInput={removeInput}
      />
      <SectionWithInput
        title="What medications are you currently taking?"
        fieldName="medicationCurrentlyTaking"
        maxWidth={"600px"}
        value={userProfile?.medicationCurrentlyTaking}
        setValue={updateUserProfile}
        placeholder="Enter Medications..."
        removeInput={removeInput}
      />
    </>
  );
};

export default StepThree;
