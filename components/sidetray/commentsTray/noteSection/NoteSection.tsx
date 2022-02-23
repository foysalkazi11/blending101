/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./NoteSection.module.scss";
import NoteForm from "./noteForm/NoteForm";
import { FiEdit2 } from "react-icons/fi";
import { format, parseISO } from "date-fns";
import { useMutation } from "@apollo/client";
import CREATE_NEW_NOTE from "../../../../gqlLib/notes/mutation/createNewNote";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setLoading } from "../../../../redux/slices/utilitySlice";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";
import EDIT_MY_NOTE from "../../../../gqlLib/notes/mutation/editMyNote";
import { MdDeleteOutline } from "react-icons/md";
import DELETE_MY_NOTE from "../../../../gqlLib/notes/mutation/deleteMyNote";
import SkeletonNote from "../../../../theme/skeletons/skeletonNote/SkeletonNote";
type NoteSectionProps = {
  allNotes: any[];
  setAllNotes: Dispatch<SetStateAction<any[]>>;
};

const NoteSection = ({ allNotes, setAllNotes }: NoteSectionProps) => {
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [updateNote, setUpdateNote] = useState(false);
  const [updateNoteId, setUpdateNoteId] = useState("");
  const [noteForm, setNoteForm] = useState({ title: "", body: "" });
  const [createNote] = useMutation(CREATE_NEW_NOTE);
  const [editNote] = useMutation(EDIT_MY_NOTE);
  const [deleteNote] = useMutation(DELETE_MY_NOTE);
  const { dbUser } = useAppSelector((state) => state?.user);
  const { activeRecipeId } = useAppSelector((state) => state?.collections);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const updateNoteForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e?.target;
    setNoteForm((pre) => ({ ...pre, [name]: value }));
  };
  const toggleNoteForm = () => {
    setShowNoteForm((pre) => !pre);
  };

  const removeNote = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await deleteNote({
        variables: {
          data: {
            recipeId: activeRecipeId,
            userId: dbUser?._id,
            noteId: id,
          },
        },
      });
      setAllNotes(data?.removeMyNote);
      setLoading(false);
      reactToastifyNotification("info", "Delete successfully");
    } catch (error) {
      setLoading(false);
      reactToastifyNotification("error", error?.message);
    }
  };

  const createOrUpdateNote = async () => {
    toggleNoteForm();
    setLoading(true);
    try {
      if (updateNote) {
        const { data } = await editNote({
          variables: {
            editMyNoteData2: {
              editableObject: { body: noteForm?.body, title: noteForm?.title },
              noteId: updateNoteId,
              userId: dbUser?._id,
              recipeId: activeRecipeId,
            },
          },
        });

        setAllNotes(data?.editMyNote);
      } else {
        const { data } = await createNote({
          variables: {
            data: {
              body: noteForm?.body,
              title: noteForm?.title,
              recipeId: activeRecipeId,
              userId: dbUser?._id,
            },
          },
        });
        setAllNotes(data?.createNewNote);
      }

      setLoading(false);
      reactToastifyNotification(
        "info",
        `Note ${updateNote ? "updated" : "created"} successfully`
      );
    } catch (error) {
      setLoading(false);
      reactToastifyNotification("error", error?.message);
    }
  };

  const updateNoteValue = (id: string, title: string, body: string) => {
    setUpdateNote(true);
    setNoteForm((pre) => ({ ...pre, title, body }));
    setUpdateNoteId(id);
    toggleNoteForm();
  };

  return (
    <>
      {showNoteForm ? (
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
              toggleNoteForm();
              setUpdateNote(false);
              setNoteForm((pre) => ({ ...pre, title: "", body: "" }));
            }}
          >
            <img src="/images/plus-white-icon.svg" alt="add-icon" />
            <span>Add</span>
          </button>
        </div>
      )}

      {loading ? (
        <SkeletonNote />
      ) : (
        <div className={`${styles.noteEditBox} y-scroll`}>
          {allNotes?.length ? (
            allNotes?.map((note, index) => {
              return (
                <div className={styles.singleNoteEdit} key={index}>
                  <div className={styles.header}>
                    <h3>{note?.title}</h3>
                    <div className={styles.rightSide}>
                      <div
                        className={styles.editIconBox}
                        onClick={() =>
                          updateNoteValue(note?._id, note?.title, note?.body)
                        }
                      >
                        <FiEdit2 className={styles.icon} />
                      </div>
                      <div
                        className={styles.editIconBox}
                        onClick={() => removeNote(note?._id)}
                      >
                        <MdDeleteOutline className={styles.icon} />
                      </div>
                    </div>
                  </div>

                  <div className={styles.noteDis}>
                    <p>{note?.body}</p>
                    <span>
                      {note?.updatedAt ? (
                        <>
                          {format(parseISO(note?.updatedAt), "dd/mm/yyyy")}{" "}
                          (edited)
                        </>
                      ) : (
                        format(parseISO(note?.createdAt), "dd/mm/yyyy")
                      )}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <p className={styles.noNotes}>No notes</p>
          )}
        </div>
      )}
    </>
  );
};

export default NoteSection;
