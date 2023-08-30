import React, { Fragment } from "react";
import styles from "./SideDrawer.module.scss";

interface DrawerProps {
  show: boolean;
  button: React.ReactNode;
}

const SideDrawer: React.FC<DrawerProps> = (props) => {
  const { children, show, button } = props;
  return (
    <Fragment>
      {button}
      <div
        className={`${styles.drawer} ${show ? styles["drawer--active"] : ""}`}
      >
        {children}
      </div>
    </Fragment>
  );
};

export default SideDrawer;
