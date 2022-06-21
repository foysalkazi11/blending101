import React from "react";
import NoteForm from "../noteForm/NoteForm";
import styles from "../NoteSection.module.scss";

type NoteFormProps = {
  showForm: boolean;
  toggleNoteForm: () => void;
  noteForm: { title: string; body: string };
  updateNoteForm: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  createOrUpdateNote: () => void;
  handleButtonClick: () => void;
};

const NoteHead = ({
  createOrUpdateNote,
  noteForm,
  showForm,
  toggleNoteForm,
  updateNoteForm,
  handleButtonClick,
}: NoteFormProps) => {
  return (
    <div>
      {showForm ? (
        <NoteForm
          toggleNoteForm={toggleNoteForm}
          noteForm={noteForm}
          updateNoteForm={updateNoteForm}
          createOrUpdateNote={createOrUpdateNote}
        />
      ) : (
        <div className={styles.commentsIconBox}>
          <span></span>

          <button
            onClick={() => {
              handleButtonClick();
            }}
          >
            <img src="/images/plus-white-icon.svg" alt="add-icon" />
            <span>Add</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteHead;
