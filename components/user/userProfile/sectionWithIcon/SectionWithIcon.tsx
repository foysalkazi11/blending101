/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./SectionWithIcon.module.scss";
import { Grid } from "@mui/material";
import capitalizeFirstLetter from "../../../utility/capitalizeFirstLetter";

type SectionWithIconProps = {
  title: string;
  body: { icon: string; label: string }[];
  fieldName: string;
  updateUserProfile: Function;
  userProfile: any;
  alredyExist?: (value: string, fieldName: string) => boolean;
};

const SectionWithIcon = ({
  title = "",
  body = [],
  fieldName,
  updateUserProfile,
  userProfile,
  alredyExist,
}: SectionWithIconProps) => {
  return (
    <div className={styles.sectionWithIconContainer}>
      <h2>{title}</h2>
      <div className={styles.imageContainer}>
        <Grid
          container
          alignItems="center"
          justifyContent={body.length <= 3 ? "center" : "flex-start"}
          spacing={3}
        >
          {body.length
            ? body?.map((item, index) => {
                return (
                  <Grid item xs={3} key={index}>
                    <div
                      className={`${styles.singleImage} ${
                        alredyExist
                          ? alredyExist(item?.label, "allergies")
                            ? styles.active
                            : ""
                          : item?.label === userProfile[fieldName]
                          ? styles.active
                          : ""
                      }`}
                      onClick={() => updateUserProfile(fieldName, item?.label)}
                    >
                      <div className={styles.imageBox}>
                        <img src={item?.icon} alt="icon" />
                      </div>
                      <h2> {capitalizeFirstLetter(item?.label)}</h2>
                    </div>
                  </Grid>
                );
              })
            : null}
        </Grid>
      </div>
    </div>
  );
};

export default SectionWithIcon;
