import React, { useCallback, useEffect, useRef } from "react";
import styles from "./Menubar.module.scss";

interface MenubarProps {
  // Required when there are multiple menubar component
  id?: string;
  items: string[];
  className?: string;
  onChange: (selected: string) => void;
}

function MenubarComponent(props: MenubarProps) {
  const { id, items, className, onChange } = props;

  const lineRef = useRef<any>();

  const handleClick = (menu: string) => {
    moveLine(menu);
  };

  const moveLine = useCallback(
    (menu: string) => {
      const elId = "menubar__child" + menu + id;
      const elem = document.getElementById(elId);
      onChange && onChange(menu);

      if (!elem) return;
      const elemWidth = elem.offsetWidth + "px";
      const fromLeft = elem.offsetLeft + "px";

      if (!lineRef.current) return;
      const ref = lineRef.current;
      ref.style.width = elemWidth;
      ref.style.left = fromLeft;
    },
    [id, onChange],
  );

  useEffect(() => {
    moveLine(items[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.menu} ${className}`}>
      <div className={styles.menu__inner}>
        {items &&
          items?.map((child: any, i: number) => (
            <div
              className={styles.menu__child}
              key={"menubar" + child + i}
              onClick={() => handleClick(child)}
              id={"menubar__child" + child + id}
            >
              {child}
            </div>
          ))}
        <div className={styles.line} id="line__rep3" ref={lineRef}></div>
      </div>
    </div>
  );
}

export default MenubarComponent;

MenubarComponent.defaultProps = {
  items: ["All", "Wholefood", "Smoothie", "Refreshing", "Teas & Tonics"],
  id: "",
};
