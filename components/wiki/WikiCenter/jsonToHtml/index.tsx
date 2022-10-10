import { useEffect, useState } from "react";
import { BlockType } from "../../../../type/editorjsBlockType";
import s from "../wikiCenter.module.scss";
import JsonToHtml from "./JsonToHtml";

export interface BlockProps {
  block: BlockType;
  addBlockPadding?: boolean;
}

interface Props {
  blocks: BlockType[];
  scrollPoint?: string;
}
const RenderJsonToHtml = ({ blocks, scrollPoint = "" }: Props) => {
  const [normalizeBlocks, setNormalizeBlocks] = useState<BlockType[]>([]);
  console.log(blocks);

  const checkBlock = (
    block: BlockType,
    copyBlocks: BlockType[],
    index: number,
  ) => {
    const blockType = block.type;
    if (blockType === "toggle") {
      let spliceBlock: BlockType[] = copyBlocks.splice(
        index + 1,
        parseInt(block?.data?.items),
      );
      let newBlock = {
        ...block,
        nestedBlocks: loopBlock(spliceBlock),
      };
      return newBlock;
    } else {
      return block;
    }
  };

  const loopBlock = (copyBlocks: BlockType[]) => {
    let arr: BlockType[] = [];
    copyBlocks?.forEach((block, index) => {
      arr.push(checkBlock(block, copyBlocks, index));
    });
    return arr;
  };

  useEffect(() => {
    if (blocks?.length) {
      let copyBlocks: BlockType[] = [...blocks];
      let prepareBlock: BlockType[] = loopBlock(copyBlocks);
      setNormalizeBlocks(prepareBlock);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  useEffect(() => {
    let timer;
    if (scrollPoint) {
      const titleElement = document.getElementById(scrollPoint);
      if (titleElement) {
        titleElement?.scrollIntoView({ behavior: "smooth" });
        titleElement.style.backgroundColor = "#d2e7bc";

        timer = setTimeout(() => {
          titleElement.style.backgroundColor = "";
        }, 2500);
      }
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

        if (titleElement) {
          titleElement?.scrollIntoView({ behavior: "smooth" });
          titleElement.style.backgroundColor = "#d2e7bc";

          timer = setTimeout(() => {
            titleElement.style.backgroundColor = "";
          }, 2500);
        }
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
      {normalizeBlocks?.map((block: BlockType) => JsonToHtml(block))}
    </div>
  );
};

export default RenderJsonToHtml;
