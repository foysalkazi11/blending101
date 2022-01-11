/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import S3_CONFIG from "../../../../configs/s3";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setDbUser } from "../../../../redux/slices/userSlice";
import CancleBtn from "../../commentsTray/buttons/CancleBtn";
import SubmitBtn from "../../commentsTray/buttons/SubmitBtn";
import styles from "./AddCollection.module.scss";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";
import CREATE_NEW_COLLECTION from "../../../../gqlLib/collection/mutation/createNewCollection";
import { useMutation } from "@apollo/client";
import { setToggleModal } from "../../../../redux/slices/sideTraySlice";

const AddCollectionModal = () => {
  const [input, setInput] = useState<any>({
    image: null,
    name: "",
  });
  const [createNewCollection] = useMutation(CREATE_NEW_COLLECTION);
  const dispatch = useAppDispatch();
  const { dbUser } = useAppSelector((state) => state?.user);
  const [loading, setLoading] = useState(false);

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
      const res = await createNewCollection({
        variables: {
          data: {
            UserEmail: dbUser?.email,
            collection: { image: null, name: input?.name, recipes: [] },
          },
        },
      });

      dispatch(
        setDbUser({
          ...dbUser,
          collections: [...dbUser?.collections, res?.data?.createNewCollection],
        })
      );
      setLoading(false);
      dispatch(setToggleModal(false));
      setInput({ image: null, name: "" });

      reactToastifyNotification("info", "Collection add successfully");
    } else {
      setLoading(false);
      reactToastifyNotification("info", "Please write collection name");
    }
  };

  const uploadImage = async () => {
    fetch(S3_CONFIG.objectURL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Response Failed");
        }
      })
      .then((data) => {
        const { Key, uploadURL } = data;
        fetch(uploadURL, {
          method: "PUT",
          body: input?.image,
        }).then(async (response) => {
          if (response.ok) {
            const imageURL = `${S3_CONFIG.baseURL}/${Key}`;

            const res = await createNewCollection({
              variables: {
                data: {
                  UserEmail: dbUser?.email,
                  collection: {
                    image: imageURL,
                    name: input?.name,
                    recipes: [],
                  },
                },
              },
            });

            dispatch(
              setDbUser({
                ...dbUser,
                collections: [
                  ...dbUser?.collections,
                  res?.data?.createNewCollection,
                ],
              })
            );
            setLoading(false);
            dispatch(setToggleModal(false));
            setInput({ image: null, name: "" });

            reactToastifyNotification("info", "Collection add successfully");
          }
        });
      })
      .catch((error) => {
        setLoading(false);
        reactToastifyNotification("error", error?.message);
      });
  };

  const submitData = async () => {
    setLoading(true);
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
      setLoading(false);
      reactToastifyNotification("error", error?.message);
    }
  };

  return (
    <div className={styles.addCollectionContainer}>
      <div className={styles.fileUpload}>
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
      </div>
      <div className={styles.rightSide}>
        <input
          placeholder="Collection Name"
          value={input?.name}
          name="name"
          onChange={handleChange}
        />
        <div className={styles.buttonGroup}>
          <SubmitBtn
            style={{ backgroundColor: "#fe5d1f", marginRight: "30px" }}
            handleClick={submitData}
            text={loading ? "Loading..." : "Submit"}
          />
          <CancleBtn handleClick={() => dispatch(setToggleModal(false))} />
        </div>
      </div>
    </div>
  );
};

export default AddCollectionModal;
