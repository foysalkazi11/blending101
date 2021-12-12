import React from "react";
import styles from "./toStoryCard.module.scss";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const ToStoryCard = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.content}>
        <h2>Cras sed augue a quam pretium molestie</h2>
        <p>
          Aliquam vestibulum nunc quis blandit rutrum. Curabitur vel scelerisque
          leo. Cras sed augue a quam pretium molestie.
        </p>
        <li>
          <span>
            <ArrowRightIcon />
          </span>{" "}
          Watch our Story
        </li>
      </div>
    </div>
  );
};

export default ToStoryCard;
