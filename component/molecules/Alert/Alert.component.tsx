import React from "react";

import CustomModal from "../../../theme/modal/customModal";
import styles from "./Alert.module.scss";

interface AlertProps {
  show: boolean;
  setShow: Dispatch<boolean>;
  message: string;
  description?: string;
  actions: [
    {
      title: string;
      handler: () => void;
    },
    {
      title: string;
      handler: () => void;
    },
  ];
}

const Alert: React.FC<AlertProps> = (props) => {
  const { message, show, actions, description } = props;
  const [left, right] = actions;
  return (
    <CustomModal open={show}>
      <div className={styles.alert}>
        <h3>{message}</h3>
        {description && <p>{description}</p>}
        <div className={styles.buttonGroup}>
          <button className={styles.submitBtn} style={{ boxShadow: "5px 5px 15px #fe5d1f38" }} onClick={left.handler}>
            {left.title}
          </button>
          <button className={styles.cancelBtn} onClick={right.handler}>
            {right.title}
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default Alert;
