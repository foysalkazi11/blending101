import { useMutation } from "@apollo/client";
import { faMessageDots as faMessageDotsSolid } from "@fortawesome/pro-solid-svg-icons";
import { faMessageDots as faMessageDotsLight } from "@fortawesome/pro-light-svg-icons";
import { faEllipsisVertical } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import client from "../../../gqlLib/client";
import ADD_OR_REMOVE_TO_WIKI_COMPARE_LIST from "../../../gqlLib/wiki/mutation/addOrRemoveToWikiCompareList";
import GET_INGREDIENT_WIKI_LIST from "../../../gqlLib/wiki/query/getIngredientWikiList";
import GET_WIKI_COMPARE_LIST from "../../../gqlLib/wiki/query/getWikiCompareList";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setDbUser } from "../../../redux/slices/userSlice";
import {
  setIsOpenWikiCommentsTray,
  setWikiCommentsCurrentIngredient,
} from "../../../redux/slices/wikiSlice";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import { WikiListType, WikiType } from "../../../type/wikiListType";
import notification from "../../utility/reactToastifyNotification";
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
  type?: WikiType;
  research?: number;
  rxScore?: number;
  comments?: number;
  author?: string;
  portions?: PortionsType[];
  id?: string;
  hasInCompare?: boolean;
  setWikiList?: Dispatch<SetStateAction<WikiListType[]>>;
}

const WikiCard = ({
  style = {},
  comments = 0,
  description = "",
  image = "/images/imgbig4.png",
  research = 20,
  rxScore = 20,
  title = "",
  type = "Ingredient",
  author = "",
  portions = [],
  id = "",
  hasInCompare = false,
  setWikiList = () => {},
}: WikiCardProps) => {
  const [updateWikiItem, setUpdateWikiItem] = useState({
    ingredientId: null,
    isCompared: null,
  });
  const { dbUser } = useAppSelector((state) => state?.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isOpenWikiCommentsTray } = useAppSelector((state) => state?.wiki);
  const [addOrRemoveToWikiCompareList] = useMutation(
    ADD_OR_REMOVE_TO_WIKI_COMPARE_LIST,
    // {
    //   update(cache, { data }) {
    //     const wikiData = cache.readQuery({
    //       query: GET_WIKI_COMPARE_LIST,
    //       variables: { userId: dbUser?._id },
    //     });

    //     cache?.writeQuery({
    //       query: GET_WIKI_COMPARE_LIST,
    //       data: {
    //         getWikiCompareList: updateWikiItem?.isCompared ?
    //         [
    //           getWikiCompareList?.map(item => item?._id !== updateWikiItem?.ingredientId)
    //         ]  :  getWikiCompareList,

    //       },
    //     });
    //   },
    // },
  );

  // add Or Remove from WikiCompare List
  const handleAddOrRemoveToWikiCompareList = async (
    ingredientId: string,
    isCompared: boolean,
  ) => {
    //setUpdateWikiItem({ ingredientId, isCompared });
    try {
      await addOrRemoveToWikiCompareList({
        variables: { ingredientId, userId: dbUser?._id },
      });
      // const data = client?.readQuery({
      //   query: GET_WIKI_COMPARE_LIST,
      //   variables: { userId: dbUser?._id },
      // });
      // console.log(data);

      dispatch(
        setDbUser({
          ...dbUser,
          wikiCompareCount: isCompared
            ? dbUser?.wikiCompareCount - 1
            : dbUser?.wikiCompareCount + 1,
        }),
      );
      setWikiList((list) =>
        list?.map((item) =>
          item?._id === ingredientId
            ? { ...item, hasInCompare: isCompared ? false : true }
            : item,
        ),
      );
      notification(
        "info",
        `${isCompared ? "Remove form" : "Added"} compare list successfully`,
      );
    } catch (error) {
      notification("error", "Failed to added compare list");
    }
  };

  // click wiki item title
  const handleClickTitle = async (
    id: string,
    portions: PortionsType[],
    type: string,
  ) => {
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

  const openWikiCommentsTray = (
    e: React.SyntheticEvent,
    id: string,
    title: string,
    image: string,
  ) => {
    e?.stopPropagation;
    if (!isOpenWikiCommentsTray) {
      dispatch(setIsOpenWikiCommentsTray(true));
    }
    dispatch(
      setWikiCommentsCurrentIngredient({
        id,
        image,
        title,
        type,
      }),
    );
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
          {type === "Ingredient" ? (
            <div className={styles.icon}>
              <img
                src={
                  hasInCompare ? "/icons/compare-1.svg" : "/icons/eclipse.svg"
                }
                alt="icon"
                onClick={() =>
                  handleAddOrRemoveToWikiCompareList(
                    id,
                    hasInCompare ? true : false,
                  )
                }
              />
            </div>
          ) : null}

          <div
            className={styles.commentsIconBox}
            onClick={(e) =>
              openWikiCommentsTray(e, id, title, image || "/images/imgbig4.png")
            }
          >
            <FontAwesomeIcon
              icon={comments ? faMessageDotsSolid : faMessageDotsLight}
              className={`${comments ? styles.activeIcon : ""}`}
            />
            <p
              className={`${styles.text} ${comments ? styles.activeIcon : ""}`}
            >
              {comments}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WikiCard;
