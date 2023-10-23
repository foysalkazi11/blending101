import React from "react";

import CustomModal from "../../../theme/modal/customModal";
import styles from "./Confirm.module.scss";

interface ShareProps {
  show: boolean;
  setShow: any;
  message: string;
  onConfirm: (type: "WARNING" | "MERGE" | "REPLACE") => Promise<void>;
}

const ConfirmAlert: React.FC<ShareProps> = (props) => {
  const { message, show, onConfirm } = props;
  // useEffect(() => {
  //   if (!show) return;
  //   onShare();
  // }, [onShare, show]);

  return (
    <CustomModal open={show}>
      <div className={styles.alert}>
        <h3>{message}</h3>
        <div className={styles.buttonGroup}>
          <button
            className={styles.submitBtn}
            style={{ boxShadow: "5px 5px 15px #fe5d1f38" }}
            onClick={() => onConfirm("MERGE")}
          >
            Merge Plans
          </button>
          <button className={styles.cancelBtn} onClick={() => onConfirm("REPLACE")}>
            Replace Plans
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default ConfirmAlert;
