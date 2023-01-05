import {
  faBookmark,
  faShareNodes,
  faXmark,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import PlanCard from "../../component/module/Planner/PlanCard.component";
import useIntersectionObserver from "../../customHooks/useIntersectionObserver";
import useLocalStorage from "../../customHooks/useLocalStorage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setActiveRecipeId,
  setChangeRecipeWithinCollection,
  setSingleRecipeWithinCollecions,
  updateBulkRecipeIdsForAddedInCollection,
} from "../../redux/slices/collectionSlice";
import { setOpenCollectionsTary } from "../../redux/slices/sideTraySlice";
import DatacardComponent from "../../theme/cards/dataCard/dataCard.component";
import IconWarper from "../../theme/iconWarper/IconWarper";
import SkeletonCollectionRecipe from "../../theme/skeletons/skeletonCollectionRecipe/SkeletonCollectionRecipe";
import { BlogListType } from "../../type/blog";
import ErrorPage from "../pages/404Page";
import BlogCard from "../pages/blog/blogCard";
import ShowLastModifiedCollection from "../showLastModifiedCollection/ShowLastModifiedCollection";
import styles from "./index.module.scss";

interface Props {
  data: any[];
  loading: boolean;
  headerLeftSide?: React.ReactChild | null;
  headerRightSide?: React.ReactChild | null;
  headerMiddle?: React.ReactChild | null;
  closeHandler?: () => void;
  showItems: "recipe" | "blog" | "plan";
  findAmin?: (id: string) => string;
  totalDataCount?: number;
  showDefaultLeftHeader?: boolean;
  showDefaultMiddleHeader?: boolean;
  showDefaultRightHeader?: boolean;
  hasMore?: boolean;
  nextPage?: () => void;
}

const ShowRecipeContainer = ({
  data = [],
  loading = false,
  headerLeftSide = null,
  headerRightSide = null,
  headerMiddle = null,
  closeHandler = () => {},
  showItems = "recipe",
  findAmin = () => "",
  totalDataCount = 0,
  showDefaultLeftHeader = false,
  showDefaultMiddleHeader = false,
  showDefaultRightHeader = false,
  hasMore = false,
  nextPage = () => {},
}: Props) => {
  const [compareRecipeList, setcompareRecipeList] = useLocalStorage<any>(
    "compareList",
    [],
  );
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const { lastModifiedCollection } = useAppSelector(
    (state) => state?.collections,
  );
  const observer = useRef<any>();
  const dispatch = useAppDispatch();
  const entry = useIntersectionObserver(observer, { rootMargin: "100px" });

  // fetch next page
  useEffect(() => {
    if (!entry) return;
    if (entry.isIntersecting && hasMore) {
      nextPage();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry]);

  // open recipe collection panel after added a recipe to a collection
  const handleOpenCollectionTray = () => {
    dispatch(setSingleRecipeWithinCollecions([lastModifiedCollection?.id]));
    dispatch(setOpenCollectionsTary(true));
    dispatch(setChangeRecipeWithinCollection(true));
    setOpenCollectionModal(false);
  };

  const handleToOpenCollectionTray = () => {
    const dataIds = data?.map((item) => item?._id);
    if (showItems === "recipe") {
      dispatch(setSingleRecipeWithinCollecions([]));
      dispatch(setOpenCollectionsTary(true));
      dispatch(setChangeRecipeWithinCollection(true));
      dispatch(setActiveRecipeId(""));
      dispatch(updateBulkRecipeIdsForAddedInCollection(dataIds));
    }
  };

  // if (loading) {
  //   return (
  //     <div className={styles.showRecipeCollectionsContainer}>
  //       <SkeletonCollectionRecipe />
  //     </div>
  //   );
  // }

  return (
    <div className={styles.showRecipeCollectionsContainer}>
      <div className={styles.showRecipeCollectionsHeader}>
        {headerLeftSide ? (
          headerLeftSide
        ) : showDefaultLeftHeader ? (
          <p style={{ color: "#ababab" }}>
            <span style={{ fontWeight: "600" }}>{data?.length}</span> results
          </p>
        ) : (
          <div></div>
        )}
        {headerMiddle ? (
          headerMiddle
        ) : showDefaultMiddleHeader ? (
          <div style={{ display: "flex" }}>
            <IconWarper
              iconColor="iconColorPrimary"
              defaultBg="slightGray"
              hover="bgPrimary"
              style={{ width: "28px", height: "28px", marginRight: "10px" }}
              handleClick={handleToOpenCollectionTray}
            >
              <FontAwesomeIcon icon={faBookmark} />
            </IconWarper>
            <IconWarper
              iconColor="iconColorPrimary"
              defaultBg="slightGray"
              hover="bgPrimary"
              style={{ width: "28px", height: "28px" }}
            >
              <FontAwesomeIcon icon={faShareNodes} />
            </IconWarper>
          </div>
        ) : (
          <div></div>
        )}
        {headerRightSide ? (
          headerRightSide
        ) : showDefaultRightHeader ? (
          <IconWarper
            iconColor="iconColorWhite"
            defaultBg="primary"
            hover="bgPrimary"
            style={{ width: "28px", height: "28px" }}
            handleClick={closeHandler}
          >
            <FontAwesomeIcon icon={faXmark} />
          </IconWarper>
        ) : (
          <div></div>
        )}
      </div>

      {
        <>
          <div className={styles.showRecipes}>
            {showItems === "recipe" &&
              data?.map((item, index) => {
                let ingredients = [];
                item?.ingredients?.forEach((ing) => {
                  const ingredient = ing?.ingredientId?.ingredientName;
                  ingredients.push(ingredient);
                });
                const ing = ingredients.toString();
                return (
                  <DatacardComponent
                    key={index}
                    title={item.name}
                    ingredients={ing}
                    category={item.recipeBlendCategory?.name}
                    ratings={item?.averageRating}
                    noOfRatings={item?.numberOfRating}
                    carbs={item.carbs}
                    score={item.score}
                    calorie={item.calorie}
                    noOfComments={item?.numberOfRating}
                    image={item.image[0]?.image}
                    recipeId={item?._id}
                    notes={item?.notes}
                    addedToCompare={item?.addedToCompare}
                    compareRecipeList={compareRecipeList}
                    setcompareRecipeList={setcompareRecipeList}
                    setOpenCollectionModal={setOpenCollectionModal}
                    isCollectionIds={item?.userCollections}
                    isMatch={item?.isMatch}
                    postfixTitle={item?.defaultVersion?.postfixTitle}
                    userId={item?.userId}
                  />
                );
              })}
            {showItems === "blog" &&
              data?.map((blog: BlogListType) => {
                return (
                  <BlogCard
                    key={blog?._id}
                    blogData={{ ...blog, createdBy: findAmin(blog?.createdBy) }}
                    setOpenLastModifiedCollectionModal={setOpenCollectionModal}
                  />
                );
              })}
            {showItems === "plan" &&
              data?.map((plan) => {
                const { _id, planName, planCollections, commentsCount } = plan;
                return (
                  <PlanCard
                    key={_id}
                    planId={_id}
                    title={planName}
                    isCollectionIds={planCollections}
                    noOfComments={commentsCount}
                    setOpenCollectionModal={setOpenCollectionModal}
                  />
                );
              })}
          </div>
          {loading && <SkeletonCollectionRecipe />}
          {<div ref={observer}></div>}
          {!loading && !data?.length && (
            <ErrorPage
              errorMessage={`No ${showItems} found, search again !!!`}
              image="/icons/empty_data.svg"
              showBackIcon={false}
              showHomeIcon={false}
              imageHight={250}
              imageWidth={250}
              style={{ height: "70vh" }}
            />
          )}
        </>
      }

      {/* <div className={styles.paginationWarper}>
        <Pagination
          limit={limit}
          pageState={[pageNo, setPageNo]}
          totalPage={Math?.ceil(totalDataCount / limit)}
          activeBgColor="primary"
        />
      </div> */}
      <ShowLastModifiedCollection
        open={openCollectionModal}
        setOpen={setOpenCollectionModal}
        shouldCloseOnOverlayClick={true}
        lastModifiedCollectionName={lastModifiedCollection?.name}
        openCollectionPanel={handleOpenCollectionTray}
      />
    </div>
  );
};

export default ShowRecipeContainer;
