import React from "react";
import UserProfile from "../../components/user/userProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/pro-regular-svg-icons";

const UserOnboarding = () => {
  return <UserProfile />;
};

UserOnboarding.meta = {
  title: "My Profile",
  icon: <FontAwesomeIcon icon={faUser} color="#7dbd3b" fontSize={20} />,
  sideBar: false,
};

export default UserOnboarding;
