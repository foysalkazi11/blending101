/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction } from "react";
import styles from "./AddCollection.module.scss";
import CommentAndNoteButton from "../../../../theme/button/commentAndNoteButton/CommentAndNoteButton";
import InputComponent from "../../../../theme/input/input.component";

type AddCollectionModalProps = {
  input: any;
  setInput: any;
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
  handleToAddOrUpdateCollection?: () => void;
  isAddOrUpdateCollectionLoading?: boolean;
};

const AddCollectionModal = ({
  input,
  setInput,
  setOpenModal = () => {},
  handleToAddOrUpdateCollection = () => {},
  isAddOrUpdateCollectionLoading = false,
}: AddCollectionModalProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e?.target;
    if (type === "file") {
      setInput((pre) => ({ ...pre, image: e?.target?.files[0] }));
    } else {
      setInput((pre) => ({ ...pre, [name]: value }));
    }
  };

  // const uploadImage = async () => {
  //   await createNewCollection({
  //     variables: {
  //       data: {
  //         UserEmail: dbUser?.email,
  //         collection: {
  //           image: "",
  //           name: input?.name,
  //           recipes: [],
  //         },
  //       },
  //     },
  //   });
  //   setLoadings(false);
  //   setOpenModal(false);
  //   setInput({ image: null, name: "" });
  //   notification("info", "Collection add successfully");
  // };

  // const submitData = async () => {
  //   setLoadings(true);
  //   try {
  //     if (input?.image) {
  //       if (input?.name) {
  //         uploadImage();
  //       } else {
  //         notification("info", "Please write collection name");
  //       }
  //     } else {
  //       handleToAddOrUpdateCollection();
  //     }
  //   } catch (error) {
  //     setLoadings(false);
  //     notification("error", error?.message);
  //   }
  // };

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
        <InputComponent
          borderSecondary={true}
          placeholder="Collection Name"
          value={input?.name}
          name="name"
          onChange={handleChange}
        />

        <div className={styles.buttonGroup}>
          <CommentAndNoteButton
            type="submitBtn"
            style={{ marginRight: "30px" }}
            handleClick={handleToAddOrUpdateCollection}
            text={isAddOrUpdateCollectionLoading ? "Loading..." : "Submit"}
          />
          <CommentAndNoteButton
            type="cancleBtn"
            handleClick={() => setOpenModal(false)}
            text="Cancel"
          />
        </div>
      </div>
    </div>
  );
};

export default AddCollectionModal;
