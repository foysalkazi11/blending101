import React from "react";
import { BlockType } from "../../../../../type/editorjsBlockType";
interface Props {
  block: BlockType;
}

const Delimiter = ({ block }: Props) => {
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

  return <hr {...props} />;
};

export default Delimiter;
