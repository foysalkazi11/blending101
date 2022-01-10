/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setOpenCommentsTray } from "../../../redux/slices/sideTraySlice";
import styles from "./CommentsTray.module.scss";
import { MdPersonOutline } from "react-icons/md";
import CommentSection from "./CommentSection/CommentSection";
import NoteSection from "./noteSection/NoteSection";

export default function CommentsTray(props) {
  const [toggle, setToggle] = useState(1);
  const { openCommentsTray } = useAppSelector((state) => state?.sideTray);
  const dispatch = useAppDispatch();
  const { user, dbUser } = useAppSelector((state) => state?.user);

  const ref = useRef<any>();
  const reff = useRef<any>();

  useEffect(() => {
    const elem = ref.current;
    if (!elem) return;
    if (openCommentsTray) {
      elem.style.right = "0";
    } else {
      elem.style.right = "-335px";
    }
  }, [openCommentsTray]);

  const handleClick = () => {
    dispatch(setOpenCommentsTray(!openCommentsTray));
  };

  const handleToggle = (no: number) => {
    if (no === 1) {
      reff.current.style.left = "0";
    } else {
      reff.current.style.left = "50%";
    }
    setToggle(no);
  };

  return (
    <div className={`${styles.tray} y-scroll`} ref={ref}>
      {openCommentsTray ? (
        <div className={styles.imageTag} onClick={handleClick}>
          <img src="/images/cmnt-white.svg" alt="message-icon" />
        </div>
      ) : null}
      <div className={styles.main}>
        <div className={styles.main__top}>
          <div className={styles.main__top__menu}>
            <div className={styles.active} ref={reff}></div>
            <div
              className={
                toggle === 2
                  ? styles.main__top__menu__child + " " + styles.inActiveImg
                  : styles.main__top__menu__child + " " + styles.active__menu
              }
              onClick={() => handleToggle(1)}
            >
              <img src="/icons/comment.svg" alt="comment_icon" /> Comments
            </div>
            <div
              className={
                toggle === 1
                  ? styles.main__top__menu__child + " " + styles.inActiveImg
                  : styles.main__top__menu__child + " " + styles.active__menu
              }
              onClick={() => handleToggle(2)}
            >
              <img src="/images/noun_note_3378544.svg" alt="note_icon" /> Notes
            </div>
          </div>
        </div>
      </div>
      <div className={styles.recipeName}>
        <img src="/cards/juice.png" alt="recipe_img" />
        <h3>Triple Berry Smoothie</h3>
      </div>
      {toggle === 1 ? <CommentSection /> : <NoteSection />}
    </div>
  );
}
