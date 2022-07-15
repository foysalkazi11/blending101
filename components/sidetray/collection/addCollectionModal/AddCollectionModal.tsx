/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./AddCollection.module.scss";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";
import CREATE_NEW_COLLECTION from "../../../../gqlLib/collection/mutation/createNewCollection";
import { useMutation } from "@apollo/client";
import EDIT_COLLECTION from "../../../../gqlLib/collection/mutation/editCollection";
import { useAppSelector } from "../../../../redux/hooks";
import CommentAndNoteButton from "../../../../theme/button/commentAndNoteButton/CommentAndNoteButton";

type AddCollectionModalProps = {
  input: any;
  setInput: any;
  isEditCollection: boolean;
  collectionId: string;
  getCollectionsAndThemes?: (arg: any) => void;
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
};

const AddCollectionModal = ({
  input,
  setInput,
  isEditCollection,
  collectionId,
  getCollectionsAndThemes = () => {},
  setOpenModal = () => {},
}: AddCollectionModalProps) => {
  const [createNewCollection] = useMutation(CREATE_NEW_COLLECTION);
  const [editCollection] = useMutation(EDIT_COLLECTION);
  const { dbUser } = useAppSelector((state) => state?.user);
  const [loading, setLoadings] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e?.target;
    if (type === "file") {
      setInput((pre) => ({ ...pre, image: e?.target?.files[0] }));
    } else {
      setInput((pre) => ({ ...pre, [name]: value }));
    }
  };

  const saveToDb = async () => {
    if (input?.name) {
      if (isEditCollection) {
        await editCollection({
          variables: {
            data: {
              userEmail: dbUser?.email,
              collectionId: collectionId,
              newName: input?.name,
            },
          },
        });
        getCollectionsAndThemes({ variables: { userId: dbUser?._id } });
        setOpenModal(false);
        setInput({ image: null, name: "" });
      } else {
        await createNewCollection({
          variables: {
            data: {
              userEmail: dbUser?.email,
              collection: { image: null, name: input?.name, recipes: [] },
            },
          },
        });
      }

      getCollectionsAndThemes({ variables: { userId: dbUser?._id } });
      setOpenModal(false);
      setInput({ image: null, name: "" });
      if (isEditCollection) {
        reactToastifyNotification("info", "Collection edit successfully");
      } else {
        reactToastifyNotification("info", "Collection add successfully");
      }
    } else {
      reactToastifyNotification("info", "Please write collection name");
    }
  };

  const uploadImage = async () => {
    await createNewCollection({
      variables: {
        data: {
          UserEmail: dbUser?.email,
          collection: {
            image: "",
            name: input?.name,
            recipes: [],
          },
        },
      },
    });
    setLoadings(false);
    setOpenModal(false);
    setInput({ image: null, name: "" });
    reactToastifyNotification("info", "Collection add successfully");
  };

  const submitData = async () => {
    setLoadings(true);
    try {
      if (input?.image) {
        if (input?.name) {
          uploadImage();
        } else {
          reactToastifyNotification("info", "Please write collection name");
        }
      } else {
        saveToDb();
      }
    } catch (error) {
      setLoadings(false);
      reactToastifyNotification("error", error?.message);
    }
  };

  return (
    <div className={styles.addCollectionContainer}>
      {/* <div className={styles.fileUpload}>
        <input type="file" accept="image/*" onChange={handleChange} />
        <img
          src={
            input?.image
              ? URL.createObjectURL(input?.image)
              : "/images/black-add.svg"
          }
          alt="addIcon"
          style={{
            objectFit: input?.image ? "cover" : "contain",
            width: input?.image ? "100px" : "36px",
            height: input?.image ? "100px" : "36px",
          }}
        />
      </div> */}
      <div className={styles.rightSide}>
        <input
          placeholder="Collection Name"
          value={input?.name}
          name="name"
          onChange={handleChange}
        />
        <div className={styles.buttonGroup}>
          <CommentAndNoteButton
            type="submitBtn"
            style={{ marginRight: "30px" }}
            handleClick={saveToDb}
            text={loading ? "Loading..." : "Submit"}
          />
          <CommentAndNoteButton
            type="cancleBtn"
            handleClick={() => setOpenModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddCollectionModal;
