import React, { Fragment, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./Tooltip.module.scss";

interface ToolTipProps {
  children: React.ReactNode;
  content: string;
  delay?: number;
  direction?: "top" | "bottom" | "left" | "right" | "";
  bgColor?: "bgBlack" | "bgPrimary" | "bgSecondary";
  // style?: React.CSSProperties;
}

const Tooltip: React.FC<ToolTipProps> = (props) => {
  const { children, content, delay = 1500 } = props;

  const [active, setActive] = useState(false);
  const [coords, setCoords] = useState({
    left: 0,
    top: 0,
  });

  let Timeout;

  const showTip = (e) => {
    Timeout = setTimeout(() => {
      const TOOLTIP_HEIGHT = 26;
      const element: HTMLElement = e.target;
      const rect = element.getBoundingClientRect();
      setCoords({
        left: rect.x + rect.width / 2,
        top: rect.top - TOOLTIP_HEIGHT + window.scrollY,
      });
      setActive(true);
    }, delay);
  };

  const hideTip = () => {
    clearInterval(Timeout);
    setActive(false);
  };

  return (
    <div className={styles.Tooltip_Wrapper} onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}
      <Portal>
        {active && content !== "" && (
          <div className={`${styles.Tooltip_Tip}`} style={{ left: coords.left, top: coords.top }}>
            {content}
          </div>
        )}
      </Portal>
    </div>
  );
};

const Portal = ({ children }) => {
  const mount = document.getElementById("tooltip-portal");
  const el = document.createElement("div");

  //@ts-ignore
  useEffect(() => {
    mount.appendChild(el);
    return () => mount.removeChild(el);
  }, [el, mount]);

  return createPortal(children, el);
};
export default Tooltip;
