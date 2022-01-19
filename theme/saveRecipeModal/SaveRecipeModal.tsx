import Modal from "react-modal";
import React from "react";
import styles from "./SaveRecipe.module.scss";
import { setToggleSaveRecipeModal } from "../../redux/slices/sideTraySlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

type SaveRecipeProps = {
  title?: string;
  handleChange?: () => void;
  modalOverlayStyle?: object;
  modalContentStyle?: object;
};

const SaveRecipe = ({
  title = "Favorite",
  handleChange = () => {},
  modalOverlayStyle = {},
  modalContentStyle = {},
}: SaveRecipeProps) => {
  const { openSaveRecipeModal } = useAppSelector((state) => state?.sideTray);
  const dispatch = useAppDispatch();
  return (
    <Modal
      isOpen={openSaveRecipeModal}
      onRequestClose={() => dispatch(setToggleSaveRecipeModal(false))}
      className={styles.content}
      overlayClassName={styles.overlay}
      shouldCloseOnOverlayClick={true}
      style={{
        overlay: {
          ...modalOverlayStyle,
        },
        content: {
          ...modalContentStyle,
          //   transform: openModal ? "translateY(0)" : "translateY(-100vh)",
        },
      }}
    >
      <div className={styles.saveRecipeModalContainer}>
        <div className={styles.modalBody}>
          <h3>
            Added to My <span> {title}</span>
          </h3>
          <a onClick={() => handleChange()}>Change</a>
        </div>
      </div>
    </Modal>
  );
};

export default SaveRecipe;
