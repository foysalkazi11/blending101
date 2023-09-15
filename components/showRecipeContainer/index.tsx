import { faBookmark, faShareNodes, faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";
import PlanCard from "../../modules/plan/partials/Shared/PlanCard.component";
import useIntersectionObserver from "../../customHooks/useIntersectionObserver";
import joniIngredients from "../../helperFunc/joinIngredients";
import { useAppDispatch } from "../../redux/hooks";
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
import styles from "./index.module.scss";
import ShareItems from "./ShareItems";
import { RecipeType, ReferenceOfRecipeUpdateFuncType } from "../../type/recipeType";
import { AccessPermission } from "../../type/recipeCardType";
import { setReferenceOfRecipeUpdateFunc } from "../../redux/slices/recipeSlice";

const rootMargin = "100px";

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
  setOpenCollectionModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenShareModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setShareRecipeData?: React.Dispatch<React.SetStateAction<{ id: string; image: string; name: string }>>;
  isAuthorized?: boolean;
  viewPermissions?: AccessPermission[];
  interactionPermissions?: AccessPermission[];
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
  setOpenCollectionModal = () => {},
  setOpenShareModal = () => {},
  setShareRecipeData = () => {},
  viewPermissions,
  interactionPermissions,
}: Props) => {
  const [containerData, setContainerData] = useState([]);
  const [openCreateCollectionModal, setOpenCreateCollectionModal] = useState(false);
  const observer = useRef<any>();
  const dispatch = useAppDispatch();
  const entry = useIntersectionObserver(observer, { rootMargin });

  // fetch next page
  useEffect(() => {
    if (!entry) return;
    if (entry.isIntersecting && hasMore) {
      nextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry]);

  const handleToOpenCollectionTray = () => {
    const dataIds = data?.map((item) => item?.recipeId._id);
    if (showItems === "recipe") {
      dispatch(setSingleRecipeWithinCollecions([]));
      dispatch(setOpenCollectionsTary(true));
      dispatch(setChangeRecipeWithinCollection(true));
      dispatch(setActiveRecipeId(""));
      dispatch(updateBulkRecipeIdsForAddedInCollection(dataIds));
      dispatch(setReferenceOfRecipeUpdateFunc(updateContainerData));
    }
  };

  const updateContainerData = useCallback<ReferenceOfRecipeUpdateFuncType>(
    (id, outerObj = {}, innerObj = {}, innerLabel, bulkRecipeIdsForAddedInCollection) => {
      setContainerData((prev) =>
        prev.map((item) =>
          (
            bulkRecipeIdsForAddedInCollection?.length
              ? bulkRecipeIdsForAddedInCollection?.includes(item?.recipeId?._id)
              : item?.recipeId?._id === id
          )
            ? {
                ...item,
                ...outerObj,
                [innerLabel]: { ...item[innerLabel], ...innerObj },
              }
            : item,
        ),
      );
    },
    [],
  );

  useEffect(() => {
    setContainerData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <div className={styles.showRecipeCollectionsContainer}>
        <div className={styles.showRecipeCollectionsHeader}>
          {headerLeftSide ? (
            headerLeftSide
          ) : showDefaultLeftHeader ? (
            <p className={styles.resultCount}>
              <span>{totalDataCount || data?.length}</span> results
            </p>
          ) : (
            <div></div>
          )}
          {headerMiddle ? (
            headerMiddle
          ) : showDefaultMiddleHeader ? (
            <div className="d-flex">
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
                handleClick={() => setOpenCreateCollectionModal(true)}
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
                containerData?.map((item: RecipeType, index) => {
                  const {
                    recipeId: {
                      _id = "",
                      name = "",
                      image = [],
                      originalVersion = "",
                      numberOfRating = 0,
                      averageRating = 0,
                      recipeBlendCategory,
                      userId,
                      brand,
                      url,
                    },
                    defaultVersion,
                    // defaultVersion: {
                    //   _id: defaultVersionId = "",
                    //   postfixTitle = "",
                    //   ingredients,
                    //   description = "",
                    //   calorie,
                    //   gigl,
                    // },
                    isMatch = false,
                    allRecipes = false,
                    myRecipes = false,
                    notes = 0,
                    addedToCompare = false,
                    userCollections = [],
                    versionCount = 0,
                    personalRating,
                  } = item;
                  const ing = joniIngredients(defaultVersion?.ingredients);
                  return (
                    <DatacardComponent
                      key={_id}
                      title={name}
                      ingredients={ing}
                      category={recipeBlendCategory?.name}
                      ratings={averageRating}
                      noOfRatings={numberOfRating}
                      carbs={defaultVersion?.gigl?.netCarbs || 0}
                      // score={rxScore}
                      calorie={defaultVersion?.calorie?.value || 0}
                      noOfComments={numberOfRating}
                      image={image?.find((img) => img?.default)?.image || image?.[0]?.image}
                      recipeId={_id}
                      notes={notes}
                      addedToCompare={addedToCompare}
                      isCollectionIds={userCollections}
                      setOpenCollectionModal={setOpenCollectionModal}
                      isMatch={isMatch}
                      postfixTitle={defaultVersion?.postfixTitle}
                      defaultVersionId={defaultVersion?._id}
                      userId={userId}
                      recipeVersion={versionCount}
                      showMoreMenuAtHover={true}
                      setShareRecipeData={setShareRecipeData}
                      setOpenShareModal={setOpenShareModal}
                      token={item?.token}
                      updateDataFunc={updateContainerData}
                      brand={brand}
                      personalRating={personalRating}
                      origin={url}
                      viewPermissions={viewPermissions}
                      interactionPermissions={interactionPermissions}
                    />
                  );
                })}
              {showItems === "blog" &&
                containerData?.map((blog: BlogListType) => {
                  return (
                    <BlogCard
                      key={blog?._id}
                      blogData={blog}
                      setOpenLastModifiedCollectionModal={setOpenCollectionModal}
                    />
                  );
                })}
              {showItems === "plan" &&
                containerData?.map((item) => {
                  return (
                    <PlanCard
                      key={item?._id}
                      planId={item?._id}
                      title={item.planName}
                      image={item?.image?.url}
                      isCollectionIds={item?.planCollections}
                      noOfComments={item?.commentsCount}
                      setOpenCollectionModal={setOpenCollectionModal}
                      planComrFrom="list"
                      noOfRatings={item?.numberOfRating}
                      ratings={item?.averageRating}
                      myRating={item?.myRating}
                    />
                  );
                })}
            </div>
            {loading && <SkeletonCollectionRecipe />}
            <div ref={observer}></div>
            {!loading && !containerData?.length && (
              <ErrorPage
                errorMessage={`No ${showItems} found, search again !!!`}
                image="/icons/empty_data.svg"
                showBackIcon={false}
                showHomeIcon={false}
                imageHight={250}
                imageWidth={250}
                style={{ height: "50vh" }}
              />
            )}
          </>
        }
      </div>
      {showItems === "recipe" && (
        <ShareItems
          heading="Share search results"
          show={openCreateCollectionModal}
          setShow={setOpenCreateCollectionModal}
          type={showItems}
          itemsIds={containerData?.map((item) => item?.recipeId?._id)}
          showVersionShareCheckbox={false}
        />
      )}
    </>
  );
};

export default ShowRecipeContainer;
