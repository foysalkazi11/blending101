import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_DAILY_BY_USER_ID } from "../../../../../../gqlLib/recipeDiscovery/query/recipeDiscovery";
import { useAppSelector } from "../../../../../../redux/hooks";
import ButtonComponent from "../../../../../../theme/button/button.component";
import CircularRotatingLoader from "../../../../../../theme/loader/circularRotatingLoader.component";
import DailyIntakeAccordian from "../../../../../customRecursiveAccordian/dailyIntakeAccordian/dailyIntakeAccordian.component";
import styles from "./DailyIntake.module.scss";
import HeadingBox from "./headingBox/headingBox.component";
import InputGoal from "./inputGoal/inputGoal.component";

const DailyIntake = () => {
  const { dbUser } = useAppSelector((state) => state?.user);
  const { data: dailyData } = useQuery(GET_DAILY_BY_USER_ID(dbUser?._id));
  console.log(dbUser?._id);
  const dailyChartData = dailyData?.getDailyByUserId;

  useEffect(() => {
    console.log(dailyData);
  }, [dailyData]);

  return (
    <>
      <div className={styles.dailyIntakeContainer}>
        <header className={styles.header}>
          <p className={styles.infoText}>
            Your daily recommended intake based on your profile settings
          </p>
        </header>
        <div className={styles.mainContentDiv__accordian}>
          <div className={styles.centerDiv}>
            <div className={styles.centerDiv__headingTray}>
              <div className={styles.centerDiv__headingTray__left}>
                <HeadingBox>Source</HeadingBox>
              </div>
              <div className={styles.centerDiv__headingTray__center}>
                <HeadingBox>DRI</HeadingBox>
              </div>
              <div className={styles.centerDiv__headingTray__right}>
                <HeadingBox>Goal</HeadingBox>
              </div>
            </div>
            <div className={styles.centerDiv__headingTray}>
              <h3 className={styles.centerDiv__headingTray__left}>BMI</h3>
              <h3 className={styles.centerDiv__headingTray__center}>
                {dailyChartData?.bmi?.value ? (
                  Math.round(dailyChartData?.bmi?.value)
                ) : (
                  <div style={{ marginTop: "10px" }}>
                    <CircularRotatingLoader />
                  </div>
                )}
              </h3>
              <div className={styles.centerDiv__headingTray__right}>
                <InputGoal />
              </div>
            </div>
            <div className={styles.centerDiv__headingTray}>
              <h3 className={styles.centerDiv__headingTray__left}>Calories</h3>
              <h3 className={styles.centerDiv__headingTray__center}>
                {dailyChartData?.calories?.value ? (
                  Math.round(dailyChartData?.calories?.value)
                ) : (
                  <div style={{ marginTop: "10px" }}>
                    <CircularRotatingLoader />
                  </div>
                )}
              </h3>
              <div className={styles.centerDiv__headingTray__right}>
                <InputGoal />
              </div>
            </div>
          </div>
          <DailyIntakeAccordian recursiveObject={dailyChartData?.nutrients} />
        </div>
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
