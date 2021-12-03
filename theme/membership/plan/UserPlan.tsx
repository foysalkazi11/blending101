import React from "react";
import ButtonComponent from "../../button/button.component";
import styles from "./UserPlan.module.scss";

const UserPlan = () => {
  return (
    <div className={styles.userPlanContainer}>
      <p className={styles.planTitle}>Free</p>
      <p className={styles.planSubtitle}>Ullamco laboris nisi ut</p>
      <strong>
        $0 <small>/mo</small>
      </strong>
      <div className={styles.btnContainer}>
        <ButtonComponent
          type="primary"
          value="Update Profile"
          style={{
            borderRadius: "20px",
            height: "40px",
            width: "140px",
            fontSize: "11px",
          }}
        />
      </div>
      <ul>
        <li>Free access to all Blending 101 standard features.</li>
      </ul>
    </div>
  );
};

export default UserPlan;
