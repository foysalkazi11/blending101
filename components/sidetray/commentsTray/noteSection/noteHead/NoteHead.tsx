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
  isFromRecipePage?: "details" | "edit" | "default";
  varient?: "notes" | "versions";
};

const NoteHead = ({
  createOrUpdateNote,
  noteForm,
  showForm,
  toggleNoteForm,
  updateNoteForm,
  handleButtonClick,
  isFromRecipePage = "default",
  varient = "notes",
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
      ) : isFromRecipePage === "default" || isFromRecipePage === "edit" ? (
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
      ) : null}
    </div>
  );
};

export default NoteHead;
