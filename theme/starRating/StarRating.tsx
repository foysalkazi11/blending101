import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./StarRating.module.scss";

type StarRatingProps = {
  rating?: number;
  setRating?: Dispatch<SetStateAction<number>>;
};

const StarRating = ({ rating = 0, setRating = () => {} }: StarRatingProps) => {
  const [hover, setHover] = useState(0);

  useEffect(() => {
    setHover(rating);
  }, [rating]);
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={`${styles.button} ${
              index <= (hover || rating) ? styles.on : styles.off
            }`}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className={styles.star}>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
