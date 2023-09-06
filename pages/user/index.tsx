import React from "react";
import User from "../../components/user/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/pro-regular-svg-icons";

const MyProfile = () => {
  return <User />;
};

MyProfile.meta = {
  title: "My Profile",
  icon: <FontAwesomeIcon icon={faUser} color="#7dbd3b" fontSize={20} />,
};

export default MyProfile;
