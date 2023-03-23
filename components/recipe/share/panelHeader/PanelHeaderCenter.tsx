import { faRectangleVerticalHistory } from "@fortawesome/pro-light-svg-icons";
import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import Loader from "../../../../component/atoms/Loader/loader.component";
import {
  setOpenVersionTray,
  setOpenVersionTrayFormWhichPage,
  setShouldCloseVersionTrayWhenClickAVersion,
} from "../../../../redux/slices/versionTraySlice";
import IconWraper from "../../../../theme/iconWarper/IconWarper";
import CircularRotatingLoader from "../../../../theme/loader/circularRotatingLoader.component";
import Tooltip from "../../../../theme/toolTip/CustomToolTip";
import PanelHeader from "./PanelHeader";
import styles from "./PanelHeader.module.scss";

interface PanelHeaderCenterProps {
  editOrSavebtnText?: string;
  editOrSavebtnFunc?: () => void;
  backLink?: string;
  pageComeFrom?: "edit" | "details";
  recipeVersionLength?: number;
  loading?: boolean;
}

const PanelHeaderCenter = ({
  backLink = "",
  editOrSavebtnFunc = () => {},
  editOrSavebtnText = "",
  pageComeFrom,
  recipeVersionLength = 0,
  loading = false,
}: PanelHeaderCenterProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const rightSide = (
    <div className={styles.centerRightBtnWraper}>
      {pageComeFrom === "edit" && (
        <Tooltip content={`Open versions`} direction="bottom">
          <button
            className={`${styles.headerTextBtn} ${styles.headerTextBtnOutline} hvr-pop`}
            onClick={() => {
              dispatch(setOpenVersionTray(true));
              dispatch(setOpenVersionTrayFormWhichPage("edit"));
              dispatch(setShouldCloseVersionTrayWhenClickAVersion(true));
            }}
          >
            <FontAwesomeIcon
              icon={faRectangleVerticalHistory}
              style={{ marginRight: "5px" }}
            />
            Version
            {recipeVersionLength ? `(${recipeVersionLength})` : ""}
          </button>
        </Tooltip>
      )}
      <Tooltip content={`${editOrSavebtnText} recipe`} direction="bottom">
        <button
          className={`${styles.headerTextBtn} hvr-pop`}
          onClick={editOrSavebtnFunc}
          style={{ minWidth: "45px" }}
        >
          {loading ? (
            <CircularRotatingLoader
              color="white"
              style={{ fontSize: "16px" }}
            />
          ) : (
            editOrSavebtnText
          )}
        </button>
      </Tooltip>

      <Tooltip content="Back" direction="bottom">
        <IconWraper
          handleClick={() => router?.push(backLink)}
          iconColor="iconColorWhite"
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
