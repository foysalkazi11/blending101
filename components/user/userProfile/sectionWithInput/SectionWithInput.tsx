import React, { useState } from "react";
import Container from "@mui/material/Container";
import styles from "./SectionWithInput.module.scss";
import InputComponent from "../../../../theme/input/input.component";

type SectionWithInputProps = {
  title: string;
  value: string;
  setValue: Function;
  fieldName: string;
  maxWidth: string;
  style?: object;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  fullWidth?: boolean;
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
}: SectionWithInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(fieldName, inputValue);
  };
  return (
    <Container>
      <div className={styles.sectionWithInputContainer}>
        <h2>{title}</h2>

        <div className={styles.inputContainer}>
          <form onSubmit={handleSubmit}>
            <InputComponent
              maxWidth={maxWidth}
              style={style}
              type={type}
              value={inputValue}
              setValue={setInputValue}
              placeholder={placeholder}
              textarea={textarea}
              fullWidth={fullWidth}
              fieldName={fieldName}
            />
          </form>
        </div>
      </div>
    </Container>
  );
};

export default SectionWithInput;
