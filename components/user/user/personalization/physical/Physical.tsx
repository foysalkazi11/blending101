import { Grid } from "@mui/material";
import React from "react";
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
  return (
    <div className={styles.physicalContainer}>
      <p className={styles.infoText}>
        This information is used to customize daily recommended nutrition
        targets
      </p>
      <div className={styles.contentContainer}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={2} my={{ xs: 0, lg: 3 }}>
            <p className={styles?.label}>Your Gender</p>
          </Grid>
          <Grid item xs={12} lg={10} my={{ xs: 0, lg: 3 }}>
            <SectionGenderAndActivity
              body={gender}
              fieldName="gender"
              updateUserProfile={updateUserProfile}
              userProfile={userProfile}
            />
          </Grid>
          <Grid item xs={12} lg={2} my={{ xs: 0, lg: 3 }}>
            <p className={styles?.label}>Your age</p>
          </Grid>
          <Grid item xs={12} lg={10} my={{ xs: 0, lg: 3 }}>
            <ScaleComponent
              fieldName="age"
              setValue={updateUserProfile}
              value={userProfile?.age}
              min={"0"}
              max={"100"}
              shortLineDivider={2}
              longLineDivider={10}
            />

            <p className={styles.showValue}>{userProfile?.age} years old</p>
          </Grid>

          <Grid item xs={12} lg={2} my={{ xs: 0, lg: 3 }}>
            <p className={styles?.label}>Your weight ?</p>
          </Grid>
          <Grid item xs={12} lg={10} my={{ xs: 0, lg: 3 }}>
            <ScaleComponent
              fieldName="weight"
              setValue={updateUserProfile}
              value={userProfile?.weight}
              min={"145"}
              max={"200"}
              longLineDivider={5}
            />

            <p className={styles.showValue}>{userProfile?.weight} pounds</p>
          </Grid>

          <Grid item xs={12} lg={2} my={{ xs: 0, lg: 3 }}>
            <p className={styles?.label}>Your Activity</p>
          </Grid>
          <Grid item xs={12} lg={10} my={{ xs: 0, lg: 3 }}>
            <SectionGenderAndActivity
              body={activity}
              fieldName="activity"
              updateUserProfile={updateUserProfile}
              userProfile={userProfile}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Physical;
