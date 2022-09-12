import HTMLReactParser from "html-react-parser";
import React, { FC } from "react";

import { BlockType } from "../../../../../type/editorjsBlockType";
interface Props {
  block: BlockType;
}

export interface ListBlockData {
  style: "ordered" | "unordered";
  items: NestedListItem[];
}

export type NestedListItem =
  | {
      content: string;
      items: NestedListItem[];
    }
  | string;

const Bullet: FC = ({ children }) => <li>{children}</li>;

const Group: FC<{
  Tag: keyof JSX.IntrinsicElements;
  items: NestedListItem[];
  className?: string;
  align?: any;
}> = ({ Tag, items, align = "left", ...props }) => (
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
    data && <Group Tag={Tag} items={data.items} align={align} {...props} />
  );
};

export default List;
