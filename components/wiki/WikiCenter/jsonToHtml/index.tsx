import { BlockType } from "../../../../type/editorjsBlockType";
import Header from "./renderers/Header";
import Paragraph from "./renderers/Paragraph";
import s from "../wikiCenter.module.scss";
import Embed from "./renderers/Embed";
import Table from "./renderers/Table";
import List from "./renderers/List";
import Code from "./renderers/Code";
import ImageBlock from "./renderers/Image";
import Raw from "./renderers/Raw";
import Quote from "./renderers/Quote";

interface Props {
  blocks: BlockType[];
}
const RenderJsonToHtml = ({ blocks }: Props) => {
  const renderHtml = (block: BlockType) => {
    const { type } = block;

    switch (type) {
      case "header":
        return <Header block={block} />;
      case "paragraph":
        return <Paragraph block={block} />;
      case "embed":
        return <Embed block={block} />;
      case "table":
        return <Table block={block} />;
      case "list":
        return <List block={block} />;
      case "code":
        return <Code block={block} />;
      case "image":
        return <ImageBlock block={block} />;
      case "raw":
        return <Raw block={block} />;
      case "quote":
        return <Quote block={block} />;

      default:
        return null;
    }
  };

  return (
    <div className={s.bodyContainer}>
      {blocks?.map((block: BlockType) => renderHtml(block))}
    </div>
  );
};

export default RenderJsonToHtml;
