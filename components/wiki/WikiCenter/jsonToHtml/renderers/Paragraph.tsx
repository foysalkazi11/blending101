import HTMLReactParser from "html-react-parser";
import s from "../index.module.scss";
import useBlock from "../useBlock";
import { BlockProps } from "..";
import ReadMore from "../../../../../helpers/readMore/ReadMore";

const Paragraph = ({ block, addBlockPadding }: BlockProps) => {
  const { data, tunes } = block;
  const handleBlockData = useBlock();
  const alignment = tunes?.alignmentTuneTool?.alignment;
  const align: any = alignment || "left";

  return (
    <ReadMore>
      <p
        className={`${s.paragraph} ${addBlockPadding ? "" : s.noBlockPadding}`}
        {...handleBlockData(block)}
        style={{ textAlign: align }}
      >
        {data?.text && HTMLReactParser(data.text)}
      </p>
    </ReadMore>
  );
};

export default Paragraph;
