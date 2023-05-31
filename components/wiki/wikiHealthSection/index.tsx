import React, { useState } from "react";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFerrisWheel, faList } from "@fortawesome/pro-light-svg-icons";
import WikiHealthPanel from "../wikiHealthPanel/WikiHealthPanel";

interface Props {
  checkActive: (id: string) => boolean;
  handleItemClick: (item: any, isExist: any) => void;
}

const WikiHealthSection = ({ checkActive, handleItemClick }: Props) => {
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
      {toggle === 0 && <WikiHealthPanel />}
    </>
  );
};

export default WikiHealthSection;
