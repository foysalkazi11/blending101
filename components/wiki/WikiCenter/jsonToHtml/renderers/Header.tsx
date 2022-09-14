import HTMLReactParser from "html-react-parser";
import React, { createElement } from "react";
import { BlockType } from "../../../../../type/editorjsBlockType";
import s from "../index.module.scss";

interface Props {
  block: BlockType;
}

const Header = ({ block }: Props) => {
  const { data, id, tunes } = block;
  const props: {
    [s: string]: any;
  } = {};

  const align: any = tunes?.alignmentTuneTool?.alignment || "left";
  const anchor = tunes?.anchorTune?.anchor;
  const anchorId = anchor ? `#${anchor}` : id;
  props.id = id;
  if (anchor) {
    props["data-anchor"] = anchor;
  }

  const Tag = `h${data?.level || 1}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={`${s.block} ${s[Tag]}`}
      {...props}
      style={{ textAlign: align }}
    >
      {data?.text && HTMLReactParser(data.text)}
    </Tag>
  );
};

export default Header;
