import HTMLReactParser from "html-react-parser";
import React, { FC } from "react";

import { BlockType } from "../../../../../type/editorjsBlockType";
interface Props {
  block: BlockType;
}

type Row = string[];
type Content = Row[];

const THead: FC<{
  row: Row;
}> = ({ row }) => (
  <thead>
    <tr>
      {row?.map((cell, i) => (
        <th key={`${i}`} scope="col">
          {HTMLReactParser(cell)}
        </th>
      ))}
    </tr>
  </thead>
);

const Tr: FC<{
  row: Row;
  withHeadings: boolean;
}> = ({ row, withHeadings }) => (
  <tr>
    {row.map((cell, i) =>
      i === 0 && withHeadings ? (
        <th key={i} scope="row">
          {HTMLReactParser(cell)}
        </th>
      ) : (
        <td key={i}>{HTMLReactParser(cell)}</td>
      ),
    )}
  </tr>
);

const Table = ({ block }: Props) => {
  const props: {
    [s: string]: any;
  } = {};
  const { data, id, tunes } = block;
  const align: any = tunes?.alignmentTuneTool?.alignment || "left";
  const anchor = tunes?.anchorTune?.anchor;
  const anchorId = anchor ? `#${anchor}` : id;
  props.id = id;
  if (anchor) {
    props["data-anchor"] = anchor;
  }
  const content = data?.withHeadings ? data?.content.slice(1) : data?.content;
  const header = data?.withHeadings ? data?.content[0] : data?.header;
  const withRowHeadings = !!data?.header;

  return (
    <table {...props} style={{ textAlign: align }}>
      <>
        {data?.caption && <caption>{HTMLReactParser(data.caption)}</caption>}
        {header && <THead row={header} />}
      </>
      <tbody>
        {content?.map((row, i) => (
          <Tr key={i} row={row} withHeadings={withRowHeadings} />
        ))}
      </tbody>
      {data?.footer && (
        <tfoot>
          <Tr row={data?.footer} withHeadings={withRowHeadings} />
        </tfoot>
      )}
    </table>
  );
};

export default Table;
