import React, { useMemo, useState } from "react";
import styles from "./showSuggestion.module.scss";
import InputComponent from "theme/input/input.component";
import fuzzySearch from "components/utility/fuzzySearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";
type Option = { label: string; value: string };

type showSuggestionProps = React.ComponentPropsWithoutRef<"div"> & {
  list?: Option[];
  input?: string;
  handleClickList?: (value: Option) => void;
  placeholder?: string;
  closeSuggestionBox?: () => void;
};
const ShowSuggestion = ({
  list = [],
  handleClickList = () => {},
  placeholder = "Search...",
  closeSuggestionBox = () => {},
  ...rest
}: showSuggestionProps) => {
  const [input, setInput] = useState("");

  const optionsList = useMemo(() => {
    let results: Option[] = [];
    list.filter((option) => {
      const selected = fuzzySearch(option?.value, input.toLowerCase());
      if (selected !== "") results.push(option);
    });

    return results;
  }, [input, list]);

  return (
    <div className={styles.suggestionBox} {...rest}>
      <InputComponent
        inputWithIcon={true}
        type="text"
        name="searchList"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        icon={<FontAwesomeIcon icon={faMagnifyingGlass} size="sm" />}
      />
      <ul className="y-scroll">
        {optionsList?.map((option) => (
          <li
            key={option.value}
            onClick={() => {
              handleClickList(option);
              closeSuggestionBox();
            }}
            dangerouslySetInnerHTML={{
              __html: option?.label?.replace(input, `<b>${input}</b>`),
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default ShowSuggestion;
