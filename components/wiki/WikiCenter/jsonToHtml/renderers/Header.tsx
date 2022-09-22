import HTMLReactParser from "html-react-parser";
import React, { createElement } from "react";
import { BlockType } from "../../../../../type/editorjsBlockType";
import s from "../index.module.scss";
import useBlock from "../useBlock";

interface Props {
  block: BlockType;
}

const Header = ({ block }: Props) => {
  const { data, tunes } = block;
  const handleBlockData = useBlock();
  const alignment = tunes?.alignmentTuneTool?.alignment;
  const align: any = alignment || "left";

  const Tag = `h${data?.level || 1}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={`${s.block} ${s[Tag]}`}
      {...handleBlockData(block)}
      style={{ textAlign: align }}
    >
      {data?.text && HTMLReactParser(data.text)}
    </Tag>
  );
};

export default Header;
