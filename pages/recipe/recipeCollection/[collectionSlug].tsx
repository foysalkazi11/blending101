import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import styles from "../../../components/recipe/recipeDiscovery/recipeDiscovery.module.scss";
import classes from "../../../styles/pages/viewAll.module.scss";
import { QueryLazyOptions, useLazyQuery } from "@apollo/client";
import GET_SINGLE_COLLECTION from "../../../gqlLib/collection/query/getSingleCollection";
import GET_ALL_MY_CREATED_RECIPES from "../../../gqlLib/collection/query/getAllMyCreatedRecipes";
import GET_ALL_RECIPES_WITHIN_COLLECTIONS from "../../../gqlLib/collection/query/getAllRecipesWhithiCollections";
import ShowRecipeContainer from "../../../components/showRecipeContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/pro-regular-svg-icons";
import ErrorPage from "../../../components/pages/404Page";
import ShowLastModifiedCollection from "../../../components/showLastModifiedCollection/ShowLastModifiedCollection";
import ShareRecipe from "../../../components/recipe/recipeDetails/center/shareRecipe";
import {
  setChangeRecipeWithinCollection,
  setSingleRecipeWithinCollecions,
} from "../../../redux/slices/collectionSlice";
import { setOpenCollectionsTary } from "../../../redux/slices/sideTraySlice";
import GET_SHARE_WITH_ME_COLLECTIONS from "../../../gqlLib/collection/query/getShareWithMeCollections";
import { ShowRecipes } from "../../../components/recipe/recipeDiscovery/regularRecipes";
import GET_MY_RECENT_RECIPES from "../../../gqlLib/collection/query/getMyRecientRecipes";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import { faXmark } from "@fortawesome/pro-light-svg-icons";
import HeaderTextBtn from "../../../components/recipe/share/panelHeader/HeaderTextBtn";
import useToAcceptCollectionShare from "../../../customHooks/collection/useToAcceptCollectionShare";
import notification from "../../../components/utility/reactToastifyNotification";
import { useUser } from "../../../context/AuthProvider";
import Layout from "../../../layouts";
import { faBookmark } from "@fortawesome/pro-solid-svg-icons";
import RecipeCommentsTray from "../../../components/sidetray/commentsTray/RecipeCommentsTray";
import VersionTray from "../../../components/sidetray/versionTray/VersionTray";
import RecipeCollectionAndThemeTray from "../../../components/sidetray/collection/RecipeCollectionAndThemeTray";
import slugToTitle from "../../../helperFunc/string/slugToTittle";
let dataLimit = 12;

type Variables = Record<string, any>;

const CollectionRecipes = () => {
  const [pageNum, setPageNum] = useState(1);
  const [isSharedWithMeCollection, setShareWithMeCollection] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const collectionId = router.query?.collectionId as string;
  const singleRecipeCollectionId = router.query
    ?.singleRecipeCollectionId as string;
  const token = router.query?.token as string;
  const slug = router.query?.collectionSlug as string;
  const [title, setTitle] = useState("");
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const [shareRecipeData, setShareRecipeData] = useState({
    id: "",
    image: "",
    name: "",
    versionId: "",
    turnedOnVersions: [],
  });
  const [openShareModal, setOpenShareModal] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const { id: userId } = useUser();

  const { lastModifiedCollection } = useAppSelector(
    (state) => state?.collections,
  );
  const [getAllRecipes, { loading: getAllRecipesLoading }] = useLazyQuery(
    GET_ALL_RECIPES_WITHIN_COLLECTIONS,
  );
  const [getMyRecipes, { loading: getMyRecipesLoading }] = useLazyQuery(
    GET_ALL_MY_CREATED_RECIPES,
  );
  const [getMyRecentRecipes, { loading: getRecentRecipesLoading }] =
    useLazyQuery(GET_MY_RECENT_RECIPES);
  const [
    getCustomRecipes,
    {
      data: getCustomRecipesData,
      loading: getCustomRecipesLoading,
      error: getCollectionRecipeError,
    },
  ] = useLazyQuery(GET_SINGLE_COLLECTION);
  const [
    getShareWithMeCollection,
    {
      data: shareWithMeCollectionData,
      loading: shareWithMeCollectionLoading,
      error: shareWithMeCollectionError,
    },
  ] = useLazyQuery(GET_SHARE_WITH_ME_COLLECTIONS, {
    variables: { userId },
  });
  // const {
  //   handleFilterRecipes,
  //   loading: filterRecipesLoading,
  //   error: filterRecipesError,
  //   data: filteredRecipes,
  // } = useFetchGetRecipesByBlendAndIngredients();
  const { allFilters, allFilterRecipes, showFilterOrSearchRecipes } =
    useAppSelector((state) => state?.filterRecipe);
  const { functionAcceptCollectionShare, acceptCollectionShareLoading } =
    useToAcceptCollectionShare();

  //handle next page
  const handleNextPage = (slug, currentPage) => {
    setPageNum(currentPage + 1);
    handleToCallCollection(slug, currentPage + 1);
  };

  // const closeFilterRecipes = () => {
  //   dispatch(
  //     updateAllFilterRecipes({
  //       filterRecipes: [],
  //       isFiltering: false,
  //       totalItems: 0,
  //     }),
  //   );
  //   dispatch(resetAllFilters());
  //   setPageNum(1);
  // };

  // open recipe collection panel after added a recipe to a collection
  const handleOpenCollectionTray = () => {
    dispatch(setSingleRecipeWithinCollecions([lastModifiedCollection?.id]));
    dispatch(setOpenCollectionsTary(true));
    dispatch(setChangeRecipeWithinCollection(true));
    setOpenCollectionModal(false);
  };

  // handle fetch collection recipe
  const handleToFetchCollectionRecipes = async (
    method: (options?: QueryLazyOptions<Variables>) => any,
    variables: Variables,
    accessCollectionName: string,
    page: number = 1,
    limit: number = 12,
  ) => {
    variables = { ...variables, page, limit };
    try {
      const { data } = await method({ variables });
      const collectionData = data[accessCollectionName];
      setTitle(collectionData?.name || "");
      setRecipes((recipes) => [...recipes, ...(collectionData?.recipes || [])]);
      setTotalRecipes(collectionData?.totalRecipes || 0);
    } catch (error) {
      notification("error", "Data fetching error");
    }
  };

  // handle to call collection based of slug and page no
  const handleToCallCollection = (slug, page = 1) => {
    if (!slug) return;
    setShareWithMeCollection(false);

    switch (slug) {
      case "all-recipes":
        handleToFetchCollectionRecipes(
          getAllRecipes,
          { userId },
          "getAllRecipesFromCollection",
          page,
        );
        break;
      case "shared_with_me":
        setShareWithMeCollection(true);
        getShareWithMeCollection();
        break;
      case "my-recipes":
        handleToFetchCollectionRecipes(
          getMyRecipes,
          { userId },
          "getAllMyCreatedRecipes",
          page,
        );
        break;
      case "recent-recipes":
        handleToFetchCollectionRecipes(
          getMyRecentRecipes,
          { userId },
          "getMyRecentRecipes",
          page,
        );
        break;

      default:
        handleToFetchCollectionRecipes(
          getCustomRecipes,
          {
            userId,
            slug,
            collectionId: collectionId || "",
            token: token || "",
            singleRecipeCollectionId: singleRecipeCollectionId || "",
          },
          "getASingleCollection",
          page,
        );
    }
  };

  // call collection when slug and others params change
  useEffect(() => {
    if (!slug) return;
    setPageNum(1);
    setTotalRecipes(0);
    setRecipes([]);
    handleToCallCollection(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <RecipeCommentsTray showPanle="right" showTagByDefaut={false} />
      <VersionTray showPanle="right" showTagByDefaut={false} />
      <RecipeCollectionAndThemeTray showPanle="left" showTagByDefaut={false} />

      <div className={styles.main__div}>
        {isSharedWithMeCollection ? (
          <SharedWithMe
            data={shareWithMeCollectionData?.getSharedWithMeCollections}
            loading={shareWithMeCollectionLoading}
            error={shareWithMeCollectionError}
            setOpenCollectionModal={setOpenCollectionModal}
            setOpenShareModal={setOpenShareModal}
            setShareRecipeData={setShareRecipeData}
          />
        ) : (
          <ShowRecipeContainer
            nextPage={() => handleNextPage(slug, pageNum)}
            hasMore={totalRecipes > dataLimit * pageNum}
            totalDataCount={totalRecipes}
            isAuthorized={
              getCustomRecipesData?.getASingleCollection?.accepted || true
            }
            data={recipes}
            loading={
              getAllRecipesLoading ||
              getMyRecipesLoading ||
              getCustomRecipesLoading ||
              getRecentRecipesLoading
            }
            headerLeftSide={
              <div className="flex ai-center">
                {slug === "my-favorite" ? (
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={classes.head__icon}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faStar}
                    className={classes.head__icon}
                  />
                )}

                <h2 className={classes.head__title}>{title}</h2>
              </div>
            }
            headerRightSide={
              <div className="d-flex ai-center">
                {getCustomRecipesData?.getASingleCollection?.hasOwnProperty(
                  "accepted",
                ) && !getCustomRecipesData?.getASingleCollection?.accepted ? (
                  <HeaderTextBtn
                    style={{ marginRight: "1rem" }}
                    variant="containPrimary"
                    onClick={() =>
                      functionAcceptCollectionShare(
                        {
                          token:
                            token ||
                            getCustomRecipesData?.getASingleCollection?._id,
                          userId,
                        },
                        true,
                      )
                    }
                  >
                    {acceptCollectionShareLoading
                      ? "Loading..."
                      : "Add to collection"}
                  </HeaderTextBtn>
                ) : null}

                <IconWarper
                  iconColor="iconColorWhite"
                  defaultBg="primary"
                  hover="bgPrimary"
                  style={{ width: "28px", height: "28px" }}
                  handleClick={() => router.push("/recipe/recipe_discovery")}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </IconWarper>
              </div>
            }
            showItems="recipe"
            setOpenCollectionModal={setOpenCollectionModal}
            setOpenShareModal={setOpenShareModal}
            setShareRecipeData={setShareRecipeData}
          />
        )}

        <ShowLastModifiedCollection
          open={openCollectionModal}
          setOpen={setOpenCollectionModal}
          shouldCloseOnOverlayClick={true}
          lastModifiedCollectionName={lastModifiedCollection?.name}
          openCollectionPanel={handleOpenCollectionTray}
        />
        <ShareRecipe
          id={shareRecipeData?.id}
          versionId={shareRecipeData.versionId}
          title={shareRecipeData?.name}
          image={shareRecipeData?.image}
          turnedOnVersions={shareRecipeData?.turnedOnVersions}
          show={openShareModal}
          setShow={setOpenShareModal}
          type="recipe"
          heading="Share Recipe"
        />
      </div>
    </React.Fragment>
  );
};

const SharedWithMe = ({
  data,
  loading,
  error,
  setOpenCollectionModal,
  setOpenShareModal,
  setShareRecipeData,
}) => {
  const [containerData, setContainerData] = useState<{ [key: string]: any }[]>(
    [],
  );

  const updateContainerData = useCallback(
    (objectId: string, recipeId: string, updateObj: { [key: string]: any }) => {
      setContainerData((prev) =>
        prev.map((item) =>
          item?._id === objectId
            ? {
                ...item,
                recipes: item?.recipes?.map((recipe) =>
                  recipe?.recipeId?._id === recipeId
                    ? { ...recipe, ...updateObj }
                    : recipe,
                ),
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
    <div style={{ marginTop: "20px" }}>
      {containerData?.length ? (
        containerData?.map((item, index) => {
          const { _id, description, image, name, recipes, slug, creatorInfo } =
            item;
          return (
            <ShowRecipes
              key={_id}
              headerData={{
                heading: name,
                image: creatorInfo?.image || "/images/fire-alt-light.svg",
                allUrl: `/recipe/recipeCollection/${slug}?${
                  name === "Single Recipes"
                    ? "singleRecipeCollectionId"
                    : "collectionId"
                }=${_id}`,
              }}
              loading={loading}
              recipes={recipes}
              setOpenCollectionModal={setOpenCollectionModal}
              setOpenShareModal={setOpenShareModal}
              setShareRecipeData={setShareRecipeData}
              updateDataFunc={(recipeId, updateObj) =>
                updateContainerData(_id, recipeId, updateObj)
              }
            />
          );
        })
      ) : (
        <ErrorPage
          style={{ height: "50vh" }}
          image="/icons/empty_data.svg"
          errorMessage="No data found"
        />
      )}
    </div>
  );
};

CollectionRecipes.useLayout = (page) => {
  const router = useRouter();
  let slug = router.query?.collectionSlug as string;
  // slug
  //   .replaceAll("-", " ")
  //   .split(" ")
  //   .map((str) => str.toLowerCase())
  //   .join(" ");
  // console.log(slug);

  let obj = {
    title: `${slugToTitle(slug)} Collection`,
    description: `${slug} Collection`,
  };

  return (
    <Layout
      title={obj.title}
      icon={
        <FontAwesomeIcon
          icon={faBookmark}
          color="#fe5d1f"
          fontSize={20}
          style={{ marginRight: "5px" }}
        />
      }
    >
      {page}
    </Layout>
  );
};

export default CollectionRecipes;
