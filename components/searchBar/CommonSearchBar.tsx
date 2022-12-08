import React, {
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  FormEvent,
  ReactNode,
  CSSProperties,
} from "react";
import styles from "./SearchBar.module.scss";
import { FiFilter } from "react-icons/fi";
import { BsMic, BsSoundwave, BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import useOnClickOutside from "../utility/useOnClickOutside";
import Tooltip from "../../theme/toolTip/CustomToolTip";

interface SearchBarProps {
  input?: string;
  setInput?: Dispatch<SetStateAction<string>>;
  //handleCleanSearch?: () => void;
  handleSearchTagCleanFunc?: () => void;
  openPanel?: () => void;
  handleSubmitFunc?: () => void;
  isSearchTag?: boolean;
  isOpenPanel?: boolean;
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface CompareButtonProps {
  icon?: string | ReactNode;
  text?: string | number;
  disable?: boolean;
  handleClick?: () => void;
  style?: CSSProperties;
}

const CommonSearchBar = ({
  input = "",
  setInput = () => {},
  //handleCleanSearch = () => {},
  handleSubmitFunc = () => {},
  handleSearchTagCleanFunc = () => {},
  openPanel = () => {},

  isOpenPanel = false,
  isSearchTag = false,
  handleOnChange = () => {},
}: SearchBarProps) => {
  const router = useRouter();
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useOnClickOutside(inputRef, () => {
    setIsSubmit(false);
    setIsInputFocus(false);
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input) {
      setIsSubmit(true);
      handleSubmitFunc();
    }
  };

  const handleClean = () => {
    setInput("");
    setIsSubmit(false);
    setIsInputFocus(false);
    // inputRef?.current?.focus();
  };

  const handleSearchTagClean = () => {
    handleSearchTagCleanFunc();
    setIsSubmit(false);
    setIsInputFocus(false);
  };

  return (
    <div className={styles.inputContainer} ref={inputRef}>
      <div
        className={styles.filterIconContainer}
        style={isOpenPanel ? { marginRight: "10px", paddingRight: "20px" } : {}}
      >
        {isOpenPanel ? null : (
          <FiFilter
            className={`${styles.filterIcon} ${
              isOpenPanel ? styles.active : ""
            }`}
            onClick={openPanel}
          />
        )}
      </div>
      <div className={styles.inputBox}>
        {isInputFocus ? null : isMicOn ? (
          <BsSoundwave className={styles.waveIcon} />
        ) : (
          <BsSearch className={styles.seachIcon} />
        )}
        <form onSubmit={handleSubmit}>
          <input
            style={isOpenPanel ? { width: "30vw", minWidth: "200px" } : {}}
            disabled={isMicOn}
            placeholder={isMicOn ? "Speak" : "Search"}
            value={input}
            onChange={(e) => handleOnChange(e)}
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
          <>
            {isSearchTag ? (
              <AiOutlineClose
                className={styles.seachIconActive}
                onClick={handleSearchTagClean}
              />
            ) : (
              <Tooltip direction="bottom" content="Voice search">
                <BsMic
                  className={`${styles.mic} ${isMicOn ? styles.active : ""}`}
                  onClick={() => setIsMicOn(!isMicOn)}
                />
              </Tooltip>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CommonSearchBar;
