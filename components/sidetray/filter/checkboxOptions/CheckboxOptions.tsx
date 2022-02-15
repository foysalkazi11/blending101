import React from "react";
import { useAppSelector } from "../../../../redux/hooks";
import CustomCheckbox from "../../../../theme/checkbox/CustomCheckbox";
import styles from "./CheckboxOptions.module.scss";

type CheckboxOptionsProps = {
  values: string[];
  onSelect?: (chip: string) => any;
};

const CheckboxOptions = ({
  values = [],
  onSelect = () => {},
}: CheckboxOptionsProps) => {
  const { dbUser } = useAppSelector((state) => state?.user);
  const { recipeFilterByIngredientCategory } = useAppSelector(
    (state) => state?.ingredients
  );
  const options = {
    Collection: dbUser?.collections?.map((item) => item?.name),
    Dynamic: ["Popular", "Recommended", "Latest"],
  };
  return (
    <div className={styles.checkboxOptionsContainer}>
      {options[recipeFilterByIngredientCategory]?.map((item, index) => {
        return (
          <div key={index} className={styles.singleCheckbox}>
            <CustomCheckbox
              checked={values.includes(item)}
              handleChange={() => onSelect(item)}
            />
            <p>{item}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxOptions;
