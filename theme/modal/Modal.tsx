import React from "react";
import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setToggleModal } from "../../redux/slices/sideTraySlice";
import styles from "./Modal.module.scss";

type CustomModalProps = {
  children: React.ReactNode;
  overlayStyle?: object;
  contentStyle?: object;
};

const CustomModal = ({
  children,
  contentStyle = {},
  overlayStyle = {},
}: CustomModalProps) => {
  const { openModal } = useAppSelector((state) => state?.sideTray);
  const dispatch = useAppDispatch();
  return (
    <Modal
      isOpen={openModal}
      onRequestClose={() => dispatch(setToggleModal(false))}
      className={styles.content}
      overlayClassName={styles.overlay}
      shouldCloseOnOverlayClick={true}
      style={{
        overlay: {
          ...overlayStyle,
        },
        content: {
          ...contentStyle,
          //   transform: openModal ? "translateY(0)" : "translateY(-100vh)",
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
