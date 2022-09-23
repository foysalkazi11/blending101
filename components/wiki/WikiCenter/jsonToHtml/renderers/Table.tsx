import HTMLReactParser from "html-react-parser";
import React, { FC } from "react";

import { BlockType } from "../../../../../type/editorjsBlockType";
import useBlock from "../useBlock";
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
  const { data, tunes } = block;
  const handleBlockData = useBlock();
  const alignment = tunes?.alignmentTuneTool?.alignment;
  const align: any = alignment || "left";
  const content = data?.withHeadings ? data?.content.slice(1) : data?.content;
  const header = data?.withHeadings ? data?.content[0] : data?.header;
  const withRowHeadings = !!data?.header;

  return (
    <table {...handleBlockData(block)} style={{ textAlign: align }}>
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
