import React from "react";
import { BlockType } from "../../../../../type/editorjsBlockType";
interface Props {
  block: BlockType;
}

const Code = ({ block }: Props) => {
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

  return <pre>{data?.code && <code {...props}>{`${data.code}`}</code>}</pre>;
};

export default Code;
