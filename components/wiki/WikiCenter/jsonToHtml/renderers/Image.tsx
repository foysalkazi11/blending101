import HTMLReactParser from "html-react-parser";
import React from "react";

import { BlockType } from "../../../../../type/editorjsBlockType";
interface Props {
  block: BlockType;
}

const Image = ({ block }: Props) => {
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
    <figure {...props}>
      {data?.file?.url && (
        <img src={data.file.url} alt={data.caption || data.file.name} />
      )}
      {data?.url && <img src={data.url} alt={data.caption} />}
      {data?.caption && (
        <figcaption>{HTMLReactParser(data.caption)}</figcaption>
      )}
    </figure>
  );
};

export default Image;
