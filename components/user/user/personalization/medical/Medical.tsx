import React from "react";
import SectionWithInput from "../../../userProfile/sectionWithInput/SectionWithInput";
import medications from "data/medications";
import healthConditions from "data/healthConditions";

type StepThreeProps = {
  userProfile: any;
  updateUserProfile: (name: string, value: any) => void;
  removeInput: (name: string, value: any) => void;
};

const Medical = ({ userProfile, updateUserProfile, removeInput }: StepThreeProps) => {
  return (
    <>
      <p
        style={{
          color: "#c4c4c4",
          fontSize: "12px",
          alignItems: "center",
          textAlign: "center",
          lineHeight: "1.125rem",
          fontWeight: 400,
          padding: "30px 0",
        }}
      >
        This information is used to customize daily recommended nutrition targets
      </p>
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
    </>
  );
};

export default Medical;
