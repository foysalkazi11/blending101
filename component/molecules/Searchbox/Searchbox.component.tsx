import { faSearch, faTimes } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { InputHTMLAttributes, ReactHTMLElement, useRef } from "react";
import IconButton from "../../atoms/Button/IconButton.component";
import styles from "./Searchbox.module.scss";

interface SearchboxProps
  extends React.DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLDivElement
  > {
  onReset: () => void;
}

const Searchbox = (props: SearchboxProps) => {
  const { value, onChange, onReset, ...inputProps } = props;
  const hasQuery = value !== "";
  return (
    <div className={styles.search}>
      <div className={styles["search-container"]} {...inputProps}>
        <input
          placeholder="Search"
          type="text"
          className={styles.input}
          value={value}
          onChange={onChange}
        />
        <button className={styles.button} onClick={hasQuery && onReset}>
          <FontAwesomeIcon icon={hasQuery ? faTimes : faSearch} />
        </button>
      </div>
    </div>
  );
};

// const Searchbox: React.FC = () => {
//   const searchBtn = useRef<HTMLButtonElement>(null);
//   const input = useRef<HTMLInputElement>(null);
//   const handleExpand = () => {
//     searchBtn?.current.classList.toggle(styles.close);
//     input?.current.classList.toggle(styles.square);
//   };
//   return (
//     <div className={styles.searchbox}>
//       <form className={styles.content}>
//         <input
//           ref={input}
//           type="text"
//           name="input"
//           className={styles.input}
//           id="search-input"
//         />
//         <button
//           ref={searchBtn}
//           type="reset"
//           className={styles.search}
//           id="search-btn"
//           onClick={handleExpand}
//         ></button>
//       </form>
//     </div>
//   );
// };
// const Searchbox = () => {
//   return (
//     <form
//       className={"search-container"}
//       action="//llamaswill.tumblr.com/search"
//     >
//       <input
//         id="search-box"
//         type="text"
//         className={styles["search-box"]}
//         name="q"
//       />
//       <label htmlFor="search-box">
//         <span className={styles["search-icon"]}>
//           <FontAwesomeIcon icon={faSearch} />
//         </span>
//         {/* <span className="glyphicon glyphicon-search search-icon"></span> */}
//       </label>
//       <input
//         type="submit"
//         id="search-submit"
//         className={styles["search-submit"]}
//       />
//     </form>
//   );
// };

export default Searchbox;
