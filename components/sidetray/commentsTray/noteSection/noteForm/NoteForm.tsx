import React from "react";
import CommentAndNoteButton from "../../../../../theme/button/commentAndNoteButton/CommentAndNoteButton";
import styles from "./NoteForm.module.scss";

type NoteFormProps = {
  toggleNoteForm: () => void;
  noteForm: { title: string; body: string };
  updateNoteForm: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  createOrUpdateNote: () => void;
  varient?: "notes" | "versions";
};

const NoteForm = ({
  toggleNoteForm,
  noteForm,
  updateNoteForm,
  createOrUpdateNote,
  varient = "notes",
}: NoteFormProps) => {
  return (
    <div className={styles.noteFormContainer}>
      <h3>Add {`${varient === "notes" ? "note" : "version"}`}</h3>
      <input name="title" value={noteForm?.title} onChange={updateNoteForm} />
      <textarea name="body" value={noteForm?.body} onChange={updateNoteForm} />
      <div className={styles.btnBox}>
        <CommentAndNoteButton
          type="submitBtn"
          submitBtnVarient="secondary"
          style={{ boxShadow: "5px 5px 15px #e5e6e4" }}
          text="Save"
          handleClick={createOrUpdateNote}
        />
        <CommentAndNoteButton
          type="cancleBtn"
          text="Cancel"
          handleClick={toggleNoteForm}
        />
      </div>
    </div>
  );
};

export default NoteForm;
