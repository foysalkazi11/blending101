import React from "react";
import styles from "./image.module.scss";



const imageDiv = ({imagePath}) => {
  return (
    <div
      className={styles.imgMainDiv}
      style={{ backgroundImage: `url("/images/login-bg.png")` }}
    ></div>
  );
};

export default imageDiv;
