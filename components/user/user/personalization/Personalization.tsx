import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import EDIT_CONFIGRATION_BY_ID from "../../../../gqlLib/user/mutations/editCofigrationById";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setDbUser } from "../../../../redux/slices/userSlice";
import ButtonComponent from "../../../../theme/button/button.component";
import ToggleMenu from "../../../../theme/toggleMenu/ToggleMenu";
import Dietary from "./dietary/Dietary";
import Physical from "./physical/Physical";
import notification from "../../../utility/reactToastifyNotification";
import { setLoading } from "../../../../redux/slices/utilitySlice";
import Medical from "./medical/Medical";
import AchiveGoals from "./achiveGoals/AchiveGoals";

type PersonalizationProps = {
  userData: any;
  setUserData: any;
};

const Personalization = ({ userData, setUserData }: PersonalizationProps) => {
  const { personalization } = userData;
  const [toggle, setToggle] = useState(0);
  const { dbUser } = useAppSelector((state) => state?.user);
  const dispatch = useAppDispatch();
  const [editUserData] = useMutation(EDIT_CONFIGRATION_BY_ID);
  const { configuration } = dbUser;

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
            [name]: [
              ...pre?.personalization[name]?.filter((item) => item !== value),
            ],
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

  const submitData = async () => {
    dispatch(setLoading(true));
    const arrangData = {
      ...userData?.personalization,
      age: Number(userData?.personalization?.age),
      weight: Number(userData?.personalization?.weight),
      height: Number(userData?.personalization?.height),
    };
    try {
      await editUserData({
        variables: {
          data: {
            editId: configuration?._id,
            editableObject: arrangData,
          },
        },
      });

      dispatch(
        setDbUser({
          ...dbUser,
          configuration: { ...dbUser?.configuration, ...arrangData },
        })
      );
      dispatch(setLoading(false));
      notification("info", "Updated successfully");
    } catch (error) {
      dispatch(setLoading(false));
      notification("error", error?.message);
    }
  };

  const renderUI = () => {
    switch (toggle) {
      case 0:
        return (
          <Physical
            userProfile={personalization}
            updateUserProfile={updateUserProfile}
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

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <ButtonComponent
          type="primary"
          value="Update Profile"
          style={{
            borderRadius: "30px",
            height: "48px",
            width: "180px",
          }}
          onClick={submitData}
        />
      </div>
    </>
  );
};

export default Personalization;
