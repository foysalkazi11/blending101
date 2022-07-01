/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQuery } from "@apollo/client";
import { faChartSimple } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import UPDATE_DAILY_GOALS from "../../../../../../gqlLib/dri/mutation/updateDailyGoals";
import GET_DAILY_BY_USER_ID from "../../../../../../gqlLib/dri/query/getDailyByUserId";
import GET_DAILY_GOALS from "../../../../../../gqlLib/dri/query/getDailyGoals";
import { useAppSelector } from "../../../../../../redux/hooks";
import ButtonComponent from "../../../../../../theme/button/button.component";
import CircularRotatingLoader from "../../../../../../theme/loader/circularRotatingLoader.component";
import DailyIntakeAccordian from "../../../../../customRecursiveAccordian/dailyIntakeAccordian/dailyIntakeAccordian.component";
import reactToastifyNotification from "../../../../../utility/reactToastifyNotification";
import styles from "./DailyIntake.module.scss";
import HeadingBox from "./headingBox/headingBox.component";
import InputGoal from "./inputGoal/inputGoal.component";

const DailyIntake = ({ colorToggle, setColorToggle, toggle }) => {
  const { dbUser } = useAppSelector((state) => state?.user);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    memberId: dbUser?._id,
    bmi: null,
    calories: {
      goal: null,
      dri: null,
    },
    goals: {},
  });
  const { data: dailyData, loading: dailyDataLoading } = useQuery(
    GET_DAILY_BY_USER_ID,
    {
      fetchPolicy: "network-only",
      variables: { userId: dbUser?._id },
    },
  );
  const { data: dailyGoalData, loading: dailyGoalLoading } = useQuery(
    GET_DAILY_GOALS,
    {
      fetchPolicy: "network-only",
      variables: { memberId: dbUser?._id },
    },
  );
  const [updateDailyGoals] = useMutation(UPDATE_DAILY_GOALS);

  const {
    bmi: bmiAccordianValue,
    calories: caloriesAccordianValue,
    nutrients: nutrientsAccordianValue,
  } = dailyData?.getDailyByUserId || {};

  useEffect(() => {
    if (!dailyDataLoading && dailyData?.getDailyByUserId) {
      if (
        parseFloat(dailyGoalData?.getDailyGoals?.bmi) !==
        parseFloat(dailyData?.getDailyByUserId?.bmi?.value)
      ) {
        setInputValue((pre) => ({
          ...pre,
          bmi: Math?.round(dailyGoalData?.getDailyGoals?.bmi),
        }));
      }
    }
  }, [dailyData?.getDailyByUserId]);

  useEffect(() => {
    if (!dailyGoalLoading && dailyGoalData?.getDailyGoals) {
      let updatedObject = inputValue;
      updatedObject = {
        ...updatedObject,
        calories: {
          dri: dailyGoalData?.getDailyGoals?.calories?.dri || null,
          goal: dailyGoalData?.getDailyGoals?.calories?.goal || null,
        },
        goals: JSON?.parse(dailyGoalData?.getDailyGoals?.goals),
      };
      setInputValue(updatedObject);
    }
  }, [dailyGoalData?.getDailyGoals]);

  const updateGoals = async () => {
    setLoading(true);
    const { Energy, Minerals, Vitamins } =
      dailyData?.getDailyByUserId?.nutrients;
    let nutrientsArr = [...Energy, ...Minerals, ...Vitamins];

    nutrientsArr = nutrientsArr?.map((item) => {
      const findNut = inputValue?.goals[item?.blendNutrientRef];

      if (findNut) {
        return {
          ...findNut,
          percentage: item?.percentage,
          showPercentage: item?.showPercentage,
        };
      } else {
        return {
          blendNutrientId: item?.blendNutrientRef,
          //@ts-ignore
          dri: parseFloat(item?.data?.value),
          percentage: item?.percentage,
          showPercentage: item?.showPercentage,
        };
      }
    });

    const obj = {
      memberId: inputValue?.memberId ? inputValue?.memberId : dbUser?._id,
      goals: [...nutrientsArr],
      calories: inputValue?.calories?.goal
        ? { ...inputValue?.calories }
        : {
            dri: parseFloat(dailyData?.getDailyByUserId?.calories?.value),
          },
      bmi:
        inputValue?.bmi || parseFloat(dailyData?.getDailyByUserId?.bmi?.value),
    };

    try {
      await updateDailyGoals({
        variables: {
          data: { ...obj },
        },
      });
      setLoading(false);
      reactToastifyNotification("info", "Updated daily goals Successfully");
    } catch (error) {
      setLoading(false);
      reactToastifyNotification(
        "error",
        error?.message || "Something went wrong",
      );

      console.log(error.message);
    }
    setColorToggle(true);
    setLoading(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;

    if (name === "calories") {
      setInputValue((prv) => ({
        ...prv,
        calories: {
          ...prv?.calories,
          dri: parseFloat(dailyData?.getDailyByUserId?.calories?.value),
          goal: parseFloat(value),
        },
      }));
    } else {
      setInputValue((prv) => ({ ...prv, [name]: parseFloat(value) }));
    }
  };

  return (
    <>
      <div className={styles.dailyIntakeContainer}>
        <header className={styles.header}>
          <FontAwesomeIcon icon={faChartSimple} className={styles?.icon} />
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
                {bmiAccordianValue?.value ? (
                  Math.round(bmiAccordianValue?.value)
                ) : (
                  <div style={{ marginTop: "10px" }}>
                    <CircularRotatingLoader />
                  </div>
                )}
              </h3>
              <div className={styles.centerDiv__headingTray__right}>
                <InputGoal
                  name="bmi"
                  inputValue={inputValue?.bmi}
                  setInputValue={handleInput}
                />
              </div>
            </div>
            <div className={styles.centerDiv__headingTray}>
              <h3 className={styles.centerDiv__headingTray__left}>Calories</h3>
              <h3 className={styles.centerDiv__headingTray__center}>
                {caloriesAccordianValue?.value ? (
                  Math.round(caloriesAccordianValue?.value)
                ) : (
                  <div style={{ marginTop: "10px" }}>
                    <CircularRotatingLoader />
                  </div>
                )}
              </h3>
              <div className={styles.centerDiv__headingTray__right}>
                <InputGoal
                  name="calories"
                  inputValue={inputValue?.calories?.goal}
                  setInputValue={handleInput}
                />
              </div>
            </div>
          </div>
          <DailyIntakeAccordian
            recursiveObject={nutrientsAccordianValue}
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
        <ButtonComponent
          type="primary"
          value={loading ? "Updating ..." : "Update Goals"}
          style={{
            borderRadius: "30px",
            height: "48px",
            width: "180px",
          }}
          onClick={updateGoals}
        />
      </div>
    </>
  );
};

export default DailyIntake;
