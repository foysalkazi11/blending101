import React from "react";
import useHover from "../../../components/utility/useHover";
import { IconDefinition } from "@fortawesome/pro-thin-svg-icons";
import Icon from "component/atoms/Icon/Icon.component";

import styles from "./Panel.module.scss";
import { faGrid2 } from "@fortawesome/pro-regular-svg-icons";

const panelWidth = "320px";

interface PanelProps {
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  /** Direction from which the drawer should open */
  direction?: "left" | "right";
  /** To make the drawer button visible always */
  always?: boolean;
  /** Font-Awesome icon or image */
  icon?: string | IconDefinition;
  width?: string;
}

const Panel: React.FC<PanelProps> = (props) => {
  const { children, open, onOpen, onClose, always, direction, icon, width } = props;

  return (
    <div className={`${styles.tray} ${styles[direction]}`} style={{ width: open ? "100%" : "0", maxWidth: width }}>
      <div className={styles.image} onClick={onClose}>
        {!open && !always ? null : (
          <div className={styles.button} onClick={onOpen}>
            {typeof icon === "string" ? <img src={icon} alt="icon" /> : <Icon fontName={icon} size={20} />}
          </div>
        )}
      </div>
      <div className={styles.overlay} style={{ transform: open ? "scaleX(1)" : "scaleX(0)" }}>
        {children}
      </div>
    </div>
  );
};

Panel.defaultProps = {
  open: false,
  onClose: () => {},
  direction: "left",
  always: true,
  icon: faGrid2,
};

export default Panel;
