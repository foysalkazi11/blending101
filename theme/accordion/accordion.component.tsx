import React, { useEffect, useRef, useState } from "react";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./accordion.module.scss";

type CustomAccordionProps = {
  title: string;
  children: React.ReactNode;
  iconRight?: boolean;
  style?: React.CSSProperties;
};

const CustomAccordion = ({
  title,
  children,
  iconRight = false,
  style = {},
}: CustomAccordionProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(
    expanded ? undefined : 0,
  );

  // useEffect(() => {
  //   if (contentRef.current) {
  //     contentRef.current.style.maxHeight = expanded
  //       ? `${contentRef.current.scrollHeight}px`
  //       : "0px";
  //   }
  // }, [expanded, contentRef]);

  useEffect(() => {
    if (!height || !expanded || !contentRef.current) return undefined;
    // @ts-ignore
    const resizeObserver = new ResizeObserver((el) => {
      setHeight(el[0].contentRect.height);
    });
    resizeObserver.observe(contentRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [height, expanded]);

  useEffect(() => {
    if (expanded) setHeight(contentRef.current?.getBoundingClientRect().height);
    else setHeight(0);
  }, [expanded]);

  return (
    <div className={styles.accordion} style={style}>
      {iconRight ? (
        <div className={`${styles.accordionSummaryForRightIcon}`}>
          <div
            className={`${styles.iconRight} ${expanded ? styles.active : ""}`}
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            <h5 className={styles.title}>{title}</h5>

            <IoIosArrowForward className={styles.arrowIcon} />
          </div>
        </div>
      ) : (
        <div className={`${styles.accordionSummary}`}>
          {expanded ? (
            <FiMinusSquare
              className={styles.icon}
              onClick={() => {
                setExpanded(!expanded);
              }}
            />
          ) : (
            <FiPlusSquare
              className={styles.icon}
              onClick={() => {
                setExpanded(!expanded);
              }}
            />
          )}
          <h5 className={styles.title}>{title}</h5>
        </div>
      )}
      <div className={styles.contentParent} style={{ height }}>
        <div ref={contentRef as React.RefObject<HTMLDivElement>}>
          <div className={styles.accordianDetails}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomAccordion;
