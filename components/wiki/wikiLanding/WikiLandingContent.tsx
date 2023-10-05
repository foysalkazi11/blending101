import React from "react";
import styles from "./WikiLanding.module.scss";
import Carousel from "../../../theme/carousel/SlickSlider";
import { WikiListType, WikiType } from "../../../type/wikiListType";
import WikiCard from "../wikiCard/WikiCard";
import SkeletonWikiDiscovery from "../../../theme/skeletons/skeletonWikiDicovery/SkeletonWikiDiscovery";
import notification from "../../utility/reactToastifyNotification";
import ADD_OR_REMOVE_TO_WIKI_COMPARE_LIST from "../../../gqlLib/wiki/mutation/addOrRemoveToWikiCompareList";
import { useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setDbUser } from "../../../redux/slices/userSlice";
import useLocalStorage from "../../../customHooks/useLocalStorage";
import { WikiCompareList } from "../../../type/wikiCompareList";
import GET_INGREDIENT_WIKI_LIST from "../../../gqlLib/wiki/query/getIngredientWikiList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/pro-light-svg-icons";
import { useUser } from "../../../context/AuthProvider";
import { updateWikiCompareCount } from "redux/slices/wikiSlice";
const responsiveSetting = {
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,

  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1050,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

interface Props {
  title?: WikiType;
  image?: string;
  loading?: boolean;
  list?: WikiListType[];
  setShowAll?: (arg: WikiType) => void;
}

const WikiLandingContent = ({
  image = "",
  list = [],
  loading = false,
  title = "Ingredient",
  setShowAll = () => {},
}: Props) => {
  const [addOrRemoveToWikiCompareList] = useMutation(ADD_OR_REMOVE_TO_WIKI_COMPARE_LIST);
  const dispatch = useAppDispatch();
  const user = useUser();
  const wikiCompareCount = useAppSelector((state) => state?.wiki?.wikiCompareCount);
  const [wikiCompareList, setWikiCompareList] = useLocalStorage<WikiCompareList[]>("wikiCompareList", []);

  const setting = {
    ...responsiveSetting,
  };

  // find single wiki items
  const findCompareWikiEntity = (id: string) => {
    return wikiCompareList?.find((item) => item?._id === id);
  };

  // add Or Remove from WikiCompare List
  const handleAddOrRemoveToWikiCompareList = async (ingredientId: string, isCompared: boolean) => {
    try {
      await addOrRemoveToWikiCompareList({
        variables: { ingredientId, userId: user.id },
        update(cache) {
          const { getIngredientWikiList2 } = cache.readQuery<any>({
            query: GET_INGREDIENT_WIKI_LIST,
            variables: {
              userId: user.id,
              page: 1,
              limit: 12,
              ids: [],
            },
          });

          cache?.writeQuery({
            query: GET_INGREDIENT_WIKI_LIST,
            variables: {
              userId: user.id,
              page: 1,
              limit: 12,
              ids: [],
            },
            data: {
              getIngredientWikiList2: {
                ...getIngredientWikiList2,
                wikiList: getIngredientWikiList2?.wikiList?.map((item) =>
                  item?._id === ingredientId ? { ...item, hasInCompare: isCompared ? false : true } : item,
                ),
              },
            },
          });
        },
      });

      dispatch(updateWikiCompareCount(isCompared ? wikiCompareCount - 1 : wikiCompareCount + 1));

      const findCompareItem = findCompareWikiEntity(ingredientId);
      if (findCompareItem) {
        setWikiCompareList((state) => [...state.filter((item) => item?._id !== ingredientId)]);
      }

      notification("info", `${isCompared ? "Remove form" : "Added"} compare list successfully`);
    } catch (error) {
      notification("error", `Failed to ${isCompared ? "Remove form" : "Added"} compare list`);
    }
  };

  return (
    <div className={styles.main__slider}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>
          <FontAwesomeIcon icon={faStar} className={styles.icon} />
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.viewAll} onClick={() => setShowAll(title)}>
          View All
        </div>
      </div>

      {loading ? (
        <SkeletonWikiDiscovery />
      ) : (
        <Carousel moreSetting={setting}>
          {list?.map((wikiList) => {
            const {
              _id,

              commentsCount,
              description,
              hasInCompare,
              image,
              isPublished,
              portions,
              publishedBy,
              status,
              type,
              wikiDescription,
              wikiTitle,
            } = wikiList;
            return (
              <div key={_id} className={styles.wikiCardGap}>
                <WikiCard
                  author={publishedBy}
                  comments={commentsCount}
                  description={wikiDescription}
                  image={image}
                  title={wikiTitle}
                  type={type}
                  portions={portions}
                  id={_id}
                  hasInCompare={hasInCompare}
                  handleAddOrRemoveToWikiCompareList={handleAddOrRemoveToWikiCompareList}
                />
              </div>
            );
          })}
        </Carousel>
      )}
    </div>
  );
};
export default WikiLandingContent;
