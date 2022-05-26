import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import ToggleMenu from "../../../../theme/toggleMenu/ToggleMenu";
import Dietary from "./dietary/Dietary";
import Physical from "./physical/Physical";

import Medical from "./medical/Medical";
import AchiveGoals from "./achiveGoals/AchiveGoals";
import { useRouter } from "next/router";

type PersonalizationProps = {
  userData: any;
  setUserData: any;
  toggle?: number;
  setToggle?: Dispatch<SetStateAction<number>>;
  setProfileActiveTab?: any;
  profileActiveTab?: any;
};

const Personalization = ({
  userData,
  setUserData,
  toggle = 0,
  setToggle = () => {},
  setProfileActiveTab,
  profileActiveTab,
}: PersonalizationProps) => {
  const { personalization } = userData;

  const checkGoals = (value, fieldName) => {
    const goal = userData?.personalization?.[fieldName]?.find(
      (item) => item === value
    );
    if (goal) {
      return true;
    } else {
      return false;
    }
  };

  const updateUserProfile = (name: string, value: any) => {
    if (name === "whyBlending" || name === "allergies") {
      if (checkGoals(value, name)) {
        setUserData((pre) => ({
          ...pre,

          personalization: {
            ...pre?.personalization,
            [name]:
              [
                ...pre?.personalization[name]?.filter((item) => item !== value),
              ] || "tempName",
          },
        }));
      } else {
        setUserData((pre) => ({
          ...pre,

          personalization: {
            ...pre?.personalization,
            [name]: [...pre?.personalization[name], value],
          },
        }));
      }
    } else if (
      name === "preExistingMedicalConditions" ||
      name === "meditcation"
    ) {
      if (value) {
        setUserData((pre) => ({
          ...pre,

          personalization: {
            ...pre?.personalization,
            [name]: [...pre?.personalization[name], value],
          },
        }));
      }
    } else {
      setUserData((data) => ({
        ...data,
        personalization: { ...data?.personalization, [name]: value },
      }));
    }
  };

  const removeInput = (name: string, value: any) => {
    if (name === "preExistingMedicalConditions" || name === "meditcation") {
      if (value) {
        setUserData((pre) => ({
          ...pre,

          personalization: {
            ...pre?.personalization,
            [name]: [
              ...pre?.personalization[name]?.filter((item) => item !== value),
            ],
          },
        }));
      }
    }
  };

  const renderUI = () => {
    switch (toggle) {
      case 0:
        return (
          <Physical
            userProfile={personalization}
            updateUserProfile={updateUserProfile}
            setUserData={setUserData}
            userData={userData}
            setProfileActiveTab={setProfileActiveTab}
            profileActiveTab={profileActiveTab}
          />
        );
      case 1:
        return (
          <Medical
            userProfile={personalization}
            updateUserProfile={updateUserProfile}
            removeInput={removeInput}
          />
        );
      case 2:
        return (
          <Dietary
            userProfile={personalization}
            updateUserProfile={updateUserProfile}
            alredyExist={checkGoals}
          />
        );
      case 3:
        return (
          <AchiveGoals
            updateUserProfile={updateUserProfile}
            checkGoals={checkGoals}
          />
        );

      default:
        return (
          <Physical
            userProfile={personalization}
            updateUserProfile={updateUserProfile}
            setUserData={setUserData}
            userData={userData}
            setProfileActiveTab={setProfileActiveTab}
            profileActiveTab={profileActiveTab}
          />
        );
    }
  };

  return (
    <>
      <ToggleMenu
        setToggle={setToggle}
        toggle={toggle}
        toggleMenuList={["Physical", "Medical", "Dietary", "Goals"]}
        maxWidth={{ maxWidth: "460px" }}
      />

      {renderUI()}
    </>
  );
};

export default Personalization;
