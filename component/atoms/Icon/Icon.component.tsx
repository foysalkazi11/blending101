import React from "react";

interface IconProps {
  font?: string;
  size?: string | number;
  variant?: "bold" | "bolder" | "normal" | "lighter";
  style?: any;
  className?: string;
  source?: string;
}

const Icon: React.FC<IconProps> = (props) => {
  const { font, size, variant, style, className, source, children } = props;
  // if (children) return children;
  if (children) {
    return (
      <img
        src={`/icons/${children}.svg`}
        alt="icon"
        style={{
          width: typeof size === "number" ? `${size}px` : size,
          height: typeof size === "number" ? `${size}px` : size,
        }}
        className={className}
      />
    );
  }
  return (
    <i
      className={`${font}-icon ${className}`}
      style={{
        fontSize: size,
        fontWeight: variant,
        ...style,
      }}
    />
  );
};

Icon.defaultProps = {
  size: "100%",
  variant: "normal",
};

export default Icon;
