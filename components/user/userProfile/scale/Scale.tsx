import React, { useState, useEffect } from "react";
import styles from "./Scale.module.scss";
import { ScaleComponent } from "../../../../theme/scale/scale.component";

type ScaleProps = {
  title: string;
  value: string;
  setValue: Function;
  resultWithText: string;
  fieldName: string;
  min: string;
  max: string;
  lingLinedivider?: number;
  shortLineDivider?: number;
};

const Scale = (props: ScaleProps) => {
  const {
    title,
    value,
    setValue,
    resultWithText,
    fieldName,
    min,
    max,
    lingLinedivider,
    shortLineDivider,
  } = props;

  return (
    <div className={styles.scaleContainer}>
      <h2>{title}</h2>
      <div className={styles.scaleContainer__scale}>
        <ScaleComponent
          value={value}
          setValue={setValue}
          fieldName={fieldName}
          min={min}
          max={max}
          lingLinedivider={lingLinedivider}
          shortLineDivider={shortLineDivider}
        />
      </div>
      <h3>
        {value} {resultWithText}
      </h3>
    </div>
  );
};

export default Scale;
