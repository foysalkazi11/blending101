import React, { useRef, useState, useEffect } from "react";
import styles from "./SearchBar.module.scss";
import { BiSearch } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { BsMic, BsSoundwave, BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import RecipeDiscoverButton from "../../button/recipeDiscoverButton/RecipeDiscoverButton";
import AddCircleOutlineIcon from "../../../public/icons/add_circle_outline_black_36dp.svg";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setOpenFilterTray } from "../../../redux/slices/sideTraySlice";
import useOnClickOutside from "../../../components/utility/useOnClickOutside";

const SearchBar = () => {
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [input, setInput] = useState("");
  const [isMicOn, setIsMicOn] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { openFilterTray } = useAppSelector((state) => state?.sideTray);
  const dispatch = useAppDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      setIsSubmit(true);
    }
  };

  const handleClean = () => {
    setInput("");
    setIsSubmit(false);
    setIsInputFocus(false);
    // inputRef?.current?.focus();
  };
  useOnClickOutside(inputRef, handleClean);
  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.inputContainer} ref={inputRef}>
        <div className={styles.filterIconContainer}>
          <FiFilter
            className={`${styles.filterIcon}${
              openFilterTray ? styles.active : ""
            }`}
            onClick={() => dispatch(setOpenFilterTray(!openFilterTray))}
          />
        </div>
        <div className={styles.inputBox}>
          {isInputFocus ? null : isMicOn ? (
            <BsSoundwave className={styles.waveIcon} />
          ) : (
            <BsSearch className={styles.seachIcon} />
          )}
          <form onSubmit={handleSubmit}>
            <input
              disabled={isMicOn}
              placeholder={isMicOn ? "Speak" : "Search"}
              value={input}
              onChange={(e) => setInput(e?.target?.value)}
              onFocus={() => setIsInputFocus(true)}
              // onBlur={(e) => handleBlur(e)}
            />
          </form>

          {isSubmit ? (
            <AiOutlineClose
              className={styles.seachIconActive}
              onClick={handleClean}
            />
          ) : isInputFocus ? (
            <BsSearch
              className={`${styles.seachIconActive}`}
              onClick={(e) => {
                e.stopPropagation();
                if (input) {
                  setIsSubmit(true);
                }
              }}
            />
          ) : (
            <BsMic
              className={`${styles.mic} ${isMicOn ? styles.active : ""}`}
              onClick={() => setIsMicOn(!isMicOn)}
            />
          )}
        </div>
      </div>
      <div style={{ marginLeft: "40px" }}>
        <RecipeDiscoverButton
          image="/images/compare-fill-icon.svg"
          text="Compare(6)"
        />
      </div>
      <div style={{ marginLeft: "30px" }}>
        <RecipeDiscoverButton Icon={AddCircleOutlineIcon} text="Recipe" />
      </div>
    </div>
  );
};

export default SearchBar;
