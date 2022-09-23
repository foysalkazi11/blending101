import HTMLReactParser from "html-react-parser";
import React from "react";
import s from "../index.module.scss";

import { BlockType } from "../../../../../type/editorjsBlockType";
import useBlock from "../useBlock";
interface Props {
  block: BlockType;
}

const Quote = ({ block }: Props) => {
  const { data, tunes } = block;
  const handleBlockData = useBlock();
  const alignment = tunes?.alignmentTuneTool?.alignment;
  const align: any = alignment || "left";
  return (
    <blockquote {...handleBlockData(block)} className={s.blockquote}>
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
