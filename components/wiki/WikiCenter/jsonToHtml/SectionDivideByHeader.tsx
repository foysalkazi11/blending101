import React from "react";
import { SectionDivideByHeaderType } from ".";
import { BlockType } from "../../../../type/editorjsBlockType";
import s from "./index.module.scss";
import JsonToHtml from "./JsonToHtml";
import CollapseBlock from "./renderers/CollapseBlock";

interface Props {
  dividedBlocksByHeader: SectionDivideByHeaderType[];
}

const SectionDivideByHeader = ({ dividedBlocksByHeader }: Props) => {
  return (
    <>
      {dividedBlocksByHeader?.map(
        ({ content, header }: SectionDivideByHeaderType, index) => {
          return (
            <div key={index} className={s.sectionDivider}>
              {content && header ? (
                <>
                  {JsonToHtml(header, true, true)}
                  {content
                    ?.slice(0, 1)
                    ?.map((block: BlockType) => JsonToHtml(block))}
                  {content?.slice(1)?.length ? (
                    <CollapseBlock>
                      {content
                        ?.slice(1)
                        ?.map((block: BlockType) => JsonToHtml(block))}
                    </CollapseBlock>
                  ) : null}
                </>
              ) : (
                content?.map((block: BlockType) => JsonToHtml(block))
              )}
            </div>
          );
        },
      )}
    </>
  );
};

export default SectionDivideByHeader;
