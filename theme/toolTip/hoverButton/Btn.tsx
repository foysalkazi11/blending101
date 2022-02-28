import React from "react";

type BtnProps = {
  id?: string;
  text?: string;
  onMouseOver?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseOut?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Btn = ({
  text = "",
  id = "",
  onMouseOver = () => {},
  onMouseOut = () => {},
}: BtnProps) => {
  return (
    <button
      type="button"
      id={id}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {text}
    </button>
  );
};

export default Btn;
