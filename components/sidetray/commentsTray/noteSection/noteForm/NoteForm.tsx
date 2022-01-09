import React from "react";
import CancleBtn from "../../buttons/CancleBtn";
import SubmitBtn from "../../buttons/SubmitBtn";
import styles from "./NoteForm.module.scss";

type NoteFormProps = {
  toggleNoteForm: () => void;
};

const NoteForm = ({ toggleNoteForm }: NoteFormProps) => {
  return (
    <div className={styles.noteFormContainer}>
      <h3>Add Note</h3>
      <input />
      <textarea />
      <div className={styles.btnBox}>
        <SubmitBtn
          style={{ background: "#7DBD3B", boxShadow: "5px 5px 15px #e5e6e4" }}
          text="Save"
        />
        <CancleBtn text="Cancle" handleClick={toggleNoteForm} />
      </div>
    </div>
  );
};

export default NoteForm;
