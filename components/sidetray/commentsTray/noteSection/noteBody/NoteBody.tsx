import React from "react";
import styles from "../NoteSection.module.scss";
import { format } from "date-fns";
import SkeletonNote from "../../../../../theme/skeletons/skeletonNote/SkeletonNote";
import Tooltip from "../../../../../theme/toolTip/CustomToolTip";
import IconWarper from "../../../../../theme/iconWarper/IconWarper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/pro-light-svg-icons";
import CircularRotatingLoader from "../../../../../theme/loader/circularRotatingLoader.component";
import { faTrash } from "@fortawesome/pro-regular-svg-icons";

interface NoteBodyPops {
  data?: any[];
  updateItem?: (val: any) => void;
  deleteItem?: (id: string) => void;
  varient?: "notes" | "versions";
  loading?: boolean;
  isFromRecipePage?: "details" | "edit" | "default";
  handleToGetARecipeVersion?: (id: string) => void;
  handleToChangeDefaultVersion?: (
    versionId: string,
    isDefault: boolean,
  ) => void;
  deleteItemLoading?: boolean;
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
}: NoteBodyPops) => {
  return (
    <div className={`${styles.noteEditBox} y-scroll`}>
      {loading ? (
        <SkeletonNote />
      ) : data?.length >= 1 ? (
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
                ) : null}
              </div>

              <div className={styles.noteDis}>
                <p>{item?.body || item?.description}</p>

                <div className={styles.buttomDis}>
                  <span>
                    {item?.updatedAt ? (
                      <>
                        {format(new Date(item?.updatedAt), "dd/MM/yyyy")}{" "}
                        (edited)
                      </>
                    ) : (
                      item?.createdAt &&
                      format(new Date(item?.createdAt), "dd/MM/yyyy")
                    )}
                  </span>
                  {isFromRecipePage === "edit" ||
                  (isFromRecipePage === "details" && item?.isDefault) ? (
                    <Tooltip content="Default" direction="left">
                      <span
                        onClick={() =>
                          isFromRecipePage === "edit" &&
                          handleToChangeDefaultVersion(
                            item?._id,
                            item?.isDefault,
                          )
                        }
                        className={`${styles.star} ${
                          item?.isDefault ? styles.on : styles.off
                        }`}
                      >
                        &#9733;
                      </span>
                    </Tooltip>
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
