import React from "react";

import { BlockType } from "../../../../../type/editorjsBlockType";
import useBlock from "../useBlock";
interface Props {
  block: BlockType;
}

const Embed = ({ block }: Props) => {
  const { data, tunes } = block;
  const handleBlockData = useBlock();
  const alignment = tunes?.alignmentTuneTool?.alignment;
  const align: any = alignment || "left";

  return <div>Embed</div>;
};

export default Embed;
