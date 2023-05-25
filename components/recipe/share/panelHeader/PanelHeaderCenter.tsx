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
import { useAppSelector } from "../../../../redux/hooks";

interface PanelHeaderCenterProps {
  editOrSavebtnText?: string;
  editOrSavebtnFunc?: any;
  pageComeFrom?: "edit" | "details";
  recipeVersionLength?: number;
  loading?: boolean;
  backBtnObj?: {
    text?: string;
    function: any;
    loading?: boolean;
  };
}

const PanelHeaderCenter = ({
  editOrSavebtnFunc = () => {},
  editOrSavebtnText = "",
  pageComeFrom,
  recipeVersionLength = 0,
  loading = false,
  backBtnObj = { loading: false, text: "Back", function: () => {} },
}: PanelHeaderCenterProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);

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

      {pageComeFrom === "details" && (
        <button
          className={`${styles.headerTextBtn} hvr-pop`}
          onClick={() =>
            router.push(`/edit_recipe/${detailsARecipe?.recipeId?._id}/parsing`)
          }
          style={{ minWidth: "45px" }}
        >
          parsing
        </button>
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

      <Tooltip content={backBtnObj?.text || "Back"} direction="bottom">
        <IconWraper
          handleClick={backBtnObj?.function}
          iconColor="iconColorWhite"
          defaultBg="secondary"
          hover="bgSecondary"
          style={{ width: "28px", height: "28px" }}
        >
          {backBtnObj?.loading ? (
            <CircularRotatingLoader
              color="white"
              style={{ fontSize: "16px" }}
            />
          ) : (
            <FontAwesomeIcon icon={faXmark} />
          )}
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
