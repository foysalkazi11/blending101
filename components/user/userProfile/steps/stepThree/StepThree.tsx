import React from "react";
import SectionWithInput from "../../sectionWithInput/SectionWithInput";
import healthConditions from "data/healthConditions";
import medications from "data/medications";

type StepThreeProps = {
  userProfile: any;
  updateUserProfile: (name: string, value: any) => void;
  removeInput: (name: string, value: any) => void;
};

const StepThree = ({ userProfile, updateUserProfile, removeInput }: StepThreeProps) => {
  return (
    <>
      <SectionWithInput
        title="What are your pre-existing medical conditions?"
        fieldName="preExistingMedicalConditions"
        maxWidth={"600px"}
        value={userProfile?.preExistingMedicalConditions}
        setValue={updateUserProfile}
        placeholder="Medical Conditions..."
        removeInput={removeInput}
        headingStyle={{ fontSize: "22px" }}
        withSuggestions={true}
        suggestions={healthConditions}
        border="borderSecondary"
      />
      <SectionWithInput
        title="What medications are you currently taking?"
        fieldName="meditcation"
        maxWidth={"600px"}
        value={userProfile?.meditcation}
        setValue={updateUserProfile}
        placeholder="Medications..."
        removeInput={removeInput}
        headingStyle={{ fontSize: "22px" }}
        withSuggestions={true}
        suggestions={medications}
        border="borderSecondary"
      />

      {/* <SectionWithInput
        title="What are your pre-existing medical conditions?"
        fieldName="preExistingMedicalConditions"
        maxWidth={"600px"}
        value={userProfile?.preExistingMedicalConditions}
        setValue={updateUserProfile}
        placeholder="Enter Conditions..."
        removeInput={removeInput}
        style={{ marginBottom: "20px" }}
      />
      <SectionWithInput
        title="What medications are you currently taking?"
        fieldName="meditcation"
        maxWidth={"600px"}
        value={userProfile?.meditcation}
        setValue={updateUserProfile}
        placeholder="Enter Medications..."
        removeInput={removeInput}
        style={{ marginBottom: "20px" }}
      /> */}
    </>
  );
};

export default StepThree;
