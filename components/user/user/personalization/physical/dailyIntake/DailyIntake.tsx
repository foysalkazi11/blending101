import React from "react";
import ButtonComponent from "../../../../../../theme/button/button.component";
import styles from "./DailyIntake.module.scss";

const DailyIntake = () => {
  return (
    <>
      <div className={styles.dailyIntakeContainer}>
        <header className={styles.header}>
          <p className={styles.infoText}>
            Your daily recommended intake based on your profile settings
          </p>
        </header>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <ButtonComponent
          type="primary"
          value="Update Profile"
          style={{
            borderRadius: "30px",
            height: "48px",
            width: "180px",
          }}
          // onClick={handleSubmit(submitData)}
        />
      </div>
    </>
  );
};

export default DailyIntake;
