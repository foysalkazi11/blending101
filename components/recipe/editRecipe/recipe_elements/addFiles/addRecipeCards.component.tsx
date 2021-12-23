import React from "react";
import styles from "./addRecipeCards.module.scss";

const AddRecipeCard = () => {
  return (
    <div className={styles.addImage}>
      <input
        className={styles.addImage__div}
        type="file"
        name="files[]"
        id="files"
        multiple
        accept="image/jpeg, image/png, image/gif"
      />
    </div>
  );
};

export default AddRecipeCard;
