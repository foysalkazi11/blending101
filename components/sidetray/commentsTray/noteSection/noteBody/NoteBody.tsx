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
  handleTitleClick?: (id: string) => void;
}
const NoteBody = ({
  data = [],
  deleteItem = () => {},
  updateItem = () => {},
  varient = "notes",
  loading = false,
  isFromRecipePage = "default",
  handleTitleClick = () => {},
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
                  onClick={() => handleTitleClick(item?._id)}
                  style={{
                    cursor:
                      isFromRecipePage === "edit" ||
                      isFromRecipePage === "details"
                        ? "pointer"
                        : null,
                  }}
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
                <span>
                  {item?.updatedAt ? (
                    <>
                      {format(parseISO(item?.updatedAt), "dd/mm/yyyy")} (edited)
                    </>
                  ) : (
                    format(parseISO(item?.createdAt), "dd/mm/yyyy")
                  )}
                </span>
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
