/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./SectionGenderAndActivity.module.scss";
import { Grid } from "@mui/material";
import capitalizeFirstLetter from "../../../../../utility/capitalizeFirstLetter";

type SectionGenderAndActivityProps = {
  body: { icon: string; label: string }[];
  fieldName: string;
  updateUserProfile: Function;
  userProfile: any;
};

const SectionGenderAndActivity = ({
  body = [],
  fieldName,
  updateUserProfile,
  userProfile,
}: SectionGenderAndActivityProps) => {
  return (
    <div className={styles.imageContainer}>
      <Grid
        item
        container
        alignItems="center"
        // justifyContent={body.length <= 3 ? "center" : "flex-start"}
        spacing={3}
      >
        {body.length
          ? body?.map((item, index) => {
              return (
                <Grid item xs={4} key={index}>
                  <div
                    className={`${styles.singleImage} ${
                      item?.label === userProfile[fieldName]
                        ? styles.active
                        : ""
                    }`}
                    onClick={() => updateUserProfile(fieldName, item?.label)}
                  >
                    <div className={styles.imageBox}>
                      <img src={item?.icon} alt="icon" />
                      <p> {capitalizeFirstLetter(item?.label)}</p>
                    </div>
                  </div>
                </Grid>
              );
            })
          : null}
      </Grid>
    </div>
  );
};

export default SectionGenderAndActivity;
