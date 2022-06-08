import React from "react";
import styles from "./Center_header.module.scss";
import ClearIcon from "../../../../../public/icons/clear_black_36dp.svg";
import { useRouter } from "next/router";
import { IoIosSave } from "react-icons/io";
import Tooltip from "../../../../../theme/toolTip/CustomToolTip";
import PanelHeader from "../../../share/panelHeader/PanelHeader";

interface CenterHeaderPorps {
  handleSaveRecipe?: () => void;
}

const Center_header = ({ handleSaveRecipe = () => {} }: CenterHeaderPorps) => {
  const router = useRouter();

  const rightSide = (
    <div className={styles.center__title__right}>
      <Tooltip content="Save recipe" direction="bottom">
        <div
          className={styles.center__title__right__eye}
          onClick={handleSaveRecipe}
        >
          <IoIosSave />
        </div>
      </Tooltip>

      <Tooltip content="Back home" direction="bottom">
        <div
          className={styles.center__title__right__cross}
          onClick={() => router?.push("/")}
        >
          <ClearIcon />
        </div>
      </Tooltip>
    </div>
  );

  return (
    <PanelHeader
      icon="/icons/recipe-icon.svg"
      title="Recipe"
      rightSide={rightSide}
    />
  );
};

export default Center_header;
