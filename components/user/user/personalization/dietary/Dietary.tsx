import React, { useState } from "react";
import DropDown from "../../../../../theme/dropDown/DropDown.component";
import styles from "./Dietary.module.scss";
import DietarySection from "./dietarySection/DietarySection";

let dropdownItem = [
  { name: "Warning", value: "Warning" },
  { name: "Hiding", value: "Hiding" },
];

const dietary = [
  {
    icon: "/images/healthy-food.png",
    label: "Low fodmap",
  },
  {
    icon: "/images/avocado-1.png",
    label: "Ketogenic",
  },
  {
    icon: "/images/milk.png",
    label: "Vegetarian dairy",
  },
  {
    icon: "/images/vegetarian.png",
    label: "Vegetarian no dairy",
  },
  {
    icon: "/images/leaf.png",
    label: "vegan",
  },
  {
    icon: "/images/chicken.png",
    label: "Paleo",
  },
];
const allergies = [
  {
    icon: "/images/milk-bottle.png",
    label: "Milk",
  },
  {
    icon: "/images/peanut.png",
    label: "Peanut",
  },
  {
    icon: "/images/almond.png",
    label: "Tree Nut",
  },
  {
    icon: "/images/soy-1.png",
    label: "Soy",
  },
];

type DietaryProps = {
  userProfile: any;
  updateUserProfile: Function;
  alredyExist?: (value: string, fieldName: string) => boolean;
};

const Dietary = ({ updateUserProfile, userProfile, alredyExist }: DietaryProps) => {
  const [dropDownValue, setDropDownValue] = useState("Warning");
  return (
    <div className={styles.dietaryContainer}>
      <p className={styles.infoText}>This information is used to customize daily recommended nutrition targets</p>
      <div className={styles.dietrySelect}>
        <p className={styles.text}>How should dietary or allergy conflicts be handled?</p>
        <div style={{ flex: "auto" }}>
          <DropDown
            listElem={dropdownItem}
            style={{ maxWidth: "200px" }}
            value={dropDownValue}
            onChange={(e) => setDropDownValue(e?.target?.value)}
          />
        </div>
      </div>

      <DietarySection
        body={dietary}
        fieldName="dieteryLifeStyle"
        title="Which dietary lifestyle applies to you ?"
        updateUserProfile={updateUserProfile}
        userProfile={userProfile}
      />

      <DietarySection
        body={allergies}
        fieldName="allergies"
        title="Which allergies do you have ?"
        updateUserProfile={updateUserProfile}
        userProfile={userProfile}
        alredyExist={alredyExist}
      />
    </div>
  );
};

export default Dietary;
