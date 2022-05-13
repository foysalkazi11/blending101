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
import { useRouter } from "next/router";
import Tooltip from "../../toolTip/CustomToolTip";

const SearchBar = () => {
  const router = useRouter();
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [input, setInput] = useState("");
  const [isMicOn, setIsMicOn] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { openFilterTray } = useAppSelector((state) => state?.sideTray);
  const { dbUser } = useAppSelector((state) => state?.user);
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
        <div
          className={styles.filterIconContainer}
          style={openFilterTray ? { marginRight: "10px", paddingRight: "20px" } : {}}
        >
          <Tooltip content="Filter" direction="bottom">
            <FiFilter
              className={`${styles.filterIcon} ${
                openFilterTray ? styles.active : ""
              }`}
              onClick={() => dispatch(setOpenFilterTray(!openFilterTray))}
            />
          </Tooltip>
        </div>
        <div className={styles.inputBox}>
          {isInputFocus ? null : isMicOn ? (
            <BsSoundwave className={styles.waveIcon} />
          ) : (
            <BsSearch className={styles.seachIcon} />
          )}
          <form onSubmit={handleSubmit}>
            <input
              style={openFilterTray ? { width: "30vw" ,minWidth:"200px"} : {}}
              disabled={isMicOn}
              placeholder={isMicOn ? "Speak" : "Search"}
              value={input}
              onChange={(e) => setInput(e?.target?.value)}
              onFocus={() => setIsInputFocus(true)}
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
            <Tooltip direction="bottom" content="Voice search">
              <BsMic
                className={`${styles.mic} ${isMicOn ? styles.active : ""}`}
                onClick={() => setIsMicOn(!isMicOn)}
              />
            </Tooltip>
          )}
        </div>
      </div>
      <div style={{ marginLeft: "40px" }} className={styles.buttonContainer}>
        <Tooltip content="Compare recipe" direction="bottom">
          <RecipeDiscoverButton
            image={
              dbUser?.compareLength
                ? "/images/compare-fill-icon.svg"
                : "/icons/eclipse.svg"
            }
            text={`Compare(${dbUser?.compareLength ? dbUser?.compareLength : 0})`}
            disable={dbUser?.compareLength ? false : true}
            style={{
              backgroundColor: dbUser?.compareLength ? "inherit" : "#ececec",
            }}
            handleClick={() => router.push(`/recipe/compare`)}
          />
        </Tooltip>
      </div>

      <div style={{ marginLeft: "30px" }} className={styles.buttonContainer}>
        <Tooltip content="Add recipe" direction="bottom">
          <RecipeDiscoverButton
            Icon={AddCircleOutlineIcon}
            text="Recipe"
            handleClick={() => router.push(`/add_recipe`)}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default SearchBar;
