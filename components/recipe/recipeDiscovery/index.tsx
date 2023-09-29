/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import styles from "./recipeDiscovery.module.scss";
import SearchTagsComponent from "../../searchtags/searchtags.component";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import ShowLastModifiedCollection from "../../showLastModifiedCollection/ShowLastModifiedCollection";
import RegularRecipes from "./regularRecipes";
import useDebounce from "../../../customHooks/useDebounce";
import {
  resetAllFilters,
  updateAllFilterRecipes,
  updateShowFilterOrSearchRecipes,
} from "../../../redux/slices/filterRecipeSlice";
import useFetchGetRecipesByBlendAndIngredients from "./helperFunc/useFetchGetRecipesByBlendAndIngredients";
import useHandleSearchRecipe from "./helperFunc/useSearchRecipes";
import DiscoveryPageSearchBar from "./searchBar";
import {
  setChangeRecipeWithinCollection,
  setSingleRecipeWithinCollecions,
} from "../../../redux/slices/collectionSlice";
import { setOpenCollectionsTary, setOpenFilterTray } from "../../../redux/slices/sideTraySlice";
import ShowRecipeContainer from "../../showRecipeContainer";
import ShareRecipe from "../recipeDetails/center/shareRecipe";
import useToUpdateFilterCriteria from "../../../customHooks/recipeFilter/useToUpdateRecipeFilterCriteria";
import useToUpdateActiveFilterTag from "../../../customHooks/recipeFilter/useToUpdateActiveFilterTag";
import Filtertray from "../../sidetray/filter";
import RecipeCommentsTray from "../../sidetray/commentsTray/RecipeCommentsTray";
import NotificationTray from "../../sidetray/notificationTray";
import RecipeCollectionAndThemeTray from "../../sidetray/collection/RecipeCollectionAndThemeTray";
import { HideOnMobile } from "component/molecules/Responsive/Responsive.component";
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
  const [searchRecipeType, setSearchRecipeType] = useState<"filter" | "search">("filter");
  const [recipeSearchInput, setRecipeSearchInput] = useState("");
  const { openFilterTray } = useAppSelector((state) => state.sideTray);
  const { allFilters, allFilterRecipes, showFilterOrSearchRecipes } = useAppSelector((state) => state?.filterRecipe);
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const isMounted = useRef(false);
  const dispatch = useAppDispatch();

  const debounceSearchTerm = useDebounce(recipeSearchInput, 500);
  const { handleFilterRecipes, loading: filterRecipesLoading } = useFetchGetRecipesByBlendAndIngredients();
  const { handleSearchRecipes, loading: searchRecipeLoading } = useHandleSearchRecipe();
  const { lastModifiedCollection } = useAppSelector((state) => state?.collections);
  // handle update recipe filter criteria
  const handleUpdateFilterCriteria = useToUpdateFilterCriteria();
  // handle update recipe active filter tag
  const handleUpdateActiveFilterTag = useToUpdateActiveFilterTag();

  // toggle filter panel
  const toggleFilterPanel = () => {
    dispatch(setOpenFilterTray(!openFilterTray));
  };

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
      handleSearchRecipes(recipeSearchInput, pageNum + 1, dataLimit, false);
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
  };

  useEffect(() => {
    // filter recipe func
    if (allFilters?.length) {
      setSearchRecipeType("filter");
      setPageNum(1);
      handleFilterRecipes(allFilters, 1, dataLimit, true);
      setRecipeSearchInput("");
    } else {
      if (recipeSearchInput.length) {
        setSearchRecipeType("search");
        setPageNum(1);
        handleSearchRecipes(recipeSearchInput, 1, dataLimit, true);
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
        handleSearchRecipes(recipeSearchInput, 1, dataLimit, true);
        dispatch(resetAllFilters());
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
      <Filtertray showPanle="left" showTagByDefaut={false} />
      <RecipeCommentsTray showPanle="right" showTagByDefaut={false} />
      <NotificationTray showPanle="right" showTagByDefaut={false} />
      <RecipeCollectionAndThemeTray showPanle="left" showTagByDefaut={openFilterTray ? false : true} />
      <div className={styles.main__div}>
        <div
        // className={openFilterTray ? styles.move : styles.back}
        >
          <HideOnMobile>
            <DiscoveryPageSearchBar
              input={recipeSearchInput}
              handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setRecipeSearchInput(e.target.value);
              }}
              openFilterTray={openFilterTray}
              toggleFilterPanel={toggleFilterPanel}
            />

            {allFilters?.length ? (
              <SearchTagsComponent
                allFilters={allFilters}
                handleUpdateActiveFilterTag={(activeSection, filterCriteria, activeTab, childTab) => {
                  dispatch(setOpenFilterTray(true));
                  handleUpdateActiveFilterTag(activeSection, filterCriteria, activeTab, childTab);
                }}
                handleUpdateFilterCriteria={handleUpdateFilterCriteria}
              />
            ) : null}
          </HideOnMobile>

          {showFilterOrSearchRecipes ? (
            <ShowRecipeContainer
              data={allFilterRecipes?.filterRecipes}
              loading={filterRecipesLoading || searchRecipeLoading}
              closeHandler={closeFilterRecipes}
              showItems="recipe"
              showDefaultLeftHeader
              showDefaultMiddleHeader={allFilterRecipes?.filterRecipes?.length ? true : false}
              showDefaultRightHeader
              hasMore={allFilterRecipes?.totalItems > dataLimit * pageNum}
              totalDataCount={allFilterRecipes?.totalItems}
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
