import React from "react";
import styles from "./iconHeading.module.scss";

interface IconHeadingInterface {
  icon: any;
  iconStyle?: object;
  title: string;
  titleStyle?: object;
}
const IconHeading = ({
  icon,
  iconStyle,
  title,
  titleStyle,
}: IconHeadingInterface) => {
  iconStyle = iconStyle || {};
  titleStyle = titleStyle || {};
  return (
    <div className={styles.mainContainer}>
      <div
        className={styles.mainContainer__iconDiv}
        style={iconStyle}
      >
        {icon}
      </div>
      <div className={styles.mainContainer__title} style={titleStyle}>
        {title}
      </div>
    </div>
  );
};

export default IconHeading;
