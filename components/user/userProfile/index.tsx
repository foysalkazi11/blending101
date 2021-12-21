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
import uniqueId from "../../utility/uniqueId";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { useMutation } from "@apollo/client";
import EDIT_CONFIGRATION_BY_ID from "../../../gqlLib/user/mutations/editCofigrationById";
import { setDbUser } from "../../../redux/slices/userSlice";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState<any>({
    gender: "",
    activity: "",
    age: "",
    weight: "",
    height: "",
    dieteryLifeStyle: "",
    allergies: "",
    preExistingMedicalConditions: [],
    meditcation: [],
    whyBlending: [],
  });
  const [steps, setSteps] = useState(1);
  const { dbUser, user } = useAppSelector((state) => state?.user);
  const { configuration } = dbUser;
  const [editUserData] = useMutation(EDIT_CONFIGRATION_BY_ID);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (configuration) {
      const {
        activity,
        age,
        allergies,
        dieteryLifeStyle,
        gender,
        height,
        meditcation,
        preExistingMedicalConditions,
        weight,
        whyBlending,
      } = configuration;

      setUserProfile((pre) => ({
        ...pre,
        gender,
        activity,
        age,
        weight,
        dieteryLifeStyle,
        allergies,
        preExistingMedicalConditions,
        meditcation,
        whyBlending,
        height,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkGoals = (id) => {
    const goal = userProfile?.whyBlending?.find((item) => item?.id === id);
    if (goal) {
      return true;
    } else {
      return false;
    }
  };

  const updateUserProfile = (name: string, value: any) => {
    if (name === "preExistingMedicalConditions" || name === "meditcation") {
      if (value) {
        setUserProfile((pre) => ({
          ...pre,
          [name]: [...pre[name], { id: uniqueId(), label: value }],
        }));
      }
    } else if (name === "whyBlending") {
      if (checkGoals(value?.id)) {
        setUserProfile((pre) => ({
          ...pre,
          [name]: [...pre[name].filter((item) => item?.id !== value?.id)],
        }));
      } else {
        setUserProfile((pre) => ({
          ...pre,
          [name]: [...pre[name], value],
        }));
      }
    } else {
      setUserProfile((pre) => ({ ...pre, [name]: value }));
    }
  };

  const removeInput = (name: string, value: any) => {
    if (name === "preExistingMedicalConditions" || name === "meditcation") {
      if (value) {
        setUserProfile((pre) => ({
          ...pre,
          [name]: [...pre[name].filter((item) => item?.id !== value?.id)],
        }));
      }
    }
  };

  const updateUserData = async () => {
    try {
      const { data } = await editUserData({
        variables: {
          data: { editId: configuration?._id, editableObject: userProfile },
        },
      });
      console.log(data);
      dispatch(setDbUser({ ...dbUser, configuration: userProfile }));
    } catch (error) {
      console.log(error?.message);
    }
  };

  const nextStep = async () => {
    if (steps >= 4) {
      return;
    } else {
      setSteps((pre) => pre + 1);
      if (user) {
        updateUserData();
      }
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
            removeInput={removeInput}
          />
        );
      case 4:
        return (
          <StepFour
            updateUserProfile={updateUserProfile}
            checkGoals={checkGoals}
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
      headerFullWidth={true}
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
