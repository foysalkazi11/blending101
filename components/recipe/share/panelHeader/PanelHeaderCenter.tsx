import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import IconWraper from "../../../../theme/iconWraper/IconWraper";
import Tooltip from "../../../../theme/toolTip/CustomToolTip";
import PanelHeader from "./PanelHeader";
import styles from "./PanelHeader.module.scss";

interface PanelHeaderCenterProps {
  editOrSavebtnText?: string;
  editOrSavebtnFunc?: () => void;
  backLink?: string;
}

const PanelHeaderCenter = ({
  backLink = "",
  editOrSavebtnFunc = () => {},
  editOrSavebtnText = "",
}: PanelHeaderCenterProps) => {
  const router = useRouter();

  const rightSide = (
    <div className={styles.centerRightBtnWraper}>
      <Tooltip content={`${editOrSavebtnText} recipe`} direction="bottom">
        <button
          className={`${styles.headerTextBtn} hvr-pop`}
          onClick={editOrSavebtnFunc}
        >
          {editOrSavebtnText}
        </button>
      </Tooltip>

      <Tooltip content="Back" direction="bottom">
        <IconWraper
          handleClick={() => router?.push(backLink)}
          defaultBg="secondary"
          hover="bgSecondary"
          style={{ width: "28px", height: "28px" }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </IconWraper>
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

export default PanelHeaderCenter;
