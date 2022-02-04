/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./AboutUser.module.scss";
import { BiSearch } from "react-icons/bi";
// import { BsCaretDown } from "react-icons/bs";
import ButtonComponent from "../../../../theme/button/button.component";
import { useMutation } from "@apollo/client";
import EDIT_USER_BY_ID from "../../../../gqlLib/user/mutations/editUserById";
import {
  setDbUser,
  setIsNewUseImage,
} from "../../../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setLoading } from "../../../../redux/slices/utilitySlice";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";
import S3_CONFIG from "../../../../configs/s3";

type AboutProps = {
  userData: any;
  setUserData: any;
};

const About = ({ userData, setUserData }: AboutProps) => {
  const { firstName, lastName, displayName, yourBlender, email, location } =
    userData?.about;
  const dispatch = useAppDispatch();
  const { dbUser } = useAppSelector((state) => state?.user);
  const [editUserById] = useMutation(EDIT_USER_BY_ID);
  const { isNewUseImage } = useAppSelector((state) => state?.user);

  const saveToDb = async () => {
    await editUserById({
      variables: {
        data: {
          editId: dbUser._id,
          editableObject: { ...userData?.about },
        },
      },
    });

    dispatch(
      setDbUser({
        ...dbUser,
        ...userData?.about,
      })
    );
    dispatch(setLoading(false));
    if (isNewUseImage) {
      dispatch(setIsNewUseImage(null));
    }
    reactToastifyNotification("info", "your profile updated successfully");
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
          body: isNewUseImage,
        }).then(async (response) => {
          if (response.ok) {
            const imageURL = `${S3_CONFIG.baseURL}/${Key}`;

            setUserData((pre) => {
              return {
                ...pre,
                about: {
                  ...pre.about,
                  image: imageURL,
                },
              };
            });
            await editUserById({
              variables: {
                data: {
                  editId: dbUser._id,
                  editableObject: { ...userData?.about, image: imageURL },
                },
              },
            });

            dispatch(
              setDbUser({
                ...dbUser,
                ...userData?.about,
                image: imageURL,
              })
            );
            dispatch(setLoading(false));

            dispatch(setIsNewUseImage(null));

            reactToastifyNotification(
              "info",
              "your profile updated successfully"
            );
          }
        });
      })
      .catch((error) => {
        dispatch(setLoading(false));
        reactToastifyNotification("error", error?.message);
      });
  };

  const submitData = async () => {
    dispatch(setLoading(true));
    try {
      if (isNewUseImage) {
        uploadImage();
      } else {
        saveToDb();
      }
    } catch (error) {
      dispatch(setLoading(false));
      reactToastifyNotification("error", error?.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setUserData((pre) => {
      return {
        ...pre,
        about: {
          ...pre.about,
          [name]: value,
        },
      };
    });
  };

  return (
    <div>
      <div className={styles.Container}>
        <div className={styles.Container__item}>
          <div className={styles.inputContainer}>
            <label>First name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.Container__item}>
          <div className={styles.inputContainer}>
            <label>Last name</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.Container__item}>
          <div className={styles.inputContainer}>
            <label>Display name</label>
            <input
              type="text"
              name="displayName"
              value={displayName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.Container__item}>
          <div className={styles.inputContainer}>
            <label>Your Blender</label>
            <div className={styles.searchInput}>
              <input
                type="text"
                name="yourBlender"
                value={yourBlender}
                onChange={handleChange}
              />
              <BiSearch className={styles.searchIcon} />
            </div>
          </div>
        </div>

        <div className={styles.Container__item}>
          <div className={styles.inputContainer}>
            <label>Email*</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              disabled
            />
          </div>
        </div>

        <div className={styles.Container__item}>
          <div className={styles.inputContainer}>
            <label>Location</label>
            <div className={styles.selectBox}>
              <img src="/images/us.png" alt="flag" />
              <select
                value={location || "all"}
                name="location"
                onChange={handleChange}
              >
                <option value="all">
                  (GMT-8:00) Pacific Time (US & Canada)
                </option>
                <option value="leafy">(GMT-09:00) Alaska</option>
                <option value="berry"> (GMT-06:00) Central America</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <ButtonComponent
          type="primary"
          value="Update Profile"
          style={{
            borderRadius: "30px",
            height: "48px",
            width: "180px",
          }}
          onClick={submitData}
        />
      </div>
    </div>
  );
};

export default About;
