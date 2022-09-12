import { BlockType } from "../../../../../type/editorjsBlockType";
import HTMLReactParser from "html-react-parser";

interface Props {
  block: BlockType;
}

const Paragraph = ({ block }: Props) => {
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
    <p {...props} style={{ textAlign: align }}>
      {data?.text && HTMLReactParser(data.text)}
    </p>
  );
};

export default Paragraph;
