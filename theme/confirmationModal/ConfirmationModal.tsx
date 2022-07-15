import React from "react";
import CommentAndNoteButton from "../button/commentAndNoteButton/CommentAndNoteButton";
import CircularRotatingLoader from "../loader/circularRotatingLoader.component";
import styles from "./ConfirmationModal.module.scss";

interface ConfirmationModalProps {
  text: string;
  submitFunc: () => void;
  cancleFunc: () => void;
  loading?: boolean;
}

const ConfirmationModal = ({
  cancleFunc,
  submitFunc,
  text,
  loading = false,
}: ConfirmationModalProps) => {
  return (
    <div className={styles.confirmationModalContainer}>
      <div className={styles.modalBody}>
        <p className={styles.text}>{text}</p>
        <div className={styles.buttonBox}>
          <CommentAndNoteButton
            type="cancleBtn"
            text="Cancle"
            handleClick={cancleFunc}
            style={{ marginRight: "20px" }}
          />
          <CommentAndNoteButton
            type="submitBtn"
            text={
              loading ? (
                <CircularRotatingLoader
                  color="white"
                  style={{ fontSize: "24px" }}
                />
              ) : (
                "Delete"
              )
            }
            handleClick={submitFunc}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
