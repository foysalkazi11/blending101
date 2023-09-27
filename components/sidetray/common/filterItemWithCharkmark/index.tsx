import React from "react";
import styles from "./FilterItemWithCheckmark.module.scss";
import CheckIcon from "theme/checkIcon/CheckIcon";

type FilterItemWithCheckmarkProps = React.ComponentPropsWithoutRef<"div"> & {
  label: string;
  value: string;
  onClick: (value: string) => void;
  isChecked: (value: string) => boolean;
  checkMarkPosition?: React.CSSProperties;
};

const FilterItemWithCheckmark = ({
  isChecked,
  label,
  value,
  onClick,
  checkMarkPosition = { position: "absolute", top: "4px", right: "1rem" },
  ...rest
}: FilterItemWithCheckmarkProps) => {
  return (
    <div className={styles.filterItemWithCheckmarkContainer} onClick={() => onClick(value)} {...rest}>
      <p>{label}</p>
      {isChecked(value) && <CheckIcon style={checkMarkPosition} />}
    </div>
  );
};

export default FilterItemWithCheckmark;
