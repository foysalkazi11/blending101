import React, { useState } from "react";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFerrisWheel, faList } from "@fortawesome/pro-light-svg-icons";
import WikiNutritionPanel from "../wikiNutritionPanel/WikiNutritionPanel";
import WikiThemeContainer from "../wikiTheme/wikiThemContainer";
import generateDummyArray from "../../../helperFunc/array/generateDummyArray";

interface Props {
  checkActive: (id: string) => boolean;
  handleItemClick: (item: any, isExist: any) => void;
}

const WikiNutrientSection = ({ checkActive, handleItemClick }: Props) => {
  const [toggle, setToggle] = useState(0);

  return (
    <>
      <ToggleMenu
        setToggle={setToggle}
        toggle={toggle}
        toggleMenuList={[
          <div key={"key0"} className="d-flex ai-center">
            <FontAwesomeIcon icon={faList} style={{ marginRight: "5px" }} />
            <p>List</p>
          </div>,
          <div key={"key1"} className="d-flex ai-center">
            <FontAwesomeIcon
              icon={faFerrisWheel}
              style={{ marginRight: "5px" }}
            />
            <p>Themes</p>
          </div>,
        ]}
        variant={"outlineSecondary"}
      />
      {toggle === 0 && (
        <WikiNutritionPanel
          checkActiveNutrition={checkActive}
          handleNutritionClick={handleItemClick}
          showHeader={false}
        />
      )}
      {toggle === 1 && (
        <WikiThemeContainer
          data={generateDummyArray(10, {
            title: "Apple",
            image: "/images/img1.png",
          })}
        />
      )}
    </>
  );
};

export default WikiNutrientSection;
