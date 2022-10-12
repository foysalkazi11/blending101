import { faHeartPulse } from "@fortawesome/pro-regular-svg-icons";
import { faBooks } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HTMLReactParser from "html-react-parser";
import React from "react";
import { BlockProps } from "..";
import s from "../index.module.scss";
import useBlock from "../useBlock";

const Header = ({
  block,
  addBlockPadding = true,
  showIcon = false,
}: BlockProps & { showIcon?: boolean }) => {
  const { data, tunes } = block;
  const handleBlockData = useBlock();
  const alignment = tunes?.alignmentTuneTool?.alignment;
  const align: any = alignment || "left";

  const Tag = `h${data?.level || 1}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={`${s[Tag]} ${addBlockPadding ? "" : s.noBlockPadding}`}
      {...handleBlockData(block)}
      style={{ textAlign: align }}
    >
      {showIcon && (
        <FontAwesomeIcon
          icon={faHeartPulse}
          color="#7dbd3b"
          style={{
            paddingRight: "10px",
            fontSize: "24px",
          }}
        />
      )}

      {data?.text && HTMLReactParser(data.text)}
    </Tag>
  );
};

export default Header;
