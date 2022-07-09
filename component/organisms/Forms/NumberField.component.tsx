import React, { Fragment, useState } from "react";
import styles from "./NumberField.module.scss";

interface NumberFieldProps {
  minValue?: number;
  value?: any;
  label?: string;
  className?: string;
  onChange?: (value: any) => any;
}
const NumberField = (props: NumberFieldProps) => {
  let { minValue, value, label, className, onChange } = props;
  const [number, setNumber] = useState<number>(value);
  const adjusterFunc = (task: "+" | "-") => {
    let ammount = number;
    if (number <= minValue && task === "-") {
      ammount = minValue;
    } else {
      if (task === "+") {
        ammount += 1;
        // setNumber((number) => (number += 1));
      } else {
        ammount -= 1;
        // setNumber((number) => (number -= 1));
      }
    }
    // value = number;
    onChange({ target: { value: ammount } });
    setNumber(ammount);
  };
  return (
    <Fragment>
      {label && <label className={styles.label}>{label}</label>}
      <div className={`${styles.numberField} ${className || ""}`}>
        <div className={styles.numberField__options}>
          <span className={styles.text}>{number}</span>
          <div className={styles.arrow}>
            <div className={styles.arrow_div}>
              <img
                onClick={() => {
                  adjusterFunc("+");
                }}
                src={"/icons/dropdown.svg"}
                alt="icon"
                width={"17px"}
                height={"15px"}
                className={styles.reverse_arrow}
              />
              <img
                onClick={() => {
                  adjusterFunc("-");
                }}
                src={"/icons/dropdown.svg"}
                alt="icon"
                width={"17px"}
                height={"15px"}
                className={styles.original_arrow}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

NumberField.defaultProps = {
  value: 0,
  minValue: 0,
};
export default NumberField;
