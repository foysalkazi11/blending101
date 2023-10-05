/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import SEARCH_RECIPE from "../../gqlLib/recipes/queries/searchRecipe";
import useDebounce from "../../customHooks/useDebounce";
import useFetchGetRecipesByBlendAndIngredients from "../../components/recipe/recipeDiscovery/helperFunc/useFetchGetRecipesByBlendAndIngredients";
import useHandleSearchRecipe from "../../components/recipe/recipeDiscovery/helperFunc/useSearchRecipes";
import { setChangeRecipeWithinCollection, setSingleRecipeWithinCollecions } from "../../redux/slices/collectionSlice";
import { setOpenCollectionsTary, setOpenFilterTray } from "../../redux/slices/sideTraySlice";
import { useLazyQuery } from "@apollo/client";
import {
  resetAllFilters,
  updateAllFilterRecipes,
  updateShowFilterOrSearchRecipes,
} from "../../redux/slices/filterRecipeSlice";
import styles from "../../components/recipe/recipeDiscovery/recipeDiscovery.module.scss";
import DiscoveryPageSearchBar from "../../components/recipe/recipeDiscovery/searchBar";
import SearchtagsComponent from "../../components/searchtags/searchtags.component";
import ShowRecipeContainer from "../../components/showRecipeContainer";
import ShowLastModifiedCollection from "../../components/showLastModifiedCollection/ShowLastModifiedCollection";
import ShareRecipe from "../../components/recipe/recipeDetails/center/shareRecipe";
import { useRouter } from "next/router";
import useToUpdateFilterCriteria from "../../customHooks/recipeFilter/useToUpdateRecipeFilterCriteria";
import useToUpdateActiveFilterTag from "../../customHooks/recipeFilter/useToUpdateActiveFilterTag";
import Filtertray from "../../components/sidetray/filter";
import RecipeCommentsTray from "../../components/sidetray/commentsTray/RecipeCommentsTray";
import VersionTray from "../../components/sidetray/versionTray/VersionTray";
import RecipeCollectionAndThemeTray from "../../components/sidetray/collection/RecipeCollectionAndThemeTray";
let dataLimit = 12;

const FilterRecipe = () => {
  const [shareRecipeData, setShareRecipeData] = useState({
    id: "",
    image: "",
    name: "",
    versionId: "",
    turnedOnVersions: [],
  });
  const [openShareModal, setOpenShareModal] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [searchRecipeType, setSearchRecipeType] = useState<"filter" | "search">("filter");
  const [recipeSearchInput, setRecipeSearchInput] = useState("");
  const { openFilterTray } = useAppSelector((state) => state.sideTray);
  const { allFilters, allFilterRecipes, showFilterOrSearchRecipes } = useAppSelector((state) => state?.filterRecipe);
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const isMounted = useRef(false);
  const dispatch = useAppDispatch();
  const [searchRecipe, { loading: searchRecipeLoading }] = useLazyQuery(SEARCH_RECIPE, {
    fetchPolicy: "cache-and-network",
  });

  const debounceSearchTerm = useDebounce(recipeSearchInput, 500);
  const { handleFilterRecipes, loading: filterRecipesLoading } = useFetchGetRecipesByBlendAndIngredients();
  const router = useRouter();
  const handleSearchRecipes = useHandleSearchRecipe();
  const { lastModifiedCollection } = useAppSelector((state) => state?.collections);
  // handle update recipe filter criteria
  const handleUpdateFilterCriteria = useToUpdateFilterCriteria();
  // handle update recipe active filter tag
  const handleUpdateActiveFilterTag = useToUpdateActiveFilterTag();

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
    if (searchRecipeType === "filter") {
      handleFilterRecipes(allFilters, pageNum + 1, dataLimit, false);
    }
    if (searchRecipeType === "search") {
      // handleSearchRecipes(recipeSearchInput, searchRecipe, pageNum + 1, dataLimit, false);
    }
  };

  const closeFilterRecipes = () => {
    setRecipeSearchInput("");
    dispatch(
      updateAllFilterRecipes({
        filterRecipes: [],
        isFiltering: false,
        totalItems: 0,
      }),
    );
    dispatch(resetAllFilters());
    dispatch(updateShowFilterOrSearchRecipes(false));
    setPageNum(1);
    router.push("/recipe/recipe_discovery");
  };

  useEffect(() => {
    // filter recipe func
    if (allFilters.length) {
      setSearchRecipeType("filter");
      setPageNum(1);
      handleFilterRecipes(allFilters, 1, dataLimit, true);
    } else {
      if (recipeSearchInput.length) {
        setSearchRecipeType("search");
        setPageNum(1);
        // handleSearchRecipes(recipeSearchInput, searchRecipe, 1, dataLimit, true);
      } else {
        dispatch(updateShowFilterOrSearchRecipes(false));
        dispatch(
          updateAllFilterRecipes({
            filterRecipes: [],
            isFiltering: false,
            totalItems: 0,
          }),
        );
        setPageNum(1);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFilters]);

  // close filter or search recipes

  useEffect(() => {
    if (isMounted.current) {
      // search recipe func
      if (recipeSearchInput.length) {
        setSearchRecipeType("search");
        setPageNum(1);
        // handleSearchRecipes(recipeSearchInput, searchRecipe, 1, dataLimit, true);
      } else {
        if (allFilters.length) {
          setSearchRecipeType("filter");
          setPageNum(1);
          handleFilterRecipes(allFilters, 1, dataLimit, true);
        } else {
          dispatch(updateShowFilterOrSearchRecipes(false));
          dispatch(
            updateAllFilterRecipes({
              filterRecipes: [],
              isFiltering: false,
              totalItems: 0,
            }),
          );
          setPageNum(1);
        }
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
      <Filtertray showPanle="left" showTagByDefaut={true} />
      <RecipeCommentsTray showPanle="right" showTagByDefaut={false} />
      <VersionTray showPanle="right" showTagByDefaut={false} />
      <RecipeCollectionAndThemeTray showPanle="left" showTagByDefaut={false} />

      <div className={styles.main__div}>
        <div
        // className={openFilterTray ? styles.move : styles.back}
        >
          {/* <DiscoveryPageSearchBar
            input={recipeSearchInput}
            handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setRecipeSearchInput(e.target.value);
            }}
          /> */}

          {allFilters?.length ? (
            <SearchtagsComponent
              allFilters={allFilters}
              handleUpdateActiveFilterTag={(activeSection, filterCriteria, activeTab, childTab) => {
                dispatch(setOpenFilterTray(true));
                handleUpdateActiveFilterTag(activeSection, filterCriteria, activeTab, childTab);
              }}
              handleUpdateFilterCriteria={handleUpdateFilterCriteria}
            />
          ) : null}

          <ShowRecipeContainer
            data={allFilterRecipes.filterRecipes}
            loading={filterRecipesLoading || searchRecipeLoading}
            closeHandler={closeFilterRecipes}
            showItems="recipe"
            showDefaultLeftHeader
            showDefaultMiddleHeader={allFilterRecipes.filterRecipes.length ? true : false}
            showDefaultRightHeader
            hasMore={allFilterRecipes?.totalItems > dataLimit * pageNum}
            totalDataCount={allFilterRecipes?.totalItems}
            nextPage={handleNextPage}
            setOpenCollectionModal={setOpenCollectionModal}
            setOpenShareModal={setOpenShareModal}
            setShareRecipeData={setShareRecipeData}
          />
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
FilterRecipe.meta = {
  title: "Filter Recipe",
  icon: "/icons/juicer.svg",
};

export default FilterRecipe;
