import { BlockType } from "../../../../../type/editorjsBlockType";
import HTMLReactParser from "html-react-parser";
import s from "../index.module.scss";
import useBlock from "../useBlock";

interface Props {
  block: BlockType;
}

const Paragraph = ({ block }: Props) => {
  const { data, tunes } = block;
  const handleBlockData = useBlock();
  const alignment = tunes?.alignmentTuneTool?.alignment;
  const align: any = alignment || "left";

  return (
    <p
      className={s.paragraph}
      {...handleBlockData(block)}
      style={{ textAlign: align }}
    >
      {data?.text && HTMLReactParser(data.text)}
    </p>
  );
};

export default Paragraph;
