import React, { useEffect, useRef, useState } from "react";
import Combobox from "../../../../../theme/dropDown/combobox/Combobox.component";
import InputComponent from "../../../../../theme/input/input.component";
import RadioButton from "../../../../../theme/radioButton/RadioButton.component";
import { ScaleComponent } from "../../../../../theme/scale/scale.component";
import styles from "./Physical.module.scss";
import SectionGenderAndActivity from "./sectionGenderAndActivity/SectionGender&Activity";

const gender = [
  {
    icon: "/images/mars-1.png",
    label: "male",
  },
  {
    icon: "/images/femenine.png",
    label: "female",
  },
  {
    icon: "/images/mars-2.png",
    label: "others",
  },
];
const activity = [
  {
    icon: "/icons/activity-low.svg",
    label: "low",
  },
  {
    icon: "/icons/activity-moderate.svg",
    label: "moderate",
  },
  {
    icon: "/icons/activity-high.svg",
    label: "high",
  },
  {
    icon: "/icons/activity-extreme.svg",
    label: "extreme",
  },
];

const pregnantOrLactating = [
  { label: "Not Pregnant or Lactation", value: "Not Pregnant or Lactation" },
  { label: "Pregnant - 1st Trimester", value: "Pregnant - 1st Trimester" },
  {
    label: "Pregnant - 2nd Trimester (Less than 20 Weeks)",
    value: "Pregnant - 2nd Trimester (Less than 20 Weeks)",
  },
  {
    label: "Pregnant - 2nd Trimester (More than 20 Weeks)",
    value: "Pregnant - 2nd Trimester (More than 20 Weeks)",
  },
  { label: "Pregnant - 3nd Trimester", value: "Pregnant - 3nd Trimester" },
  { label: "0-6 months", value: "0-6 months" },
  { label: "Over 7 months", value: "Over 7 months" },
];

type PhysicalProps = {
  userProfile: any;
  updateUserProfile: Function;
};

const Physical = ({ userProfile, updateUserProfile }: PhysicalProps) => {
  const [measurementType, setMeasurementType] = useState("US");
  const [weightInPound, setWeightInPound] = useState<null | number>(null);
  const [weightInKilograms, setWeightInKweightInKilograms] = useState<
    null | number
  >(null);
  const [profileActiveTab, setProfileActiveTab] = useState(0);
  const isMounted = useRef(null);

  useEffect(() => {
    if (userProfile?.weight) {
      setWeightInKweightInKilograms(Number(userProfile?.weight));
      setWeightInPound(Number(userProfile?.weight) * 2.205);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (isMounted?.current) {
  //     if (weightInPound) {
  //       setWeightInKweightInKilograms(
  //         Number((Number(weightInPound) / 2.205)?.toFixed(2))
  //       );
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [weightInPound]);

  // useEffect(() => {
  //   if (isMounted?.current) {
  //     if (weightInPound) {
  //       setWeightInPound(
  //         Number((Number(weightInKilograms) * 2.205)?.toFixed(2))
  //       );
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [weightInKilograms]);

  const handleUpdateAge = (e) => {
    const { name, value, checked } = e?.target;
    let obj = {
      months: userProfile?.age?.months,
      quantity: Number(userProfile?.age?.quantity),
      years: userProfile?.age?.years,
    };

    if (name === "quantity") {
      obj = { ...obj, quantity: Number(value) };
    }
    if (value === "years") {
      obj = { ...obj, years: true, months: false };
    }
    if (value === "months") {
      obj = { ...obj, years: false, months: true };
    }
    updateUserProfile("age", obj);
  };

  const handleUpdateWeightInPound = (e) => {
    setWeightInPound(e?.target?.value);
  };
  const handleUpdateweightInKilograms = (e) => {
    setWeightInKweightInKilograms(e?.target?.value);
  };

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className={styles.physicalContainer}>
      <div className={styles.profile_tab_wraper}>
        <div className={styles.profile_tab}>
          <p
            className={`${profileActiveTab === 0 ? styles.active_border : ""}`}
            onClick={() => setProfileActiveTab(0)}
          >
            Profile
          </p>
          <p
            className={`${profileActiveTab === 1 ? styles.active_border : ""}`}
            onClick={() => setProfileActiveTab(1)}
          >
            Daily Intake
          </p>
        </div>
      </div>
      <div className={styles.header}>
        <div className={styles.radioButton_wraper}>
          <RadioButton
            value="US"
            handleChange={(e) => setMeasurementType(e?.target?.value)}
            id={measurementType}
            label="US"
            name="measurementType"
          />
          <RadioButton
            value="Metric"
            handleChange={(e) => setMeasurementType(e?.target?.value)}
            id={measurementType}
            label="Metric"
            name="measurementType"
          />
        </div>
        <p className={styles.infoText}>
          This information is used to customize daily recommended nutrition
          targets
        </p>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.contentContainer__elementDiv}>
          <div className={styles.contentContainer__elementDiv__heading}>
            <p className={styles?.label}>Your Gender</p>
          </div>
          <div className={styles.contentContainer__elementDiv__objects}>
            <SectionGenderAndActivity
              body={gender}
              fieldName="gender"
              updateUserProfile={updateUserProfile}
              userProfile={userProfile}
            />
          </div>
          <div className={styles.contentContainer__elementDiv__heading}>
            <p className={styles?.label}>Your age</p>
          </div>
          <div className={styles.contentContainer__elementDiv__objects}>
            <div
              style={{ display: "flex", width: "100%", alignItems: "center" }}
            >
              <InputComponent
                style={{ flexBasis: "25%", marginRight: "1rem" }}
                placeholder="Your age"
                type="number"
                value={userProfile?.age?.quantity}
                handleChange={handleUpdateAge}
                name="quantity"
              />
              <RadioButton
                value="years"
                handleChange={handleUpdateAge}
                id={userProfile?.age?.years ? "years" : ""}
                label="Years"
                name="ageInYearsOrMonths"
              />
              <RadioButton
                value="months"
                handleChange={handleUpdateAge}
                id={userProfile?.age?.months ? "months" : ""}
                label="Months"
                name="ageInYearsOrMonths"
              />
            </div>
          </div>

          <div className={styles.contentContainer__elementDiv__heading}>
            <p className={styles?.label}>Your weight ?</p>
          </div>
          <div className={styles.contentContainer__elementDiv__objects}>
            {measurementType === "US" ? (
              <InputComponent
                style={{ width: "25%" }}
                value={weightInPound}
                handleChange={handleUpdateWeightInPound}
                placeholder={"Pounds"}
                type="number"
              />
            ) : (
              <InputComponent
                style={{ width: "25%" }}
                value={weightInKilograms}
                handleChange={handleUpdateweightInKilograms}
                placeholder={"Kilograms"}
                type="number"
              />
            )}
          </div>

          <div className={styles.contentContainer__elementDiv__heading}>
            <p className={styles?.label}>Your Height</p>
          </div>
          <div
            className={`${styles.contentContainer__elementDiv__objects}`}
            style={{ display: "flex" }}
          >
            {measurementType === "US" ? (
              <>
                <InputComponent
                  style={{ width: "25%", marginRight: "16px" }}
                  placeholder="feet"
                  type="number"
                />
                <InputComponent
                  style={{ width: "25%" }}
                  placeholder="Inches"
                  type="number"
                />
              </>
            ) : (
              <>
                <InputComponent
                  style={{ width: "25%" }}
                  placeholder="Centimeters"
                  type="number"
                />
              </>
            )}
          </div>

          <div className={styles.contentContainer__elementDiv__heading}>
            <p className={styles?.label}>Your Activity</p>
          </div>
          <div className={styles.contentContainer__elementDiv__objects}>
            <SectionGenderAndActivity
              body={activity}
              fieldName="activity"
              updateUserProfile={updateUserProfile}
              userProfile={userProfile}
            />
          </div>

          {userProfile?.gender === "female" ? (
            <>
              <div className={styles.contentContainer__elementDiv__heading}>
                <p className={styles?.label}>Pregnant or Lactating?</p>
              </div>
              <div className={styles.contentContainer__elementDiv__objects}>
                <Combobox
                  options={pregnantOrLactating}
                  placeholder="Select"
                  style={{ width: "100%" }}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Physical;
