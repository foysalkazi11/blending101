import React from "react";
import CancleBtn from "../../buttons/CancleBtn";
import SubmitBtn from "../../buttons/SubmitBtn";
import styles from "./NoteForm.module.scss";

type NoteFormProps = {
  toggleNoteForm: () => void;
  noteForm: { title: string; body: string };
  updateNoteForm: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  createOrUpdateNote: () => void;
};

const NoteForm = ({
  toggleNoteForm,
  noteForm,
  updateNoteForm,
  createOrUpdateNote,
}: NoteFormProps) => {
  return (
    <div className={styles.noteFormContainer}>
      <h3>Add Note</h3>
      <input name="title" value={noteForm?.title} onChange={updateNoteForm} />
      <textarea name="body" value={noteForm?.body} onChange={updateNoteForm} />
      <div className={styles.btnBox}>
        <SubmitBtn
          style={{ background: "#7DBD3B", boxShadow: "5px 5px 15px #e5e6e4" }}
          text="Save"
          handleClick={createOrUpdateNote}
        />
        <CancleBtn text="Cancle" handleClick={toggleNoteForm} />
      </div>
    </div>
  );
};

export default NoteForm;
