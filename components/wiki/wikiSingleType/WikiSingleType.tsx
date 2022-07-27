import { useLazyQuery } from "@apollo/client";
import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router from "next/router";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdOutlineStarOutline } from "react-icons/md";
import Pagination from "../../../component/molecules/Pagination/ServerPagination.component";
import GET_INGREDIENT_WIKI_LIST from "../../../gqlLib/wiki/query/getIngredientWikiList";
import GET_NUTRIENT_WIKI_LIST from "../../../gqlLib/wiki/query/getNutrientWikiList";
import { useAppSelector } from "../../../redux/hooks";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import SkeletonCollectionRecipe from "../../../theme/skeletons/skeletonCollectionRecipe/SkeletonCollectionRecipe";
import { WikiListType, WikiType } from "../../../type/wikiListType";
import notification from "../../utility/reactToastifyNotification";
import WikiCard from "../wikiCard/WikiCard";
import styles from "./WikiSingleType.module.scss";
import { SelectedWikiType } from "..";

interface Props {
  type?: WikiType;
  selectedWikiItem?: SelectedWikiType;
  setSelectedWikiItem?: Dispatch<SetStateAction<SelectedWikiType>>;
}

const WikiSingleType = ({
  type = "Ingredient",
  selectedWikiItem = {} as SelectedWikiType,
  setSelectedWikiItem = () => {},
}: Props) => {
  const [wikiList, setWikiList] = useState<WikiListType[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [pageLength, setPageLength] = useState(12);
  const isMounted = useRef(null);
  const { dbUser } = useAppSelector((state) => state?.user);
  const [getIngredientList, { loading: ingredientListLoading }] = useLazyQuery(
    GET_INGREDIENT_WIKI_LIST,
  );
  const [getNutrientList, { loading: nutrientListLoading }] = useLazyQuery(
    GET_NUTRIENT_WIKI_LIST,
  );

  const handleClose = () => {
    if (selectedWikiItem[type].length) {
      setSelectedWikiItem((wikiItem) => ({ ...wikiItem, [type]: [] }));
    }
  };

  const fetchList = async (
    FetchFunc: any,
    page: number,
    ids: string[] = [],
  ) => {
    try {
      const { data } = await FetchFunc({
        variables: {
          userId: dbUser?._id,
          page,
          limit,
          ids,
        },
      });

      const res = data?.getNutrientWikiList || data?.getIngredientWikiList;
      setPageLength(res?.total);
      setWikiList(res?.wikiList);
    } catch (error) {
      notification("error", "Failed to fetch ingredient list");
    }
  };

  const selectOptions = (type: WikiType, page: number, ids: string[] = []) => {
    switch (type) {
      case "Ingredient":
        fetchList(getIngredientList, page, ids);
        break;
      case "Nutrient":
        fetchList(getNutrientList, page, ids);
        break;
      case "Health":
        setPage(1);
        setPageLength(0);
        setWikiList([]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (type && dbUser?._id) {
      selectOptions(type, 1, selectedWikiItem[type]);
      setPage(1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, dbUser?._id]);

  useEffect(() => {
    if (isMounted.current) {
      selectOptions(type, page, selectedWikiItem[type]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedWikiItem]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  if (ingredientListLoading || nutrientListLoading) {
    return (
      <>
        <div className={styles.showRecipeCollectionsContainer}>
          <SkeletonCollectionRecipe />
        </div>
        <div className={styles.paginationWarper}>
          <Pagination
            limit={limit}
            pageState={[page, setPage]}
            totalPage={Math?.ceil(pageLength / limit)}
            activeBgColor="primary"
          />
        </div>
      </>
    );
  }
  return (
    <>
      <div className={styles.showRecipeCollectionsContainer}>
        <div className={styles.showRecipeCollectionsHeader}>
          <div className={styles.heading}>
            <MdOutlineStarOutline className={styles.favoriteIcon} />
            <h2>{type}</h2>
          </div>

          <IconWarper
            defaultBg="secondary"
            hover="bgSecondary"
            style={{ width: "28px", height: "28px" }}
            handleClick={handleClose}
          >
            <FontAwesomeIcon icon={faXmark} />
          </IconWarper>
        </div>
        <div className={styles.showRecipes}>
          {wikiList?.length
            ? wikiList?.map((wiki, index) => {
                const {
                  _id,
                  category,
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
                } = wiki;
                return (
                  <WikiCard
                    key={_id}
                    author={publishedBy}
                    comments={commentsCount}
                    description={wikiDescription}
                    image={image}
                    title={wikiTitle}
                    type={type}
                    portions={portions}
                    id={_id}
                    hasInCompare={hasInCompare}
                    setWikiList={setWikiList}
                  />
                );
              })
            : null}
        </div>
      </div>
      <div className={styles.paginationWarper}>
        <Pagination
          limit={limit}
          pageState={[page, setPage]}
          totalPage={Math?.ceil(pageLength / limit)}
          activeBgColor="primary"
        />
      </div>
    </>
  );
};

export default WikiSingleType;
