import { useEffect, useRef, useState } from "react";
import { BlockType, FootnotesType } from "../../../../type/editorjsBlockType";
import s from "./index.module.scss";
import FootNotes from "./FootNotes";
import JsonToHtml from "./JsonToHtml";

export interface BlockProps {
  block: BlockType;
  addBlockPadding?: boolean;
}

interface FootnotesDynamicStyleType {
  top: string;
  bottom: string;
  left: string;
  right: string;
  height: string;
  width: string;
  x: string;
  y: string;
}

export interface FootnotesDynamicContentType {
  isOpen: boolean;
  content: string;
  position: FootnotesDynamicStyleType;
}

interface SectionDivideByHeaderType {
  header: BlockType;
  content: BlockType[];
}

interface Props {
  blocks: BlockType[];
  scrollPoint?: string;
}

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

const checkFootnotes = (copyBlocks: BlockType[]) => {
  let arr: FootnotesType[] = [];
  copyBlocks?.forEach((block) => {
    if (block?.tunes?.footnotes?.length) {
      const footnotes = block?.tunes?.footnotes;
      arr = [...arr, ...footnotes];
    }
  });
  return arr;
};

const sectionDivideByHeader = (
  blocks: BlockType[],
): SectionDivideByHeaderType[] => {
  let arr = [];
  let obj: { [key: string]: any } = {};
  blocks?.forEach((block, index) => {
    const { type } = block;
    if (type === "header") {
      if (arr.length) {
        arr.push(obj);
        obj = {};
        obj.header = block;
        obj.content = [];
      } else {
        if (obj.header || obj.content) {
          arr.push(obj);
          obj = {};
          obj.header = block;
          obj.content = [];
        } else {
          obj.header = block;
          obj.content = [];
        }
      }
    } else {
      if (obj.content) {
        obj.content.push(block);
      } else {
        obj.content = [];
        obj.content?.push(block);
      }

      if (blocks?.length === index + 1) {
        arr.push(obj);
      }
    }
  });
  return arr;
};

const RenderJsonToHtml = ({ blocks, scrollPoint = "" }: Props) => {
  const [normalizeBlocks, setNormalizeBlocks] = useState<BlockType[]>([]);
  const [dividedBlocksByHeader, setDividedBlocksByHeader] = useState<
    SectionDivideByHeaderType[]
  >([]);
  const [allFootNotes, setAllFootNotes] = useState<FootnotesType[]>([]);
  const [footnotesDynamicContent, setFootnotesDynamicContent] =
    useState<FootnotesDynamicContentType>({
      isOpen: false,
      content: "",
      position: {
        top: "",
        bottom: "",
        left: "",
        right: "",
        height: "",
        width: "",
        x: "",
        y: "",
      },
    });

  const footnotesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (blocks?.length) {
      const copyBlocks: BlockType[] = [...blocks];
      const prepareBlock: BlockType[] = loopBlock(copyBlocks);
      const footnotes: FootnotesType[] = checkFootnotes(copyBlocks);
      const divideByHeader: SectionDivideByHeaderType[] =
        sectionDivideByHeader(prepareBlock);

      setDividedBlocksByHeader(divideByHeader);
      // setNormalizeBlocks(prepareBlock);
      setAllFootNotes(footnotes);
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

  // click wiki blog specific element.
  const handleClickWikiBlog = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e?.target;

    //  @ts-ignore
    const datasetTune = target?.dataset?.tune;
    //  @ts-ignore
    const datasetId = target?.dataset?.id;
    if (target && datasetTune && datasetId) {
      const targetFootnote = allFootNotes?.find(
        (footnote) => footnote?.id === datasetId,
      );
      //  @ts-ignore
      const rect: FootnotesDynamicStyleType = target.getBoundingClientRect();

      let obj: FootnotesDynamicStyleType = {} as FootnotesDynamicStyleType;
      for (const key in rect) {
        if (key !== "toJSON") {
          obj[key] = `${rect[key]?.toFixed()}`;
        }
      }

      setFootnotesDynamicContent((prev) => ({
        ...prev,
        isOpen: true,
        content: targetFootnote?.content,
        position: {
          ...prev?.position,
          ...obj,
        },
      }));
    }
  };

  return (
    <div onClick={handleClickWikiBlog}>
      {dividedBlocksByHeader?.map(
        ({ content, header }: SectionDivideByHeaderType, index) => {
          return (
            <div key={index} className={s.sectionDivider}>
              {header && JsonToHtml(header)}
              {content?.map((block: BlockType) => JsonToHtml(block))}
            </div>
          );
        },
      )}
      {/* {normalizeBlocks?.map((block: BlockType) => JsonToHtml(block))} */}
      {/* <FootNotes {...footnotesDynamicContent} /> */}
    </div>
  );
};

export default RenderJsonToHtml;
