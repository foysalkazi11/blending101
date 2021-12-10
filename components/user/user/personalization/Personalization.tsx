import React, { useState } from "react";
import ButtonComponent from "../../../../theme/button/button.component";
import ToggleMenu from "../../../../theme/toggleMenu/ToggleMenu";
import uniqueId from "../../../utility/uniqueId";
import Dietary from "./dietary/Dietary";
import Physical from "./physical/Physical";

type PersonalizationProps = {
  userData: any;
  setUserData: any;
};

const Personalization = ({ userData, setUserData }: PersonalizationProps) => {
  const [toggle, setToggle] = useState(0);
  const [userProfile, setUserProfile] = useState<any>({
    gender: "female",
    activity: "moderate",
    age: "50",
    weight: "170",
    dietary: "ketogenic",
    allergies: "moderate",
  });

  const updateUserProfile = (name: string, value: any) => {
    setUserProfile((pre) => ({ ...pre, [name]: value }));
  };

  const renderUI = () => {
    switch (toggle) {
      case 0:
        return (
          <Physical
            userProfile={userProfile}
            updateUserProfile={updateUserProfile}
          />
        );
      case 1:
        return (
          <Dietary
            userProfile={userProfile}
            updateUserProfile={updateUserProfile}
          />
        );

      default:
        return (
          <Physical
            userProfile={userProfile}
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
        toggleMenuList={["Physical", "Dietary"]}
        maxWidth={{ maxWidth: "215px" }}
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
        />
      </div>
    </>
  );
};

export default Personalization;
