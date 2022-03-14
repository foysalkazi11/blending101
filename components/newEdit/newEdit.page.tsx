import React from "react";
import styles from "./newEdit.module.scss";
import TrayEdit from "./trays/leftTray.component";
import RightTrayEdit from "./trays/rightTray.component";

function NewEditRecipe({ data }) {
  return (
    <div className={styles.edit_recipe}>
      <div className={styles.sidebar}>
        <TrayEdit ingredients={data.ingredients} />
      </div>
      <div className={styles.centre}></div>
      <div>
        <RightTrayEdit ingredients={data.ingredients} />
      </div>
    </div>
  );
}

export default NewEditRecipe;
