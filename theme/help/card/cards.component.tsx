import { display } from "@mui/system";
import React, { useState } from "react";
import styles from "./cards.module.scss";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const Cards = () => {
  const [isReadMore, setIsReadMore] = useState(0);
  const toggleReadMore = (index) => {
    setIsReadMore(index);
  };

  const CardData = [
    {
      Title: "Title 1",
      Content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
    },
    {
      Title: "Title 1",
      Content: "asjklfja askdfja;skf asfak ashgag aksfj ",
    },
    {
      Title: "Title 1",
      Content: "asjklfja askdfja;skf asfak ashgag aksfj ",
    },
    {
      Title: "Title 1",
      Content: "asjklfja askdfja;skf asfak ashgag aksfj ",
    },
    {
      Title: "Title 1",
      Content: "asjklfja askdfja;skf asfak ashgag aksfj ",
    },
  ];
  return (
    <ul className={styles.card}>
      {CardData.map(({ Title, Content }, index: number) => {
        return (
          <div
            className={styles.cardDiv}
            key={index}
            onClick={() => toggleReadMore(index)}
          >
            <h5>
              {Title}
              {isReadMore == index ? (
                <AddCircleOutlineIcon />
              ) : (
                <RemoveCircleOutlineIcon />
              )}
            </h5>
            {isReadMore === index ? (
              <div style={{ display: "block" }}>{Content}</div>
            ) : (
              <div style={{ display: "none" }} />
            )}
          </div>
        );
      })}
    </ul>
  );
};

export default Cards;
