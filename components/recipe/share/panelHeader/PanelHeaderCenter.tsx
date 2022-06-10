import { useRouter } from "next/router";
import React from "react";
import { MdClose } from "react-icons/md";
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
        <button className={styles.headerTextBtn} onClick={editOrSavebtnFunc}>
          {editOrSavebtnText}
        </button>
      </Tooltip>

      <Tooltip content="Back" direction="bottom">
        <div className={styles.iconBtn} onClick={() => router?.push(backLink)}>
          <MdClose />
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

export default PanelHeaderCenter;
