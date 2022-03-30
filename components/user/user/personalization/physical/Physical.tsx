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
  const [ageType, setAgeType] = useState("years");
  const [weightInPound, setWeightInPound] = useState<null | number>(null);
  const [weightInKilograms, setWeightInKilograms] = useState<null | number>(
    null
  );
  const [profileActiveTab, setProfileActiveTab] = useState(0);
  const [heightInFeetAndInches, setHeightInFeetAndInches] = useState<{
    feet: null | number;
    inches: null | number;
  }>({ feet: null, inches: null });
  const [heightInCentimeters, setHeightInCentimeters] = useState<null | number>(
    null
  );

  const [ageInMounthsAndYears, setAgeInMounthsAndYears] = useState<{
    years: null | number;
    months: null | number;
  }>({ years: null, months: null });
  const isMounted = useRef(null);

  useEffect(() => {
    if (userProfile?.weightInKilograms) {
      setWeightInKilograms(Number(userProfile?.weightInKilograms));
      setWeightInPound(
        Number((userProfile?.weightInKilograms * 2.205)?.toFixed(0))
      );
    }
    if (userProfile?.age?.years) {
      setAgeInMounthsAndYears((pre) => ({
        ...pre,
        years: userProfile?.age?.quantity || 0,
        months: userProfile?.age?.quantity
          ? Number(userProfile?.age?.quantity) * 12
          : 0,
        yearsInRadio: true,
      }));
      setAgeType("years");
    }
    if (userProfile?.age?.months) {
      setAgeInMounthsAndYears((pre) => ({
        ...pre,
        years: userProfile?.age?.quantity
          ? Number(Math?.trunc(userProfile?.age?.quantity / 12))
          : 0,
        months: userProfile?.age?.quantity || 0,
        monthsInRadio: true,
      }));
      setAgeType("months");
    }

    if (userProfile?.heightInCentimeters) {
      setHeightInCentimeters(userProfile?.heightInCentimeters);
      setHeightInFeetAndInches((pre) => ({
        ...pre,
        feet: Number(Math?.trunc(userProfile?.heightInCentimeters / 12)),
        inches: Number(userProfile?.heightInCentimeters % 12),
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     if (measurementType === "US") {
  //       setWeightInKilograms(0);
  //       setHeightInCentimeters(0);
  //     }
  //     if (measurementType === "Metric") {
  //       setWeightInPound(0);
  //       setHeightInFeetAndInches((pre) => ({ ...pre, feet: 0, inches: 0 }));
  //     }
  //   }
  // }, [measurementType]);

  const handleAgeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e?.target;
    let obj = {
      quantity: Number(userProfile?.age?.quantity),
      months: ageType === "months" ? true : false,
      years: ageType === "years" ? true : false,
    };

    if (value === "years") {
      setAgeType("years");
      obj = { ...obj, years: true, months: false };
    }
    if (value === "months") {
      setAgeType("months");
      obj = { ...obj, years: false, months: true };
    }
    updateUserProfile("age", obj);
  };

  const handleUpdateAge = (e) => {
    const { name, value, checked } = e?.target;

    let obj = {
      quantity: Number(userProfile?.age?.quantity),
      months: ageType === "months" ? true : false,
      years: ageType === "years" ? true : false,
    };

    if (name === "years") {
      const valueAsNumber: number = +value;
      if (valueAsNumber >= 0 && valueAsNumber <= 120) {
        setAgeInMounthsAndYears((pre) => ({
          ...pre,
          years: valueAsNumber,
          months: 0,
        }));
        obj = { ...obj, quantity: valueAsNumber };
      }
    }

    if (name === "months") {
      const valueAsNumber: number = +value;
      if (valueAsNumber >= 0 && valueAsNumber <= 1440) {
        setAgeInMounthsAndYears((pre) => ({
          ...pre,
          years: 0,
          months: valueAsNumber,
        }));
        obj = { ...obj, quantity: valueAsNumber };
      }
    }

    updateUserProfile("age", obj);
  };

  const handleUpdateWeightInPound = (e) => {
    const { value } = e?.target;
    const valueAsNumber = +value;
    if (valueAsNumber >= 0 && valueAsNumber <= 400) {
      setWeightInPound(valueAsNumber);
      updateUserProfile(
        "weightInKilograms",
        Number((valueAsNumber / 2.205).toFixed(0))
      );
      if (weightInKilograms !== 0) setWeightInKilograms(0);
    }
  };
  const handleUpdateweightInKilograms = (e) => {
    const { value } = e?.target;
    const valueAsNumber = +value;
    if (valueAsNumber >= 0 && valueAsNumber <= 880) {
      setWeightInKilograms(valueAsNumber);

      updateUserProfile("weightInKilograms", valueAsNumber);
      if (weightInPound !== 0) setWeightInPound(0);
    }
  };

  const handleheightInCentimeters = (e) => {
    const { value } = e?.target;
    const valueAsNumber = +value;
    if (valueAsNumber >= 0 && valueAsNumber <= 243) {
      setHeightInCentimeters(valueAsNumber);
      updateUserProfile("heightInCentimeters", +valueAsNumber);
      if (
        heightInFeetAndInches?.feet !== 0 ||
        heightInFeetAndInches?.inches !== 0
      ) {
        setHeightInFeetAndInches((pre) => ({ ...pre, feet: 0, inches: 0 }));
      }
    }
  };

  const handleHeightInFeetAndInches = (e) => {
    const { name, value } = e?.target;
    const valueAsNumber = +value;

    let feet = heightInFeetAndInches?.feet * 12;
    let inches = heightInFeetAndInches?.inches;

    if (name === "feet") {
      if (valueAsNumber >= 0 && valueAsNumber <= 8) {
        setHeightInFeetAndInches((pre) => ({ ...pre, [name]: valueAsNumber }));
        feet = valueAsNumber * 12;
        let HeightInCentimeters = feet + inches;
        updateUserProfile("heightInCentimeters", HeightInCentimeters);
        if (heightInCentimeters !== 0) setHeightInCentimeters(0);
      }
    }

    if (name === "inches") {
      if (valueAsNumber >= 0 && valueAsNumber <= 11) {
        setHeightInFeetAndInches((pre) => ({ ...pre, [name]: valueAsNumber }));
        inches = valueAsNumber;
        let HeightInCentimeters = feet + inches;
        updateUserProfile("heightInCentimeters", HeightInCentimeters);
        if (heightInCentimeters !== 0) setHeightInCentimeters(0);
      }
    }
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
      {profileActiveTab === 0 ? (
        <>
          <div className={styles.header}>
            <div className={styles.radioButton_wraper}>
              <RadioButton
                value="US"
                handleChange={(e) => setMeasurementType(e?.target?.value)}
                checked={measurementType === "US"}
                label="US"
                name="measurementType"
              />
              <RadioButton
                value="Metric"
                handleChange={(e) => setMeasurementType(e?.target?.value)}
                checked={measurementType === "Metric"}
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
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  {ageType === "years" ? (
                    <InputComponent
                      style={{ flexBasis: "25%", marginRight: "1rem" }}
                      placeholder="Your age"
                      type="number"
                      value={ageInMounthsAndYears?.years}
                      handleChange={handleUpdateAge}
                      name="years"
                      max={120}
                    />
                  ) : (
                    <InputComponent
                      style={{ flexBasis: "25%", marginRight: "1rem" }}
                      placeholder="Your age"
                      type="number"
                      value={ageInMounthsAndYears?.months}
                      handleChange={handleUpdateAge}
                      name="months"
                      max={1440}
                    />
                  )}

                  <RadioButton
                    value="years"
                    handleChange={handleAgeType}
                    checked={ageType === "years"}
                    label="Years"
                    name="ageInYearsOrMonths"
                  />
                  <RadioButton
                    value="months"
                    handleChange={handleAgeType}
                    checked={ageType === "months"}
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
                    name="Pounds"
                    max={400}
                  />
                ) : (
                  <InputComponent
                    style={{ width: "25%" }}
                    value={weightInKilograms}
                    handleChange={handleUpdateweightInKilograms}
                    placeholder={"Kilograms"}
                    type="number"
                    max={880}
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
                      name="feet"
                      value={heightInFeetAndInches?.feet}
                      handleChange={handleHeightInFeetAndInches}
                      max={8}
                    />
                    <InputComponent
                      style={{ width: "25%" }}
                      placeholder="Inches"
                      type="number"
                      name="inches"
                      value={heightInFeetAndInches?.inches}
                      handleChange={handleHeightInFeetAndInches}
                      max={11}
                    />
                  </>
                ) : (
                  <>
                    <InputComponent
                      style={{ width: "25%" }}
                      placeholder="Centimeters"
                      type="number"
                      value={heightInCentimeters}
                      handleChange={handleheightInCentimeters}
                      max={243}
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
        </>
      ) : null}
    </div>
  );
};

export default Physical;
