import React, { useMemo, useState } from "react";
import styles from "./showSuggestion.module.scss";
import InputComponent from "theme/input/input.component";
import fuzzySearch from "components/utility/fuzzySearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";
import useDebounce from "customHooks/useDebounce";
import useHideOnClickOutside from "hooks/useHideOnClickOutside";
type Option = { label: string; value: string; [key: string]: string };

type showSuggestionProps = React.ComponentPropsWithRef<"div"> & {
  list?: Option[];
  handleClickList?: (value: Option) => void;
  placeholder?: string;
  closeSuggestionBox?: () => void;
};
const ShowSuggestion = ({
  list = [],
  handleClickList = () => {},
  placeholder = "Search...",
  closeSuggestionBox = () => {},
  ref = null,
  ...rest
}: showSuggestionProps) => {
  const [input, setInput] = useState("");
  const inputDebounceValue = useDebounce(input, 300);
  const suggestionBoxRef = useHideOnClickOutside(closeSuggestionBox);

  const optionsList = useMemo(() => {
    let results: Option[] = [];
    list.filter((option) => {
      const selected = fuzzySearch(
        option?.value?.toLowerCase(),
        inputDebounceValue?.toLowerCase(),
      );
      if (selected !== "") results.push(option);
    });

    return results;
  }, [inputDebounceValue, list]);

  return (
    <div className={styles.suggestionBox} ref={suggestionBoxRef} {...rest}>
      <InputComponent
        inputWithIcon={true}
        type="text"
        name="searchList"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        icon={<FontAwesomeIcon icon={faMagnifyingGlass} size="sm" />}
        ref={ref}
      />
      <ul>
        {optionsList?.map((option, index) => (
          <li
            key={option.value + index}
            onClick={() => {
              handleClickList(option);
              closeSuggestionBox();
            }}
            dangerouslySetInnerHTML={{
              __html: option?.label?.replace(
                inputDebounceValue,
                `<b>${inputDebounceValue}</b>`,
              ),
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default ShowSuggestion;
