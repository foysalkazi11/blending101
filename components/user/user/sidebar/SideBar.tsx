/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect } from "react";
import styles from "./SideBar.module.scss";
import { AiOutlineCamera } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setIsNewUseImage } from "../../../../redux/slices/userSlice";
import { UserDataType } from "..";

type SideBarProps = {
  userData: UserDataType;
  setUserData: React.Dispatch<React.SetStateAction<UserDataType>>;
};

const SideBar = ({ userData, setUserData }: SideBarProps) => {
  const [disableTextarea, setDisableTextarea] = useState(true);
  const { isNewUseImage } = useAppSelector((state) => state?.user);
  const {
    bio,
    image,
    firstName,
    lastName,
    displayName,
    yourBlender,
    email,
    location,
  } = userData?.about;
  const dispatch = useAppDispatch();
  console.log(image);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.length) {
      dispatch(setIsNewUseImage([e?.target?.files[0]]));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;

    setUserData((pre) => {
      return {
        ...pre,
        about: {
          ...pre?.about,
          [name]: value,
        },
      };
    });
  };

  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      setDisableTextarea((pre) => !pre);
    }
  };

  const handleEdit = () => {
    setDisableTextarea((pre) => !pre);
  };

  useEffect(() => {
    if (!disableTextarea) {
      textareaRef.current.focus();
    }
  }, [disableTextarea]);

  return (
    <div className={styles.sideBarContainer}>
      <div className={styles.imageBox}>
        <img
          src={
            isNewUseImage?.length
              ? URL.createObjectURL(isNewUseImage[0])
              : image || "/images/user-placeholder.png"
          }
          alt="userImag"
          // fallbackSrc="/images/user-placeholder.png"
        />
        <div className={styles.cameraIconBox}>
          <AiOutlineCamera className={styles.cameraIcon} />
          <input type="file" accept="image/*" onChange={handleFile} />
        </div>
      </div>
      <h2 className={styles.name}>
        {firstName} {lastName}
      </h2>
      <p className={styles.email}>{email}</p>
      <p className={styles.text}>{yourBlender}</p>
      <div className={styles.aboutMe}>
        <div></div>
        <h4>About me</h4>
        <div className={styles.editBox} onClick={handleEdit}>
          <FiEdit2 className={styles.editIcon} />
        </div>
      </div>
      <div className={styles.textAreaBox}>
        <form onSubmit={handleSubmit}>
          <textarea
            ref={textareaRef}
            className={styles.textArea}
            name="bio"
            id=""
            cols={50}
            rows={5}
            value={bio}
            onChange={(e) => handleChange(e)}
            disabled={disableTextarea}
            // onKeyPress={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default SideBar;
