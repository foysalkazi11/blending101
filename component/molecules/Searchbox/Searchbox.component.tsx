import { faSearch, faTimes } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { InputHTMLAttributes } from "react";
import styles from "./Searchbox.module.scss";

interface SearchboxProps extends React.DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLDivElement> {
  parentRef: { current: HTMLDivElement };
  onReset: () => void;
}

const Searchbox = (props: SearchboxProps) => {
  const { parentRef, value, onChange, onReset } = props;
  const hasQuery = value !== "";

  // Handling the category combobox, When the search is focused/hovered it should be hidden or vice-versa
  const handleShow = () => {
    if (!parentRef) return;
    parentRef?.current.classList.add(styles["blendType--show"]);
    parentRef?.current.classList.remove(styles["blendType--hide"]);
  };

  const handleHide = () => {
    parentRef?.current.classList.remove(styles["blendType--show"]);
    parentRef?.current.classList.add(styles["blendType--hide"]);
  };

  const handleReset = () => {
    document.body.focus();
  };

  return (
    <div className={styles.search}>
      <div
        className={styles["search-container"]}
        onFocus={handleHide}
        onMouseEnter={handleHide}
        onMouseLeave={handleShow}
        onBlur={handleShow}
      >
        <input placeholder="Search" type="text" className={styles.input} value={value} onChange={onChange} />
        <button
          className={styles.button}
          onClick={() => {
            hasQuery && onReset();
            handleReset();
            handleHide();
          }}
        >
          <FontAwesomeIcon icon={hasQuery ? faTimes : faSearch} />
        </button>
      </div>
    </div>
  );
};

export default Searchbox;
