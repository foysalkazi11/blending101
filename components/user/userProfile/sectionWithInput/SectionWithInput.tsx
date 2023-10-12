import React, { useRef, useState } from "react";
import styles from "./SectionWithInput.module.scss";
import InputComponent from "../../../../theme/input/input.component";
import CancelIcon from "../../../../public/icons/cancel_black_36dp.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/pro-light-svg-icons";
import ShowSuggestion from "theme/showSuggestion";
type Option = {
  label: string;
  value: string;
  [key: string]: string;
};

type SectionWithInputProps = {
  title: string;
  value: any;
  setValue: (name: string, value: any) => void;
  fieldName: string;
  maxWidth: string;
  style?: React.CSSProperties;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  fullWidth?: boolean;
  removeInput: (name: string, value: any) => void;
  headingStyle?: React.CSSProperties;
  withSuggestions?: boolean;
  suggestions?: {
    label: string;
    value: string;
  }[];
  border?: "borderPrimary" | "borderSecondary";
};

const SectionWithInput = ({
  title,
  value,
  setValue,
  fieldName,
  maxWidth,
  style = {},
  type = "text",
  placeholder = "Add you text here",
  textarea = false,
  fullWidth = false,
  removeInput,
  headingStyle = {},
  suggestions = [],
  withSuggestions = false,
  border = "borderPrimary",
}: SectionWithInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestionsBox, setShowSuggestionsBox] = useState(false);
  const focusRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(fieldName, inputValue);
    setInputValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e?.target;
    setInputValue(value);
  };
  return (
    <div className={styles.sectionWithInputContainer}>
      <h2 style={headingStyle}>{title}</h2>

      <div className={styles.inputContainer}>
        <form onSubmit={handleSubmit}>
          {withSuggestions ? (
            <div style={{ position: "relative" }}>
              <div className={styles.inputContainer}>
                <InputComponent
                  inputWithIcon={true}
                  style={{ ...style, maxWidth, width: "100%" }}
                  type={type}
                  value={inputValue}
                  placeholder={placeholder}
                  name={fieldName}
                  handleChange={handleChange}
                  icon={<FontAwesomeIcon icon={faAngleDown} size="sm" />}
                  readOnly
                  onClick={() => {
                    setShowSuggestionsBox(!showSuggestionsBox);
                    if (showSuggestionsBox && focusRef?.current) {
                      focusRef?.current?.focus();
                    }
                  }}
                  border={border}
                />
              </div>

              <ShowSuggestion
                list={suggestions}
                handleClickList={(list: Option) => setValue(fieldName, list?.value)}
                style={{ display: showSuggestionsBox ? "block" : "none" }}
                placeholder={`Search ${placeholder}`}
                closeSuggestionBox={() => setShowSuggestionsBox(false)}
                ref={focusRef}
                border={border}
              />
            </div>
          ) : (
            <InputComponent
              style={{ ...style, maxWidth, width: "100%" }}
              type={type}
              value={inputValue}
              placeholder={placeholder}
              name={fieldName}
              handleChange={handleChange}
            />
          )}
        </form>
        <div className={styles.inputContainer__inputValueContainer}>
          {value?.map((item, index) => {
            return (
              <div key={index} className={styles.inputContainer__inputValueContainer__inputValue}>
                <span className={styles.inputContainer__inputValueContainer__inputValue__label}>{item}</span>
                <CancelIcon
                  className={styles.inputContainer__inputValueContainer__inputValue__closeIcon}
                  onClick={() => removeInput(fieldName, item)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectionWithInput;
