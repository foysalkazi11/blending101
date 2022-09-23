import HTMLReactParser from "html-react-parser";
import React, { FC } from "react";
import s from "../index.module.scss";

import { BlockType } from "../../../../../type/editorjsBlockType";
interface Props {
  block: BlockType;
}

export interface ListBlockData {
  style: "ordered" | "unordered";
  items: NestedListItem[];
  children?: React.ReactNode;
}

export type NestedListItem =
  | {
      content: string;
      items: NestedListItem[];
    }
  | string;

const Bullet: FC<{ children?: React.ReactNode }> = ({ children }) => (
  <li>{children}</li>
);

const Group: FC<{
  Tag: keyof JSX.IntrinsicElements;
  items: NestedListItem[];
  className?: string;
  align?: any;
}> = ({ Tag, items, className, align = "left", ...props }) => (
  <div className={className}>
    <Tag {...props} style={{ textAlign: align }}>
      {items.map((item, i) => (
        <Bullet key={i}>
          {typeof item === "string" ? (
            HTMLReactParser(item)
          ) : (
            <>
              {HTMLReactParser(item?.content)}
              {item?.items?.length > 0 && (
                <Group Tag={Tag} items={item.items} {...props} />
              )}
            </>
          )}
        </Bullet>
      ))}
    </Tag>
  </div>
);

const List = ({ block }: Props) => {
  const props: {
    [s: string]: any;
  } = {};
  const { data, id, tunes } = block;
  const align: any = tunes?.alignmentTuneTool?.alignment || "left";
  const anchor = tunes?.anchorTune?.anchor;
  const anchorId = anchor ? `#${anchor}` : id;
  props.id = id;
  props.align = align;
  if (anchor) {
    props["data-anchor"] = anchor;
  }
  const Tag = (
    data?.style === "ordered" ? `ol` : `ul`
  ) as keyof JSX.IntrinsicElements;
  return (
    data && (
      <Group
        Tag={Tag}
        className={s.list}
        items={data.items}
        align={align}
        {...props}
      />
    )
  );
};

export default List;
