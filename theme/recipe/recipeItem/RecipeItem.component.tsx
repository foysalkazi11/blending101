/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styles from "./RecipeItem.module.scss";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface RecipeItemProps {
  item: object;
  plusIcon?: boolean;
  dragIcon?: boolean;
  deleteIcon?: boolean;
  handleClick?: (value: object) => void;
  handleDelete?: (id: number) => void;
}

const RecipeItem = (props: RecipeItemProps) => {
  const {
    item,
    plusIcon = true,
    dragIcon = true,
    deleteIcon = false,
    handleClick = () => {},
    handleDelete = () => {},
  } = props;
  const [items, setItems] = useState({});

  useEffect(() => {
    /* @ts-ignore */
    if (item?.label) {
      setItems(item);
    }
  }, []);

  return (
    <div className={styles.listContainer}>
      {/* @ts-ignore */}
      <p>{items?.label}</p>

      {/* <span className={styles.listContainer__tooltiptext}>
        Drag to the left
      </span> */}

      {dragIcon ? (
        <button className={styles.listContainer__draggableBtn}>
          {/* <DragIndicatorIcon /> */}
          <img src="/icons/noun_drag_3124730.svg" alt="dragIcon" />
        </button>
      ) : null}

      {plusIcon ? (
        <button
          className={styles.listContainer__addBtn}
          onClick={() => (handleClick ? handleClick(items) : null)}
        >
          <AddCircleOutlineIcon />
        </button>
      ) : null}

      {deleteIcon ? (
        <button
          className={styles.listContainer__addBtn}
          /* @ts-ignore */
          onClick={() => (handleDelete ? handleDelete(items?.id) : null)}
        >
          <HighlightOffIcon />
        </button>
      ) : null}
    </div>
  );
};

export default RecipeItem;
