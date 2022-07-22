import { useLazyQuery, useMutation } from "@apollo/client";
import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdOutlineStarOutline } from "react-icons/md";
import { Type } from "..";
import Pagination from "../../../component/molecules/Pagination/ServerPagination.component";
import GET_INGREDIENT_WIKI_LIST from "../../../gqlLib/wiki/query/getIngredientWikiList";
import GET_NUTRIENT_WIKI_LIST from "../../../gqlLib/wiki/query/getNutrientWikiList";
import { useAppSelector } from "../../../redux/hooks";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import SkeletonCollectionRecipe from "../../../theme/skeletons/skeletonCollectionRecipe/SkeletonCollectionRecipe";
import { WikiListType } from "../../../type/wikiListType";
import notification from "../../utility/reactToastifyNotification";
import WikiCard from "../wikiCard/WikiCard";
import styles from "./WikiSingleType.module.scss";

interface Props {
  type?: Type;
  selectedWikiItem?: string[];
  setSelectedWikiItem?: Dispatch<SetStateAction<string[]>>;
}

const WikiSingleType = ({
  type = "Ingredient",
  selectedWikiItem = [],
  setSelectedWikiItem = () => {},
}: Props) => {
  const [wikiList, setWikiList] = useState<WikiListType[]>([]);
  const [wikiListMain, setWikiListMain] = useState<WikiListType[]>([]);
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

  const fetchList = async (FetchFunc: any, page: number) => {
    try {
      const { data } = await FetchFunc({
        variables: {
          userId: dbUser?._id,
          page,
          limit,
        },
      });

      const res = data?.getNutrientWikiList || data?.getIngredientWikiList;
      setPageLength(res?.total);
      setWikiList(res?.wikiList);
      setWikiListMain(res?.wikiList);
    } catch (error) {
      notification("error", "Failed to fetch ingredient list");
    }
  };

  const selectOptions = (type: Type, page: number) => {
    switch (type) {
      case "Ingredient":
        fetchList(getIngredientList, page);
        break;
      case "Nutrient":
        fetchList(getNutrientList, page);
        break;
      case "Health":
        setPage(1);
        setPageLength(12);
        setWikiList([]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (type) {
      selectOptions(type, 1);
      setPage(1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (isMounted.current) {
      selectOptions(type, page);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (isMounted.current) {
      if (selectedWikiItem?.length) {
        setWikiList(
          wikiListMain?.filter((item) => selectedWikiItem?.includes(item?._id)),
        );
      } else {
        setWikiList(wikiListMain);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWikiItem]);

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
          >
            <FontAwesomeIcon icon={faXmark} />
          </IconWarper>
        </div>
        <div className={styles.showRecipes}>
          {wikiList?.length
            ? wikiList.slice(0, 20)?.map((wiki, index) => {
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
