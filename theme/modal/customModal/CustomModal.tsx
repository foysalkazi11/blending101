import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setToggleModal } from "../../../redux/slices/sideTraySlice";
import styles from "./CustomModal.module.scss";

type CustomModalProps = {
  children: React.ReactNode;
  overlayStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  shouldCloseOnOverlayClick?: boolean;
};

const CustomModal = ({
  children,
  contentStyle = {},
  overlayStyle = {},
  shouldCloseOnOverlayClick = true,
}: CustomModalProps) => {
  const { openModal } = useAppSelector((state) => state?.sideTray);
  const dispatch = useAppDispatch();

  const handleOverlayClick = () => {
    if (shouldCloseOnOverlayClick) {
      dispatch(setToggleModal(false));
    }
  };

  return (
    <div
      className={`${styles.overlay} ${openModal ? styles.activeOverlay : ""}`}
      style={overlayStyle}
      onClick={handleOverlayClick}
    >
      <div
        className={`${styles.content} ${openModal ? styles.activeContent : ""}`}
        style={contentStyle}
        onClick={(e) => e?.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
