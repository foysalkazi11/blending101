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
}
const NoteBody = ({
  data = [],
  deleteItem = () => {},
  updateItem = () => {},
  varient = "notes",
  loading = false,
}: NoteBodyPops) => {
  if (loading) {
    return <SkeletonNote />;
  }
  return (
    <div className={`${styles.noteEditBox} y-scroll`}>
      {data?.length ? (
        data?.map((item, index) => {
          return (
            <div className={styles.singleNoteEdit} key={index}>
              <div className={styles.header}>
                <h3>{item?.title || item?.postfixTitle}</h3>
                <div className={styles.rightSide}>
                  <div
                    className={styles.editIconBox}
                    onClick={() => updateItem(item?._id)}
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
              </div>

              <div className={styles.noteDis}>
                <p>{item?.body || item?.description}</p>
                <span>
                  {varient === "versions" ? null : item?.updatedAt ? (
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
