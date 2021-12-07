import React from "react";
import WikiTray from "../wikiTray.component";
import Dropdown from "react-dropdown";
import styles from "./nutrition.module.scss";

export default function NutritionTrayComponent({ title }) {
  const options = ["one", "two", "three"];
  const defaultOption = options[0];

  const onChange = () => {};

  return (
    <WikiTray title={title}>
      <div className={styles.nutrition}>
        <Dropdown
          options={options}
          onChange={onChange}
          value={defaultOption}
          placeholder="Select an option"
          controlClassName={styles.dropdown}
        />
        <div>
          <ul>
            <li>A - Retinol</li>
            <li>B1 - Thiamine</li>
            <li>B2 - Riboflavin</li>
            <li>B3 - Niacin</li>
            <li>B5 - Pnatothenic Acid</li>
            <li>B6 - Pyridoxine</li>
            <li>B7 - Biotin</li>
          </ul>
        </div>
      </div>
    </WikiTray>
  );
}
