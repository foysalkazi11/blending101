import { useEffect } from "react";
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
import { useRouter } from "next/router";

interface Props {
  blocks: BlockType[];
  scrollPoint?: string;
}
const RenderJsonToHtml = ({ blocks, scrollPoint = "" }: Props) => {
  const router = useRouter();
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

  useEffect(() => {
    let timer;
    if (scrollPoint) {
      const titleElement = document.getElementById(scrollPoint);

      titleElement?.scrollIntoView({ behavior: "smooth" });
      titleElement.style.backgroundColor = "#d2e7bc";

      timer = setTimeout(() => {
        titleElement.style.backgroundColor = "";
      }, 2500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [scrollPoint]);

  useEffect(() => {
    let timer;
    const onHashChanged = () => {
      if (window.location?.hash) {
        const scrollPoint = window.location?.hash?.slice(1);

        const titleElement = document.getElementById(scrollPoint);

        titleElement?.scrollIntoView({ behavior: "smooth" });
        titleElement.style.backgroundColor = "#d2e7bc";

        timer = setTimeout(() => {
          titleElement.style.backgroundColor = "";
        }, 2500);
      }
    };

    window.addEventListener("hashchange", onHashChanged);

    return () => {
      window.removeEventListener("hashchange", onHashChanged);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={s.bodyContainer}>
      {blocks?.map((block: BlockType) => renderHtml(block))}
    </div>
  );
};

export default RenderJsonToHtml;
