import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { CSSProperties } from "react";
import Icon from "../Icon/Icon.component";
import styles from "./IconButton.module.scss";

interface IconButtonProps {
  variant?: "fade" | "white" | "primary" | "secondary" | "disabled";
  size?: "small" | "medium" | "large";
  fontName?: IconDefinition;
  font?: string;
  title?: string;
  value?: string;
  fullWidth?: boolean;
  width?: number;
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  let {
    variant,
    size,
    style,
    font,
    fontName,
    title,
    value,
    fullWidth,
    width,
    className,
    onClick,
    disabled,
    children,
  } = props;

  let variantClass: string;
  switch (variant) {
    case "fade":
      variantClass = styles["btn-icon-fade"];
      break;
    case "white":
      variantClass = styles["btn-icon-white"];
      break;
    case "primary":
      variantClass = styles["btn-icon-primary"];
      break;
    case "secondary":
      variantClass = styles["btn-icon-secondary"];
      break;
    case "disabled":
      variantClass = styles["btn-icon-disabled"];
      break;
    default:
      variantClass = "";
      break;
  }
  let sizeClass: string;
  switch (size) {
    case "small":
      sizeClass = styles["btn-icon-small"];
      break;
    case "medium":
      sizeClass = styles["btn-icon-medium"];
      break;
    default:
      sizeClass = "";
      break;
  }

  return (
    <button
      type="button"
      title={title}
      className={`${variantClass} ${sizeClass} ${className}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children ? (
        children
      ) : fontName ? (
        <FontAwesomeIcon icon={fontName} />
      ) : (
        <Icon font={font} />
      )}
    </button>
  );
};

IconButton.defaultProps = {
  className: "",
  variant: "fade",
  size: "medium",
};

export default IconButton;
