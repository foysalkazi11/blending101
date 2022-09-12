import HTMLReactParser from "html-react-parser";
import React from "react";

import { BlockType } from "../../../../../type/editorjsBlockType";
interface Props {
  block: BlockType;
}

const Quote = ({ block }: Props) => {
  const props: {
    [s: string]: any;
  } = {};
  const { data, id, tunes } = block;
  const align: any = tunes?.alignmentTuneTool?.alignment || "left";
  const anchor = tunes?.anchorTune?.anchor;
  const anchorId = anchor ? `#${anchor}` : id;
  props.id = id;
  if (anchor) {
    props["data-anchor"] = anchor;
  }
  return (
    <blockquote {...props}>
      {data?.text &&
        data.text
          .split("\n\n")
          .map((paragraph, i) => (
            <p key={i}>
              {HTMLReactParser(
                paragraph
                  .split("\n")
                  .reduce((total, line) => [total, "<br />", line].join("")),
              )}
            </p>
          ))}
      {data?.caption && <footer>{HTMLReactParser(data.caption)}</footer>}
    </blockquote>
  );
};

export default Quote;
