import React, { useState, useEffect } from "react";
import AContainer from "../../../containers/A.container";
import { Container } from "@mui/material";
import ProgessBar from "./progessBar/ProgessBar";
import styles from "./UserProfile.module.scss";
import StepOne from "./steps/stepOne/StepOne";
import StepTwo from "./steps/stepTwo/StepTwo";
import ChangeSteps from "./changeSteps/ChangeSteps";
import StepThree from "./steps/stepThree/StepThree";
import StepFour from "./steps/stepFour/StepFour";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState<any>({
    gender: "female",
    activity: "moderate",
    age: "50",
    weight: "170",
    dietary: "ketogenic",
    allergies: "moderate",
    medicalCondition: [],
    medicationCurrentlyTaking: [],
  });
  const [steps, setSteps] = useState(1);

  const updateUserProfile = (name: string, value: any) => {
    if (name === "medicalCondition" || name === "medicationCurrentlyTaking") {
      if (value) {
        setUserProfile((pre) => ({ ...pre, [name]: [...pre[name], value] }));
      }
    } else {
      setUserProfile((pre) => ({ ...pre, [name]: value }));
    }
  };

  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);

  const nextStep = () => {
    if (steps >= 4) {
      return;
    } else {
      setSteps((pre) => pre + 1);
    }
  };
  const prevStep = () => {
    if (steps <= 1) {
      return;
    } else {
      setSteps((pre) => pre - 1);
    }
  };

  const renderUI = () => {
    switch (steps) {
      case 1:
        return (
          <StepOne
            userProfile={userProfile}
            updateUserProfile={updateUserProfile}
          />
        );
      case 2:
        return (
          <StepTwo
            userProfile={userProfile}
            updateUserProfile={updateUserProfile}
          />
        );
      case 3:
        return (
          <StepThree
            userProfile={userProfile}
            updateUserProfile={updateUserProfile}
          />
        );
      case 4:
        return (
          <StepFour
          // userProfile={userProfile}
          // updateUserProfile={updateUserProfile}
          />
        );

      default:
        return (
          <StepOne
            userProfile={userProfile}
            updateUserProfile={updateUserProfile}
          />
        );
    }
  };
  return (
    <AContainer
      headerTitle="Profile"
      showLeftTray={false}
      showRighTray={false}
      showSidebar={false}
    >
      <div className={styles.userProfileContainer}>
        <ProgessBar steps={steps} />
        <div className={styles.sectionContainer}>
          <Container maxWidth="md">{renderUI()}</Container>
        </div>
        <ChangeSteps nextStep={nextStep} prevStep={prevStep} steps={steps} />
      </div>
    </AContainer>
  );
};

export default UserProfile;
