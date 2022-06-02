import React from 'react';
import styles from './Icon.module.scss';

interface IconProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  handleClick?: () => void;
}

const IconWraper = ({
  children,
  style = {},
  handleClick = () => {},
}: IconProps) => {
  return (
    <div className={styles.iconContainer} style={style} onClick={handleClick}>
      {children}
    </div>
  );
};

export default IconWraper;
