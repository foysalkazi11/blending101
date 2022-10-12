import React, { forwardRef } from "react";
import { FootnotesDynamicContentType } from ".";
import s from "./index.module.scss";

const FootNotes = (props: FootnotesDynamicContentType) => {
  const {
    content,
    isOpen,
    position: { bottom, height, left, right, top, width, x, y },
  } = props;
  return (
    <>
      {isOpen ? (
        <div
          style={{
            position: "absolute",
            bottom: `${parseInt(top)}px`,
            left: `${(parseInt(left) + parseInt(right)) / 2}px`,
          }}
        >
          {content}
        </div>
      ) : null}
    </>
  );
};

export default FootNotes;
