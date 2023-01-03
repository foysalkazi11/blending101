import {
  faBookmark,
  faShareNodes,
  faXmark,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import PlanCard from "../../component/module/Planner/PlanCard.component";
import Pagination from "../../component/molecules/Pagination/ServerPagination.component";
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
interface InputValueType {
  name: string;
  slug: string;
  description: string;
  image?: string | null;
}
interface Props {
  data: any[];
  loading: boolean;
  headerLeftSide?: React.ReactChild | null;
  headerRightSide?: React.ReactChild | null;
  headerMiddle?: React.ReactChild | null;
  closeHandler?: () => void;
  showItems: "recipe" | "blog" | "plan";
  findAmin?: (id: string) => string;
  hasPagination?: boolean;
  limit?: number;
  pageNo?: number;
  setPageNo?: React.Dispatch<React.SetStateAction<number>>;
  dataLength?: number;
  showDefaultLeftHeader?: boolean;
  showDefaultMiddleHeader?: boolean;
  showDefaultRightHeader?: boolean;
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
  dataLength = 0,
  hasPagination = false,
  limit = 12,
  pageNo = 1,
  setPageNo = () => {},
  showDefaultLeftHeader = false,
  showDefaultMiddleHeader = false,
  showDefaultRightHeader = false,
}: Props) => {
  const [compareRecipeList, setcompareRecipeList] = useLocalStorage<any>(
    "compareList",
    [],
  );
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const { lastModifiedCollection } = useAppSelector(
    (state) => state?.collections,
  );
  const dispatch = useAppDispatch();

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
    // if (!openModal) {
    //   setInput({ image: null, name: "", description: "", slug: "" });
    //   setOpenModal(true);
    // }
  };

  if (loading) {
    return (
      <div className={styles.showRecipeCollectionsContainer}>
        <SkeletonCollectionRecipe />
      </div>
    );
  }

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

      {data?.length ? (
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
      ) : (
        <ErrorPage
          errorMessage="No recipes found, search again !!!"
          image="/icons/empty_data.svg"
          showBackIcon={false}
          showHomeIcon={false}
          imageHight={250}
          imageWidth={250}
          style={{ height: "40vh" }}
        />
      )}

      <div className={styles.paginationWarper}>
        <Pagination
          limit={limit}
          pageState={[pageNo, setPageNo]}
          totalPage={Math?.ceil(dataLength / limit)}
          activeBgColor="primary"
        />
      </div>
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
