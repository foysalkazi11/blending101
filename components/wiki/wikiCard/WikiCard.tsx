import { faMessageDots } from "@fortawesome/pro-light-svg-icons";
import {
  faEllipsis,
  faEllipsisVertical,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useGetDefaultPortionOfnutration from "../../../customHooks/useGetDefaultPortionOfNutration";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import styles from "./WikiCard.module.scss";

interface PortionsType {
  default: boolean;
  measurement: string;
  meausermentWeight: string;
}

interface WikiCardProps {
  style?: React.CSSProperties;
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  research?: number;
  rxScore?: number;
  comments?: number;
  author?: string;
  portions?: PortionsType[];
  id?: string;
}

const WikiCard = ({
  style = {},
  comments = 0,
  description = "",
  image = "/images/imgbig4.png",
  research = 20,
  rxScore = 20,
  title = "",
  type = "",
  author = "",
  portions = [],
  id = "",
}: WikiCardProps) => {
  const [nutrientId, setNutrientId] = useState("");
  const router = useRouter();
  useGetDefaultPortionOfnutration(nutrientId);
  const handleClickTitle = async (
    id: string,
    portions: PortionsType[],
    type: string,
  ) => {
    console.log(id, portions, type);

    if (type === "Nutrient") {
      router?.push(`/wiki/${type}/${id}`);
    } else {
      const measurementWeight = portions?.find(
        (items) => items?.default,
      )?.meausermentWeight;

      if (measurementWeight) {
        router?.push(`/wiki/${type}/${id}/${measurementWeight}`);
      }
    }
  };
  return (
    <div className={styles.wikiCardContainer} style={style}>
      <header className={styles.header}>
        <p
          className={styles.title}
          onClick={() => handleClickTitle(id, portions, type)}
        >
          {title}
        </p>
        <IconWarper hover="bgSlightGray">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </IconWarper>
      </header>
      <body className={styles.body}>
        <div className={styles.bodyMain}>
          <div className={styles.imageWarper}>
            <img src={image || "/images/imgbig4.png"} alt="img" />
          </div>
          <div className={styles.infoWarper}>
            <div className={styles.category}>
              <p>{type}</p>
            </div>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
        <div className={styles.bodyFooter}>
          <p className={styles.text}>
            Research <span>{research}</span>{" "}
          </p>
          <p className={styles.text}>
            Rx Score <span>{rxScore}</span>{" "}
          </p>
        </div>
      </body>
      <div className={styles.footer}>
        <div className={styles.author}>
          <p className={styles.text}>{author}</p>
        </div>
        <div className={styles.iconBox}>
          <FontAwesomeIcon icon={faMessageDots} />
          <p className={styles.text}>{comments}</p>
        </div>
      </div>
    </div>
  );
};

export default WikiCard;
