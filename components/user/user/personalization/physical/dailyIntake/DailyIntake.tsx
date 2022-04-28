/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_ALL_BLEND_NUTRIENTS } from "../../../../../../gqlLib/recipeDiscovery/query/recipeDiscovery";
import { UPDATE_DAILY_GOALS } from "../../../../../../gqlLib/user/mutations/mutation/updateDailyGoals";
import {
  GET_DAILY_BY_USER_ID,
  GET_DAILY_GOALS,
} from "../../../../../../gqlLib/user/mutations/query/getDaily";
import { useAppSelector } from "../../../../../../redux/hooks";
import ButtonComponent from "../../../../../../theme/button/button.component";
import CircularRotatingLoader from "../../../../../../theme/loader/circularRotatingLoader.component";
import DailyIntakeAccordian from "../../../../../customRecursiveAccordian/dailyIntakeAccordian/dailyIntakeAccordian.component";
import reactToastifyNotification from "../../../../../utility/reactToastifyNotification";
import styles from "./DailyIntake.module.scss";
import HeadingBox from "./headingBox/headingBox.component";
import InputGoal from "./inputGoal/inputGoal.component";

const DailyIntake = () => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    memberId: "",
    calories: "",
    bmi: "",
    goals: {},
  });
  const { dbUser } = useAppSelector((state) => state?.user);
  const { data: dailyData } = useQuery(GET_DAILY_BY_USER_ID(dbUser?._id), {
    fetchPolicy: "network-only",
  });
  const { data: dailyGoalData } = useQuery(GET_DAILY_GOALS(dbUser?._id), {
    fetchPolicy: "network-only",
  });
  const objectToArrayForGoals = (goalsObject) => {
    let goalsArray = [];
    if (Object?.keys(goalsObject)?.length > 0) {
      Object?.entries(goalsObject)?.map((elem) => {
        goalsArray = [...goalsArray, elem[1]];
      });
    }
    return goalsArray;
  };
  const [updateDailyGoals] = useMutation(
    UPDATE_DAILY_GOALS({
      memberId: dbUser?._id,
      calories: inputValue.calories || 0,
      bmi: inputValue.bmi || 0,
      goalsArray: objectToArrayForGoals(inputValue.goals) || [],
    })
  );
  const dailyChartData = dailyData?.getDailyByUserId;

  const handleInput = (e: { target: { name: string; value: string } }) => {
    let updatedObject = inputValue;

    updatedObject = {
      ...updatedObject,
      [e.target.name]: parseInt(e.target.value),
    };
    setInputValue(updatedObject);
  };

  useEffect(() => {
    if (!inputValue) return;
    let updatedObject = inputValue;
    updatedObject = {
      ...updatedObject,
      memberId: dbUser?._id,
    };
    setInputValue(updatedObject);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbUser?._id]);

  useEffect(() => {
    if (!inputValue) return;
    let updatedObject = inputValue;
    updatedObject = {
      ...updatedObject,
      bmi: dailyGoalData?.getDailyGoals?.bmi,
      calories: dailyGoalData?.getDailyGoals?.calories,
    };

    setInputValue(updatedObject);
  }, [dailyGoalData?.getDailyGoals]);

  const updateGoals = async () => {
    setLoading(true);
    const { data } = await updateDailyGoals();
    console.log(data);
    setLoading(false);
    reactToastifyNotification("info", "Profile Updated Successfully");
  };

  const parsedDailyGoalsData = dailyGoalData
    ? JSON?.parse(dailyGoalData?.getDailyGoals?.goals)
    : {};
  // parsedDailyGoalsData && console.log(parsedDailyGoalsData);
  dailyGoalData?.getDailyGoals && console.log(dailyGoalData?.getDailyGoals);
  dailyChartData && console.log(dailyChartData?.nutrients);
  parsedDailyGoalsData && console.log(parsedDailyGoalsData);
  inputValue && console.log({ inputValue });

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
                <InputGoal
                  name={"bmi"}
                  inputValue={inputValue?.bmi}
                  setInputValue={handleInput}
                />
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
                <InputGoal
                  name={"calories"}
                  inputValue={inputValue.calories}
                  setInputValue={handleInput}
                />
              </div>
            </div>
          </div>
          <DailyIntakeAccordian
            recursiveObject={dailyChartData?.nutrients}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
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
        {loading ? (
          <ButtonComponent
            type="primary"
            value="Updating ..."
            style={{
              borderRadius: "30px",
              height: "48px",
              width: "180px",
            }}
          />
        ) : (
          <ButtonComponent
            type="primary"
            value="Update Goals"
            style={{
              borderRadius: "30px",
              height: "48px",
              width: "180px",
            }}
            onClick={updateGoals}
          />
        )}
      </div>
    </>
  );
};

export default DailyIntake;
