import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setToggleSaveRecipeModal } from "../../../redux/slices/sideTraySlice";
import styles from "../customModal/CustomModal.module.scss";

type CustomModalProps = {
  children: React.ReactNode;
  overlayStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  open?: boolean;
  shouldCloseOnOverlayClick?: boolean;
};

const SaveToCollectionModal = ({
  children,
  contentStyle = {},
  overlayStyle = {},
  shouldCloseOnOverlayClick = true,
  open = false,
}: CustomModalProps) => {
  const { openSaveRecipeModal } = useAppSelector((state) => state?.sideTray);
  const dispatch = useAppDispatch();

  const handleOverlayClick = () => {
    if (shouldCloseOnOverlayClick) {
      dispatch(setToggleSaveRecipeModal(false));
    }
  };

  return (
    <div
      className={`${styles.overlay} ${
        openSaveRecipeModal ? styles.activeOverlay : ""
      }`}
      style={overlayStyle}
      onClick={handleOverlayClick}
    >
      <div
        className={`${styles.content} ${
          openSaveRecipeModal ? styles.activeContent : ""
        }`}
        style={contentStyle}
      >
        {children}
      </div>
    </div>
  );
};

export default SaveToCollectionModal;
