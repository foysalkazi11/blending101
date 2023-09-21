import React, { Fragment } from "react";
import styles from "./SideDrawer.module.scss";
import { faArrowLeft } from "@fortawesome/pro-regular-svg-icons";
import IconButton from "component/atoms/Button/IconButton.component";

interface DrawerProps {
  show: boolean;
  title?: string;
  button: React.ReactNode;
  onClose?: () => void;
}

const SideDrawer: React.FC<DrawerProps> = (props) => {
  const { title, children, show, button, onClose } = props;
  return (
    <Fragment>
      {button}
      <div className={`${styles.drawer} ${show ? styles["drawer--active"] : ""}`}>
        {title && (
          <div className={styles.drawer__header}>
            <IconButton fontName={faArrowLeft} onClick={onClose} />
            <h3>{title}</h3>
            <div></div>
          </div>
        )}
        {children}
      </div>
    </Fragment>
  );
};

export default SideDrawer;
