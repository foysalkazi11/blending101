/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import styles from "./recipeDiscovery.module.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import ShowLastModifiedCollection from "../../showLastModifiedCollection/ShowLastModifiedCollection";
import RegularRecipes from "./regularRecipes";
import SEARCH_RECIPE from "../../../gqlLib/recipes/queries/searchRecipe";
import { useLazyQuery } from "@apollo/client";
import useDebounce from "../../../customHooks/useDebounce";
import useHandleSearchRecipe from "./helperFunc/useSearchRecipes";
import DiscoveryPageSearchBar from "./searchBar";
import {
  setChangeRecipeWithinCollection,
  setSingleRecipeWithinCollecions,
} from "../../../redux/slices/collectionSlice";
import { setOpenCollectionsTary, setOpenFilterTray } from "../../../redux/slices/sideTraySlice";
import ShowRecipeContainer from "../../showRecipeContainer";
import ShareRecipe from "../recipeDetails/center/shareRecipe";
import Filtertray from "../../sidetray/filter";
import RecipeCommentsTray from "../../sidetray/commentsTray/RecipeCommentsTray";
import NotificationTray from "../../sidetray/notificationTray";
import RecipeCollectionAndThemeTray from "../../sidetray/collection/RecipeCollectionAndThemeTray";
let dataLimit = 12;

const RecipeDiscovery = () => {
  const [shareRecipeData, setShareRecipeData] = useState({
    id: "",
    image: "",
    name: "",
    versionId: "",
    turnedOnVersions: [],
  });
  const [openShareModal, setOpenShareModal] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const [recipeSearchInput, setRecipeSearchInput] = useState("");
  const { openFilterTray } = useAppSelector((state) => state.sideTray);
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const [searchRecipes, setSearchRecipes] = useState({ recipes: [], totalRecipes: 0 });
  const isMounted = useRef(false);
  const dispatch = useAppDispatch();
  const [searchRecipe, { loading: searchRecipeLoading, data: searchRecipeData }] = useLazyQuery(SEARCH_RECIPE, {
    // fetchPolicy: "cache-and-network",
  });
  const debounceSearchTerm = useDebounce(recipeSearchInput, 500);
  const handleSearchRecipes = useHandleSearchRecipe();
  const { lastModifiedCollection } = useAppSelector((state) => state?.collections);

  // open recipe collection panel after added a recipe to a collection
  const handleOpenCollectionTray = () => {
    dispatch(setSingleRecipeWithinCollecions([lastModifiedCollection?.id]));
    dispatch(setOpenCollectionsTary(true));
    dispatch(setChangeRecipeWithinCollection(true));
    setOpenCollectionModal(false);
  };

  // handle next page
  const handleNextPage = () => {
    setPageNum((page) => page + 1);

    handleSearchRecipes(setSearchRecipes, recipeSearchInput, searchRecipe, pageNum + 1, dataLimit, false);
  };

  const closeFilterRecipes = () => {
    setRecipeSearchInput("");
    setPageNum(1);
  };

  // // close filter or search recipes

  useEffect(() => {
    if (isMounted.current) {
      // search recipe func
      if (recipeSearchInput) {
        setPageNum(1);
        handleSearchRecipes(setSearchRecipes, recipeSearchInput, searchRecipe, 1, dataLimit, true);
      } else {
        setSearchRecipes({ recipes: [], totalRecipes: 0 });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearchTerm]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <React.Fragment>
      <Filtertray showPanle="left" showTagByDefaut={false} />
      <RecipeCommentsTray showPanle="right" showTagByDefaut={false} />
      <NotificationTray showPanle="right" showTagByDefaut={false} />
      <RecipeCollectionAndThemeTray showPanle="left" showTagByDefaut={openFilterTray ? false : true} />
      <div className={styles.main__div}>
        <div
        // className={openFilterTray ? styles.move : styles.back}
        >
          <DiscoveryPageSearchBar
            input={recipeSearchInput}
            handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setRecipeSearchInput(e.target.value);
            }}
            openFilterTray={openFilterTray}
            toggleFilterPanel={() => dispatch(setOpenFilterTray(!openFilterTray))}
          />

          {debounceSearchTerm ? (
            <ShowRecipeContainer
              data={searchRecipes?.recipes}
              loading={searchRecipeLoading}
              closeHandler={closeFilterRecipes}
              showItems="recipe"
              showDefaultLeftHeader
              showDefaultMiddleHeader={searchRecipes?.recipes?.length ? true : false}
              showDefaultRightHeader
              hasMore={searchRecipes?.totalRecipes > dataLimit * pageNum}
              totalDataCount={searchRecipes?.totalRecipes}
              nextPage={handleNextPage}
              setOpenCollectionModal={setOpenCollectionModal}
              setOpenShareModal={setOpenShareModal}
              setShareRecipeData={setShareRecipeData}
            />
          ) : (
            <RegularRecipes
              setOpenCollectionModal={setOpenCollectionModal}
              setOpenShareModal={setOpenShareModal}
              setShareRecipeData={setShareRecipeData}
            />
          )}
        </div>
      </div>
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
    </React.Fragment>
  );
};

export default RecipeDiscovery;
