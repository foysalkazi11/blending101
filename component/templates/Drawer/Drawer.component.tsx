import React from "react";
import useHover from "../../../components/utility/useHover";
import { IconDefinition } from "@fortawesome/pro-thin-svg-icons";
import Icon from "component/atoms/Icon/Icon.component";

import styles from "./Drawer.module.scss";
import { faGrid2 } from "@fortawesome/pro-regular-svg-icons";

const panelWidth = "320px";

interface DrawerProps {
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  /** Direction from which the drawer should open */
  direction?: "left" | "right";
  /** To make the drawer button visible always */
  always?: boolean;
  /** Font-Awesome icon or image */
  icon?: string | IconDefinition;
}

const Drawer: React.FC<DrawerProps> = (props) => {
  const { children, open, onOpen, onClose, always, direction, icon } = props;

  return (
    <div className={styles[direction]}>
      <div
        className={styles.tray}
        style={
          direction === "left" ? { left: open ? "0px" : `-${panelWidth}` } : { right: open ? "0px" : `-${panelWidth}` }
        }
      >
        <div className={styles.tray__inner}>
          <div className={styles.image} onClick={onClose}>
            {!open && !always ? null : (
              <div className={`${styles.button} ${styles[`${direction}Radius`]}`} onClick={onOpen}>
                {typeof icon === "string" ? <img src={icon} alt="icon" /> : <Icon fontName={icon} size={20} />}
              </div>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

Drawer.defaultProps = {
  open: false,
  onClose: () => {},
  direction: "left",
  always: true,
  icon: faGrid2,
};

export default Drawer;
