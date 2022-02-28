import React, { useState } from "react";
import styles from "./CustomToolTip.module.scss";

type CustomToolTipProps = {
  content?: string;
};

const CustomToolTip = ({ content = "Tool tip" }: CustomToolTipProps) => {
  const [info, setInfo] = useState({
    visible: false,
    x: 0,
    y: 0,
    type: "none",
  });

  const visibility = info?.visible == true ? "on" : "off";
  const style = {
    left: info?.x + window.scrollX + "px",
    top: info?.y + window.scrollY + "px",
  };

  //   const pastShow = (hoverRect)=>
  //   {
  //     // position the tooltip after showing it
  //     let ttNode = ReactDOM.findDOMNode(this);

  //     if(ttNode != null)
  //     {
  //       let x = 0, y = 0;

  //       const docWidth = document.documentElement.clientWidth,
  //             docHeight = document.documentElement.clientHeight;

  //       let rx = hoverRect.x + hoverRect.width, // most right x
  //           lx = hoverRect.x, // most left x
  //           ty = hoverRect.y, // most top y
  //           by = hoverRect.y + hoverRect.height; // most bottom y

  //       // tool tip rectange
  //       let ttRect = ttNode.getBoundingClientRect();

  //       let bRight = (rx + ttRect.width) <= (window.scrollX + docWidth);
  //       let bLeft = (lx - ttRect.width) >= 0;

  //       let bAbove = (ty - ttRect.height) >= 0;
  //       let bBellow = (by + ttRect.height) <= (window.scrollY + docHeight);

  //       let newState = {};

  //       // the tooltip doesn't fit to the right
  //       if(bRight)
  //       {
  //         x = rx;

  //         y = ty + (hoverRect.height - ttRect.height);

  //         if(y < 0)
  //         {
  //           y = ty;
  //         }

  //         newState.type = "right";
  //       }
  //       else if(bBellow)
  //       {
  //         y = by;

  //         x = lx + (hoverRect.width - ttRect.width);

  //         if(x < 0)
  //         {
  //           x = lx;
  //         }

  //         newState.type = "bottom";
  //       }
  //       else if(bLeft)
  //       {
  //         x = lx - ttRect.width;

  //         y = ty + (hoverRect.height - ttRect.height);

  //         if(y < 0)
  //         {
  //           y = ty;
  //         }

  //         newState.type = "left";
  //       }
  //       else if(bAbove)
  //       {
  //         y = ty - ttRect.height;

  //         x = lx + (hoverRect.width - ttRect.width);

  //         if(x < 0)
  //         {
  //           x = lx;
  //         }

  //         newState.type = "top";
  //       }

  //       newState = {...newState, x:x, y:y};

  //       this.setState(newState);
  //     }
  //   }
  return (
    <div
      id="tooltip"
      className={`${visibility} ${styles[info?.type]}`}
      style={style}
    >
      <div className={styles.tooltip_arrow}></div>
      <div className={styles.tooltip_inner}>{content}</div>
    </div>
  );
};

export default CustomToolTip;
