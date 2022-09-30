import React from "react";
import { BlockType } from "../../../../type/editorjsBlockType";
import Header from "./renderers/Header";
import Paragraph from "./renderers/Paragraph";
import Embed from "./renderers/Embed";
import Table from "./renderers/Table";
import List from "./renderers/List";
import Code from "./renderers/Code";
import ImageBlock from "./renderers/Image";
import Raw from "./renderers/Raw";
import Quote from "./renderers/Quote";
import Toggle from "./renderers/Toggle";

const JsonToHtml = (block: BlockType) => {
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
    case "toggle":
      return <Toggle block={block} nestedBlocks={block?.nestedBlocks} />;

    default:
      return null;
  }
};

export default JsonToHtml;
