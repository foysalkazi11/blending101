import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "fill";
}

const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, variant, onClick, ...others } = props;
  return (
    <button className={`${styles.button} ${styles[variant]} ${className}`} onClick={onClick} {...others}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  variant: "outline",
};

export default Button;
