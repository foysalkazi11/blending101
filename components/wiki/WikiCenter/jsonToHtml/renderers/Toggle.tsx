import { BlockType } from "../../../../../type/editorjsBlockType";
import HTMLReactParser from "html-react-parser";
import s from "../index.module.scss";
import useBlock from "../useBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/pro-regular-svg-icons";
import { useEffect, useState } from "react";
import JsonToHtml from "../JsonToHtml";

interface Props {
  block: BlockType;
  nestedBlocks?: BlockType[];
}

const Toggle = ({ block, nestedBlocks = [] }: Props) => {
  const { data, tunes } = block;
  const { text, status } = data;

  const handleBlockData = useBlock();
  const alignment = tunes?.alignmentTuneTool?.alignment;
  const align: any = alignment || "left";
  const [toggleNestedBlock, setToggleNestedBlock] = useState(false);

  useEffect(() => {
    setToggleNestedBlock(status === "open" ? true : false);
  }, []);

  return (
    <div className={s.toggle} {...handleBlockData(block)}>
      <div className={s.header}>
        {toggleNestedBlock ? (
          <FontAwesomeIcon
            icon={faCaretDown}
            onClick={() => setToggleNestedBlock((pre) => !pre)}
            className={s.icon}
          />
        ) : (
          <FontAwesomeIcon
            icon={faCaretRight}
            onClick={() => setToggleNestedBlock((pre) => !pre)}
            className={s.icon}
          />
        )}

        <p
          className={s.text}

          //   style={{ textAlign: align }}
        >
          {text && HTMLReactParser(text)}
        </p>
      </div>
      <div className={s.nestedContainer}>
        {toggleNestedBlock
          ? nestedBlocks?.map((block: BlockType) => JsonToHtml(block))
          : null}
      </div>
    </div>
  );
};

export default Toggle;
