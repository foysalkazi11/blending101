/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./NoteSection.module.scss";
import NoteForm from "./noteForm/NoteForm";
import { FiEdit2 } from "react-icons/fi";
import { format, parseISO } from "date-fns";
import { useMutation } from "@apollo/client";
import CREATE_NEW_NOTE from "../../../../gqlLib/notes/mutation/createNewNote";
import { useAppSelector } from "../../../../redux/hooks";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";
import EDIT_MY_NOTE from "../../../../gqlLib/notes/mutation/editMyNote";
import DELETE_MY_NOTE from "../../../../gqlLib/notes/mutation/deleteMyNote";
import SkeletonNote from "../../../../theme/skeletons/skeletonNote/SkeletonNote";
import NoteBody from "./noteBody/NoteBody";
import NoteHead from "./noteHead/NoteHead";
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

  const updateNoteForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
        `Note ${updateNote ? "updated" : "created"} successfully`,
      );
    } catch (error) {
      setLoading(false);
      reactToastifyNotification("error", error?.message);
    }
  };

  const updateNoteValue = (val: any) => {
    const title = val?.title;
    const id = val?._id;
    const body = val?.body;
    setUpdateNote(true);
    setNoteForm((pre) => ({ ...pre, title, body }));
    setUpdateNoteId(id);
    toggleNoteForm();
  };

  const handleButtonClick = () => {
    toggleNoteForm();
    setUpdateNote(false);
    setNoteForm((pre) => ({ ...pre, title: "", body: "" }));
  };

  return (
    <>
      <NoteHead
        showForm={showNoteForm}
        toggleNoteForm={toggleNoteForm}
        noteForm={noteForm}
        updateNoteForm={updateNoteForm}
        createOrUpdateNote={createOrUpdateNote}
        handleButtonClick={handleButtonClick}
      />
      <NoteBody
        data={allNotes}
        deleteItem={removeNote}
        updateItem={updateNoteValue}
        varient="notes"
        loading={loading}
      />
    </>
  );
};

export default NoteSection;
