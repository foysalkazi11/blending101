import React, { useState } from "react";
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
    icon: "/images/ski-lift-regular.png",
    label: "low",
  },
  {
    icon: "/images/walking-regular-1.png",
    label: "moderate",
  },
  {
    icon: "/images/running-regular.png",
    label: "high",
  },
];

type PhysicalProps = {
  userProfile: any;
  updateUserProfile: Function;
};

const Physical = ({ userProfile, updateUserProfile }: PhysicalProps) => {
  const [measurementType, setMeasurementType] = useState("US");

  const handleChange = (e) => {
    console.log(e?.target?.value);

    setMeasurementType(e?.target?.value);
  };
  return (
    <div className={styles.physicalContainer}>
      {/* <RadioButton
        value="US"
        handleChange={handleChange}
        htmlFor={measurementType}
        label="US"
        name="measurementType"
      />
      <RadioButton
        value="Metric"
        handleChange={handleChange}
        htmlFor={measurementType}
        label="Metric"
        name="measurementType"
      /> */}
      <p className={styles.infoText}>
        This information is used to customize daily recommended nutrition
        targets
      </p>
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
            <InputComponent
              style={{ width: "25%" }}
              placeholder="Your age"
              type="number"
            />
          </div>

          <div className={styles.contentContainer__elementDiv__heading}>
            <p className={styles?.label}>Your weight ?</p>
          </div>
          <div className={styles.contentContainer__elementDiv__objects}>
            <InputComponent
              style={{ width: "25%", marginRight: "16px" }}
              placeholder="Your weight"
              type="number"
            />
          </div>

          <div className={styles.contentContainer__elementDiv__heading}>
            <p className={styles?.label}>Your Height</p>
          </div>
          <div
            className={`${styles.contentContainer__elementDiv__objects}`}
            style={{ display: "flex" }}
          >
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
        </div>
      </div>
    </div>
  );
};

export default Physical;
