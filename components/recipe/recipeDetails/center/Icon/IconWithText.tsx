import Image from "next/image";
import React from "react";
import styles from "./IconWithText.module.scss";

interface IconWithTextProps {
  icon: string;
  text: string | number;
  handleClick: (e: React.SyntheticEvent) => void;
  textStyle?: React.CSSProperties;
  wraperStyle?: React.CSSProperties;
}

const IconWithText = ({
  handleClick,
  icon,
  text,
  textStyle = {},
  wraperStyle = {},
}: IconWithTextProps) => {
  return (
    <div
      onClick={handleClick}
      className={styles.iconWithTextContainer}
      style={wraperStyle}
    >
      <Image src={icon} alt={`${text} icon`} width={16} height={16} />
      <p className={styles.text} style={textStyle}>
        {text}
      </p>
    </div>
  );
};

export default IconWithText;
