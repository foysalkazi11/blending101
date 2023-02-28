import React from "react";
import styles from "../NoteSection.module.scss";
import { format } from "date-fns";
import SkeletonNote from "../../../../../theme/skeletons/skeletonNote/SkeletonNote";
import Tooltip from "../../../../../theme/toolTip/CustomToolTip";
import IconWarper from "../../../../../theme/iconWarper/IconWarper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/pro-light-svg-icons";
import CircularRotatingLoader from "../../../../../theme/loader/circularRotatingLoader.component";
import { faShareNodes, faTrash } from "@fortawesome/pro-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStarSharp } from "@fortawesome/pro-solid-svg-icons";

type isFromRecipePageType = "details" | "edit" | "default";

interface NoteBodyPops {
  data?: any[];
  updateItem?: (val: any) => void;
  deleteItem?: (id: string) => void;
  varient?: "notes" | "versions";
  loading?: boolean;
  isFromRecipePage?: isFromRecipePageType;
  handleToGetARecipeVersion?: (id: string) => void;
  handleToChangeDefaultVersion?: (
    versionId: string,
    isOriginalVersion: boolean,
  ) => void;
  deleteItemLoading?: boolean;
  handleTurnOnOrOffVersion?: (turnedOn: boolean, versionId: string) => void;
}
const NoteBody = ({
  data = [],
  deleteItem = () => {},
  updateItem = () => {},
  varient = "notes",
  loading = false,
  isFromRecipePage = "default",
  handleToGetARecipeVersion = () => {},
  handleToChangeDefaultVersion = () => {},
  deleteItemLoading = false,
  handleTurnOnOrOffVersion = () => {},
}: NoteBodyPops) => {
  return (
    <div className={`${styles.noteEditBox} y-scroll`}>
      {loading ? (
        <SkeletonNote />
      ) : data?.length ? (
        data?.map((item, index) => {
          return (
            <div className={styles.singleNoteEdit} key={index}>
              <div className={styles.header}>
                <h3
                  onClick={() => handleToGetARecipeVersion(item?._id)}
                  className={`${
                    isFromRecipePage === "edit" ||
                    isFromRecipePage === "details"
                      ? styles.headingHover
                      : null
                  }`}
                >
                  {item?.title || item?.postfixTitle}
                </h3>
                {isFromRecipePage === "default" ||
                isFromRecipePage === "edit" ? (
                  <FloodingMenuOne
                    deleteItem={deleteItem}
                    deleteItemLoading={deleteItemLoading}
                    item={item}
                    updateItem={updateItem}
                  />
                ) : null}
              </div>

              <div className={styles.noteDis}>
                <p>{item?.body || item?.description}</p>

                <div className={styles.buttomDis}>
                  <span>
                    {item?.updatedAt ? (
                      <>
                        {format(new Date(item?.updatedAt), "MM/dd/yyyy")}{" "}
                        (edited)
                      </>
                    ) : (
                      item?.createdAt &&
                      format(new Date(item?.createdAt), "MM/dd/yyyy")
                    )}
                  </span>
                  {isFromRecipePage === "edit" ||
                  isFromRecipePage === "details" ? (
                    <FloodingMenuTwo
                      handleToChangeDefaultVersion={
                        handleToChangeDefaultVersion
                      }
                      handleTurnOnOrOffVersion={handleTurnOnOrOffVersion}
                      isFromRecipePage={isFromRecipePage}
                      item={item}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className={styles.noNotes}>
          No {`${varient === "notes" ? "Notes" : "Varsions"}`}
        </p>
      )}
    </div>
  );
};

export default NoteBody;

interface FloodingMenuOneProps {
  item: any;
  updateItem: (agr: any) => void;
  deleteItem: (agr: any) => void;
  deleteItemLoading: boolean;
}

const FloodingMenuOne = ({
  item,
  updateItem = () => {},
  deleteItem = () => {},
  deleteItemLoading = false,
}: FloodingMenuOneProps) => {
  return (
    <div className={styles.rightSide}>
      <div className={styles.content}>
        <IconWarper
          hover="none"
          defaultBg="gray"
          handleClick={() => updateItem(item)}
          style={{ marginRight: "5px" }}
        >
          <FontAwesomeIcon icon={faPen} fontSize={12} />
        </IconWarper>

        <IconWarper
          hover="none"
          defaultBg="gray"
          handleClick={() => deleteItem(item?._id)}
        >
          {deleteItemLoading ? (
            <CircularRotatingLoader
              color="white"
              style={{ fontSize: "16px" }}
            />
          ) : (
            <FontAwesomeIcon icon={faTrash} fontSize={12} />
          )}
        </IconWarper>
      </div>
    </div>
  );
};

interface FloodingMenuTwoProps {
  item: any;
  isFromRecipePage: isFromRecipePageType;
  handleToChangeDefaultVersion: (
    versionId: string,
    isOriginalVersion: boolean,
  ) => void;
  handleTurnOnOrOffVersion?: (turnedOn: boolean, versionId: string) => void;
}

const FloodingMenuTwo = ({
  item = {},
  handleToChangeDefaultVersion = () => {},
  isFromRecipePage = "default",
  handleTurnOnOrOffVersion = () => {},
}: FloodingMenuTwoProps) => {
  return (
    <div className={styles.leftSide}>
      <Tooltip
        content={`Share ${item?.isVersionSharable ? "On" : "Off"}`}
        direction="left"
      >
        <FontAwesomeIcon
          icon={faShareNodes}
          className={`${styles.star} ${
            isFromRecipePage !== "edit" && styles.pointerEventNone
          } ${item?.isVersionSharable ? styles.on : styles.off}`}
          onClick={() =>
            isFromRecipePage === "edit" &&
            handleTurnOnOrOffVersion(
              item?.isVersionSharable ? false : true,
              item?._id,
            )
          }
        />
      </Tooltip>
      {item?.isVersionSharable && (
        <Tooltip
          content={item?.isDefault ? "Default" : "Make default"}
          direction="left"
        >
          <FontAwesomeIcon
            onClick={() =>
              isFromRecipePage === "edit" &&
              handleToChangeDefaultVersion(item?._id, false)
            }
            className={`${styles.star} ${
              isFromRecipePage !== "edit" && styles.pointerEventNone
            } ${item?.isDefault ? styles.on : styles.off}`}
            icon={faStarSharp}
          />
        </Tooltip>
      )}
    </div>
  );
};
