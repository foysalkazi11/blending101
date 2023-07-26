import styles from "./SingleIngredient.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleXmark,
  faPenCircle,
} from "@fortawesome/pro-light-svg-icons";
import { faGripDotsVertical } from "@fortawesome/pro-solid-svg-icons";

interface SingleIngredient {
  label?: string;
  dargProps?: any;
  handleAdd?: () => void;
  handleClose?: () => void;
  handleEdit?: (id: string) => void;
  showPlusIcon?: boolean;
  showCloseIcon?: boolean;
  showEditIcon?: boolean;
  isErrorIngredient?: boolean;
  ingredientId?: string;
}

const SingleIngredient = ({
  dargProps = {},
  handleAdd = () => {},
  handleClose = () => {},
  showPlusIcon = true,
  label = "Label",
  showCloseIcon = false,
  isErrorIngredient = false,
  showEditIcon = false,
  handleEdit = () => {},
  ingredientId = "",
}: SingleIngredient) => {
  return (
    <div className={styles.singleIngredientContainer}>
      <div className={styles.leftSide}>
        <div {...dargProps}>
          <FontAwesomeIcon
            icon={faGripDotsVertical}
            className={styles.dargIcon}
          />
        </div>

        <p
          className={`${styles.text} ${
            isErrorIngredient && styles.errorIngredientText
          }`}
        >
          {label}
        </p>
      </div>
      <div className={styles.rightSide}>
        {showPlusIcon ? (
          <FontAwesomeIcon
            icon={faCirclePlus}
            className={`${styles.icon} ${styles.icon_active}`}
            onClick={handleAdd}
          />
        ) : null}
        {showEditIcon && !isErrorIngredient ? (
          <FontAwesomeIcon
            icon={faPenCircle}
            className={`${styles.icon} `}
            onClick={() => handleEdit(ingredientId)}
          />
        ) : null}
        {showCloseIcon ? (
          <FontAwesomeIcon
            icon={faCircleXmark}
            className={`${styles.icon} `}
            onClick={handleClose}
          />
        ) : null}
      </div>
    </div>
  );
};

export default SingleIngredient;
