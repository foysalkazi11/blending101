import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import styles from "../NoteSection.module.scss";
import { format, parseISO } from "date-fns";
import SkeletonNote from "../../../../../theme/skeletons/skeletonNote/SkeletonNote";

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
  handleGetARecipe?: () => void;
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
  handleGetARecipe = () => {},
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
                  onClick={() =>
                    item?.isDefault
                      ? handleGetARecipe()
                      : handleToGetARecipeVersion(item?._id)
                  }
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
                    <div
                      className={styles.editIconBox}
                      onClick={() => updateItem(item)}
                    >
                      <FiEdit2 className={styles.icon} />
                    </div>
                    <div
                      className={styles.editIconBox}
                      onClick={() => deleteItem(item?._id)}
                    >
                      <MdDeleteOutline className={styles.icon} />
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
                        {format(parseISO(item?.updatedAt), "dd/mm/yyyy")}{" "}
                        (edited)
                      </>
                    ) : (
                      format(parseISO(item?.createdAt), "dd/mm/yyyy")
                    )}
                  </span>
                  {isFromRecipePage === "edit" ? (
                    <span
                      onClick={() =>
                        handleToChangeDefaultVersion(item?._id, item?.isDefault)
                      }
                      className={`${styles.star} ${
                        item?.isDefault ? styles.on : styles.off
                      }`}
                    >
                      &#9733;
                    </span>
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
