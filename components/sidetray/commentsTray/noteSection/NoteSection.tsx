/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "./NoteSection.module.scss";
import NoteForm from "./noteForm/NoteForm";
import { FiEdit2 } from "react-icons/fi";

const NoteSection = () => {
  const [showNoteForm, setShowNoteForm] = useState(false);

  const toggleNoteForm = () => {
    setShowNoteForm((pre) => !pre);
  };
  return (
    <>
      {showNoteForm ? (
        <NoteForm toggleNoteForm={toggleNoteForm} />
      ) : (
        <div className={styles.commentsIconBox}>
          <span></span>

          <button onClick={toggleNoteForm}>
            <img src="/images/plus-white-icon.svg" alt="add-icon" />
            <span>Add</span>
          </button>
        </div>
      )}

      <div className={`${styles.noteEditBox} y-scroll`}>
        <div className={styles.singleNoteEdit}>
          <div className={styles.header}>
            <h3>Important</h3>
            <div className={styles.editIconBox}>
              <FiEdit2 className={styles.icon} />
            </div>
          </div>

          <div className={styles.noteDis}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              suscipit,
            </p>
            <span>27/5/2021</span>
          </div>
        </div>
        <div className={styles.singleNoteEdit}>
          <div className={styles.header}>
            <h3>Process</h3>
            <div className={styles.editIconBox}>
              <FiEdit2 className={styles.icon} />
            </div>
          </div>

          <div className={styles.noteDis}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              suscipit,
            </p>
            <span>27/5/2021</span>
          </div>
        </div>
        <div className={styles.singleNoteEdit}>
          <div className={styles.header}>
            <h3>Ingredients</h3>
            <div className={styles.editIconBox}>
              <FiEdit2 className={styles.icon} />
            </div>
          </div>

          <div className={styles.noteDis}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              suscipit,
            </p>
            <span>27/5/2021</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteSection;
