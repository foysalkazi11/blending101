import React, { useRef } from "react";
import Btn from "../hoverButton/Btn";

const Coordinate = () => {
  const toolTip = useRef(null);

  const handleOnMouseOut = (evt) => {
    toolTip?.current?.hide();
  };
  const handleOnMouseOver = (evt) => {
    // get hovered element reference
    let el = evt.currentTarget;

    if (el != null) {
      let rect = el.getBoundingClientRect();

      toolTip.current.show(rect);
    }
  };

  const createBtn = (id: string, text: string) => {
    return (
      <Btn
        id={id}
        text={text}
        onMouseOut={handleOnMouseOut}
        onMouseOver={handleOnMouseOver}
      />
    );
  };
  return <div>Coordinate</div>;
};

export default Coordinate;
