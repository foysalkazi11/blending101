import React from "react";
import CustomButton from "../buttons/customButton.component";
import styles from "./friendInvitePoster.module.scss";

interface FriendInvitePosterInterface {
  tagline?: string;
  containerImage?: string;
  buttonFunc?: () => void;
}
const FriendInvitePoster = ({
  tagline,
  containerImage,
  buttonFunc,
}: FriendInvitePosterInterface) => {
  containerImage = containerImage || "/images/5.jpeg";
  const style = { backgroundImage: `url("${containerImage}")` };
  return (
    <div className={styles.mainContainer} style={style}>
      <div className={styles.mainContainer__tagLine}>{tagline}</div>
      <div className={styles.mainContainer__buttonDiv}>
        <CustomButton
          buttonText="Learn More"
          onClickFunc={buttonFunc}
        />
      </div>
    </div>
  );
};

export default FriendInvitePoster;
