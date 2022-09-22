import HTMLReactParser from "html-react-parser";
import React from "react";
import s from "../index.module.scss";

import { BlockType } from "../../../../../type/editorjsBlockType";
import useBlock from "../useBlock";
interface Props {
  block: BlockType;
}

const Image = ({ block }: Props) => {
  const { data, tunes } = block;
  const handleBlockData = useBlock();
  const alignment = tunes?.alignmentTuneTool?.alignment;
  const align: any = alignment || "left";
  return (
    <figure {...handleBlockData(block)} className={s.image}>
      {data?.file?.url && (
        <img
          src={data.file.url}
          alt={data.caption || data.file.name}
          style={{
            objectFit: data?.stretched ? "cover" : "contain",
            border: data?.withBorder ? "3px solid #7dbd3b" : "none",
          }}
        />
      )}
      {data?.url && <img src={data.url} alt={data.caption} />}
      {data?.caption && (
        <figcaption>{HTMLReactParser(data.caption)}</figcaption>
      )}
    </figure>
  );
};

export default Image;
