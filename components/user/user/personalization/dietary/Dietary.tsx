import React from "react";
import DropDown from "../../../../../theme/dropDown/DropDown.component";
import styles from "./Dietary.module.scss";
import DietarySection from "./dietarySection/DietarySection";

let dropdownItem = [
  "Warning",
  "Leafy",
  "Berry",
  "Herbal",
  "Fruity",
  "Balancer",
  "Fatty",
  "Seasoning",
  "Flavor",
  "Rooty",
  "Flowering",
  "Liquid",
];

const dietary = [
  {
    icon: "/images/healthy-food.png",
    label: "low fodmap",
  },
  {
    icon: "/images/avocado-1.png",
    label: "ketogenic",
  },
  {
    icon: "/images/milk.png",
    label: "vegetarian   dairy",
  },
  {
    icon: "/images/vegetarian.png",
    label: "vegetarian no dairy",
  },
  // {
  //   icon: "/images/milk.png",
  //   label: "vegetarian dairy",
  // },
  // {
  //   icon: "/images/milk.png",
  //   label: "vegetarian dairy",
  // },
];
const allergies = [
  {
    icon: "/images/milk-bottle.png",
    label: "low",
  },
  {
    icon: "/images/peanut.png",
    label: "moderate",
  },
  {
    icon: "/images/almond.png",
    label: "high",
  },
];

type DietaryProps = {
  userProfile: any;
  updateUserProfile: Function;
};

const Dietary = ({ updateUserProfile, userProfile }: DietaryProps) => {
  return (
    <div className={styles.dietaryContainer}>
      <p className={styles.infoText}>
        This information is used to customize daily recommended nutrition
        targets
      </p>
      <div className={styles.dietrySelect}>
        <p className={styles.text}>
          How should dietary or allergy conflicts be handled?
        </p>
        <div style={{ flex: "auto" }}>
          <DropDown listElem={dropdownItem} style={{ maxWidth: "200px" }} />
        </div>
      </div>
      <div>
        <DietarySection
          body={dietary}
          fieldName="dietary"
          title="Which dietary lifestyle applies to you ?"
          updateUserProfile={updateUserProfile}
          userProfile={userProfile}
        />
      </div>
      <div>
        <DietarySection
          body={allergies}
          fieldName="allergies"
          title="Which allergies do you have ?"
          updateUserProfile={updateUserProfile}
          userProfile={userProfile}
        />
      </div>
    </div>
  );
};

export default Dietary;
