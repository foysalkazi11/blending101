// THIS COMPONENT IS FOR SHOW ADD ITEM BUTTON IN RESPONSIVE VIEW

import React from "react";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";

import Icon from "../Icon/Icon.component";
import styles from "./AddButton.module.scss";

const AddButton = (props: React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={styles.button} {...props}>
      <Icon fontName={faPlus} size={30} />
    </button>
  );
};

export default AddButton;
