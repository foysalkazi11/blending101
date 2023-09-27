import { useLazyQuery, useMutation } from "@apollo/client";
import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Pagination from "../../../component/molecules/Pagination/ServerPagination.component";
import GET_INGREDIENT_WIKI_LIST from "../../../gqlLib/wiki/query/getIngredientWikiList";
import GET_NUTRIENT_WIKI_LIST from "../../../gqlLib/wiki/query/getNutrientWikiList";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import SkeletonCollectionRecipe from "../../../theme/skeletons/skeletonCollectionRecipe/SkeletonCollectionRecipe";
import { WikiListType, WikiType } from "../../../type/wikiListType";
import notification from "../../utility/reactToastifyNotification";
import WikiCard from "../wikiCard/WikiCard";
import styles from "./WikiSingleType.module.scss";
import { SelectedWikiType, SelectedWikiTypeProps } from "..";
import ADD_OR_REMOVE_TO_WIKI_COMPARE_LIST from "../../../gqlLib/wiki/mutation/addOrRemoveToWikiCompareList";
import { setDbUser } from "../../../redux/slices/userSlice";
import useLocalStorage from "../../../customHooks/useLocalStorage";
import { WikiCompareList } from "../../../type/wikiCompareList";
import PanelHeader from "../../recipe/share/panelHeader/PanelHeader";
import { faInfoCircle } from "@fortawesome/pro-light-svg-icons";
import { useUser } from "../../../context/AuthProvider";
import ErrorPage from "components/pages/404Page";
import useIntersectionObserver from "customHooks/useIntersectionObserver";
import { useIsMounted } from "customHooks/useIsMounted";

const rootMargin = "100px";

interface Props {
  // type?: WikiType;
  // selectedWikiItem?: SelectedWikiType;
  // setSelectedWikiItem?: Dispatch<SetStateAction<SelectedWikiType>>;
  // setType?: Dispatch<SetStateAction<WikiType>>;

  wikiList?: WikiListType[];
  setWikiList?: React.Dispatch<React.SetStateAction<WikiListType[]>>;
  loading?: boolean;
  handleCloseFilterOrSearchResult?: () => void;
  title?: string;
  hasMore?: boolean;
  nextPage?: () => void;
}

const WikiSingleType = ({
  // type = "Ingredient",
  // setType = () => {},
  // selectedWikiItem = {} as SelectedWikiType,
  // setSelectedWikiItem = () => {},
  wikiList = [],
  setWikiList = () => {},
  loading = false,
  handleCloseFilterOrSearchResult = () => {},
  title = "",
  hasMore = false,
  nextPage = () => {},
}: Props) => {
  //  const [wikiList, setWikiList] = useState<WikiListType[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [pageLength, setPageLength] = useState(12);
  const isMounted = useIsMounted();
  const dispatch = useAppDispatch();
  const user = useUser();
  const { dbUser } = useAppSelector((state) => state?.user);
  const [wikiCompareList, setWikiCompareList] = useLocalStorage<WikiCompareList[]>("wikiCompareList", []);

  const [getIngredientList, { loading: ingredientListLoading }] = useLazyQuery(GET_INGREDIENT_WIKI_LIST, {
    fetchPolicy: "cache-and-network",
  });
  const [getNutrientList, { loading: nutrientListLoading }] = useLazyQuery(GET_NUTRIENT_WIKI_LIST, {
    fetchPolicy: "cache-and-network",
  });
  const [addOrRemoveToWikiCompareList] = useMutation(ADD_OR_REMOVE_TO_WIKI_COMPARE_LIST);
  const observer = useRef<any>();
  const entry = useIntersectionObserver(observer, { rootMargin });

  // fetch next page
  useEffect(() => {
    if (!entry) return;
    if (entry.isIntersecting && hasMore) {
      nextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry]);

  // find single wiki items
  const findCompareWikiEntity = (id: string) => {
    return wikiCompareList?.find((item) => item?._id === id);
  };

  const handleClose = () => {
    // SetSelectedWikiType({ category: "", selectedItems: [], wikiType: "",searchTerm:"" });
    // if (selectedWikiItem[type]) {
    //   setSelectedWikiItem((wikiItem) => ({ ...wikiItem, [type]: "" }));
    // } else {
    //   setType("");
    // }
  };

  // const fetchList = async (FetchFunc: any, page: number) => {
  //   try {
  //     const { data } = await FetchFunc({
  //       variables: {
  //         userId: user.id,
  //         page,
  //         limit,
  //         ids: [],
  //       },
  //     });

  //     const res = data?.getNutrientWikiList2 || data?.getIngredientWikiList2;
  //     setPageLength(res?.total);
  //     setWikiList(res?.wikiList);
  //   } catch (error) {
  //     notification("error", "Failed to fetch ingredient list");
  //   }
  // };

  // const selectOptions = (type: WikiType, page: number) => {
  //   switch (type) {
  //     case "Ingredient":
  //       fetchList(getIngredientList, page);
  //       break;
  //     case "Nutrient":
  //       fetchList(getNutrientList, page);
  //       break;
  //     case "Health":
  //       setPage(1);
  //       setPageLength(0);
  //       setWikiList([]);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // add Or Remove from WikiCompare List
  const handleAddOrRemoveToWikiCompareList = async (ingredientId: string, isCompared: boolean) => {
    try {
      await addOrRemoveToWikiCompareList({
        variables: { ingredientId, userId: user.id },
      });

      dispatch(
        setDbUser({
          ...dbUser,
          wikiCompareCount: isCompared ? dbUser?.wikiCompareCount - 1 : dbUser?.wikiCompareCount + 1,
        }),
      );
      setWikiList((list) =>
        list?.map((item) => (item?._id === ingredientId ? { ...item, hasInCompare: isCompared ? false : true } : item)),
      );

      const findCompareItem = findCompareWikiEntity(ingredientId);
      if (findCompareItem) {
        setWikiCompareList((state) => [...state.filter((item) => item?._id !== ingredientId)]);
      }

      notification("info", `${isCompared ? "Remove form" : "Added"} compare list successfully`);
    } catch (error) {
      notification("error", `Failed to ${isCompared ? "Remove form" : "Added"} compare list`);
    }
  };

  // useEffect(() => {
  //   if (selectedWikiType?.wikiType && user.id) {
  //     selectOptions(selectedWikiType?.wikiType, 1);
  //     setPage(1);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedWikiType?.wikiType, user.id]);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     selectOptions(type, page);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page, selectedWikiItem]);

  if (loading) {
    return (
      <>
        <PanelHeader title={title} icon={<FontAwesomeIcon icon={faInfoCircle} fontSize={24} />} />
        <div className={styles.showRecipeCollectionsContainer}>
          <SkeletonCollectionRecipe />
        </div>
        {/* <div className={styles.paginationWarper}>
          <Pagination
            limit={limit}
            pageState={[page, setPage]}
            totalPage={Math?.ceil(pageLength / limit)}
            activeBgColor="primary"
          />
        </div> */}
      </>
    );
  }
  return (
    <>
      <PanelHeader
        title={title}
        icon={<FontAwesomeIcon icon={faInfoCircle} fontSize={24} />}
        rightSide={
          <IconWarper
            iconColor="iconColorWhite"
            defaultBg="secondary"
            hover="bgSecondary"
            style={{ width: "28px", height: "28px" }}
            handleClick={() => handleCloseFilterOrSearchResult()}
          >
            <FontAwesomeIcon icon={faXmark} />
          </IconWarper>
        }
      />
      <div className={styles.showRecipeCollectionsContainer}>
        {/* <div className={styles.showRecipeCollectionsHeader}>
          <div className={styles.heading}>
            <FontAwesomeIcon icon={faStar} className={styles.icon} />
            <h2 className={styles.title}>{type}</h2>
          </div>

          <IconWarper
            iconColor="iconColorWhite"
            defaultBg="secondary"
            hover="bgSecondary"
            style={{ width: "28px", height: "28px" }}
            handleClick={handleClose}
          >
            <FontAwesomeIcon icon={faXmark} />
          </IconWarper>
        </div> */}
        {wikiList?.length ? (
          <div ref={observer} className={styles.showRecipes}>
            {wikiList?.map((wiki, index) => {
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
                  handleAddOrRemoveToWikiCompareList={handleAddOrRemoveToWikiCompareList}
                />
              );
            })}
          </div>
        ) : (
          <ErrorPage errorMessage="No Data found!!!" style={{ maxHeight: "75vh" }} />
        )}
      </div>
      {/* <div className={styles.paginationWarper}>
        <Pagination
          limit={limit}
          pageState={[page, setPage]}
          totalPage={Math?.ceil(pageLength / limit)}
          activeBgColor="primary"
        />
      </div> */}
    </>
  );
};

export default WikiSingleType;
