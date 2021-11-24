import React, { useEffect, useState } from "react";
import styles from "./scale.module.scss";

interface scaleCompInterface {
  value: string;
  setValue: Function;
  lingLinedivider?: number;
  shortLineDivider?: number;
  fieldName: string;
  min: string;
  max: string;
}
export function ScaleComponent(props: scaleCompInterface) {
  const {
    value,
    setValue,
    lingLinedivider = 10,
    shortLineDivider = 0,
    fieldName,
    min = 0,
    max = 100,
  } = props;

  const [line, setLine] = useState([]);

  useEffect(() => {
    let array = [];

    for (let i = Number(min); i <= Number(max); i++) {
      array.push(i);
    }
    setLine(array);
  }, []);

  const YLine = ({ value, index }) => {
    let longline = false;
    const style = {
      left: `calc(${index * (100 / (Number(max) - Number(min)))}%)`,
      height: `20px`,
    };
    const number = value % lingLinedivider;
    if (number === 0) {
      style.height = "40px";
      if (value === Number(min) || value === Number(max)) {
        longline = false;
      } else {
        longline = value;
      }
    } else {
      if (shortLineDivider) {
        if (number % shortLineDivider !== 0) {
          style.height = "0px";
        }
      }
    }

    return (
      <div className={styles.yLine} style={style}>
        {longline && <div className={styles.longline}>{longline}</div>}
      </div>
    );
  };

  return (
    <div className={styles.main}>
      <div className={styles.scale}>
        <input
          type="range"
          step={1}
          value={value}
          onChange={(e) => setValue(fieldName, e.target.value)}
          min={min}
          max={max}
        />
        <div className={styles.line}>
          {line?.map((no, i) => (
            <YLine key={"linex" + i} value={no} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
