/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import AContainer from "../../../containers/A.container";
import styles from "./recipeDiscovery.module.scss";
import SearchTagsComponent from "../../searchtags/searchtags.component";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import FooterRecipeFilter from "../../footer/footerRecipeFilter.component";
import ShowLastModifiedCollection from "../../showLastModifiedCollection/ShowLastModifiedCollection";
import RegularRecipes from "./regularRecipes";
import SEARCH_RECIPE from "../../../gqlLib/recipes/queries/searchRecipe";
import { useLazyQuery } from "@apollo/client";
import useDebounce from "../../../customHooks/useDebounce";
import {
  resetAllFilters,
  updateAllFilterRecipes,
  updateShowFilterOrSearchRecipes,
} from "../../../redux/slices/filterRecipeSlice";
import FILTER_RECIPE from "../../../gqlLib/recipes/queries/filterRecipe";
import useFetchGetRecipesByBlendAndIngredients from "./helperFunc/useFetchGetRecipesByBlendAndIngredients";
import useHandleSearchRecipe from "./helperFunc/useSearchRecipes";
import DiscoveryPageSearchBar from "./searchBar";
import {
  setChangeRecipeWithinCollection,
  setSingleRecipeWithinCollecions,
} from "../../../redux/slices/collectionSlice";
import { setOpenCollectionsTary } from "../../../redux/slices/sideTraySlice";
import ShowRecipeContainer from "../../showRecipeContainer";
let dataLimit = 12;

const RecipeDiscovery = () => {
  const [pageNum, setPageNum] = useState(1);
  const [searchRecipeType, setSearchType] = useState<"filter" | "search">(
    "filter",
  );
  const [recipeSearchInput, setRecipeSearchInput] = useState("");
  const { openFilterTray } = useAppSelector((state) => state.sideTray);
  const { allFilters, allFilterRecipes, showFilterOrSearchRecipes } =
    useAppSelector((state) => state?.filterRecipe);
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const isMounted = useRef(false);
  const dispatch = useAppDispatch();
  const [searchRecipe, { loading: searchRecipeLoading }] = useLazyQuery(
    SEARCH_RECIPE,
    {
      fetchPolicy: "cache-and-network",
    },
  );
  const [filterRecipe, { loading: filterRecipesLoading }] = useLazyQuery(
    FILTER_RECIPE,
    {
      fetchPolicy: "cache-and-network",
    },
  );
  const debounceSearchTerm = useDebounce(recipeSearchInput, 500);
  const handleFilterRecipes = useFetchGetRecipesByBlendAndIngredients();
  const handleSearchRecipes = useHandleSearchRecipe();
  const { lastModifiedCollection } = useAppSelector(
    (state) => state?.collections,
  );

  // open recipe collection panel after added a recipe to a collection
  const handleOpenCollectionTray = () => {
    dispatch(setSingleRecipeWithinCollecions([lastModifiedCollection?.id]));
    dispatch(setOpenCollectionsTary(true));
    dispatch(setChangeRecipeWithinCollection(true));
    setOpenCollectionModal(false);
  };

  useEffect(() => {
    // filter recipe func
    if (allFilters.length) {
      setPageNum(1);
      handleFilterRecipes(allFilters, filterRecipe, 1, dataLimit, true);
    } else {
      if (debounceSearchTerm.length) {
        handleSearchRecipes(debounceSearchTerm, searchRecipe);
      } else {
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
    if (isMounted.current) {
      // search recipe func
      if (debounceSearchTerm.length) {
        handleSearchRecipes(debounceSearchTerm, searchRecipe);
      } else {
        if (allFilters.length) {
          setPageNum(1);
          handleFilterRecipes(allFilters, filterRecipe, 1, dataLimit, true);
        } else {
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
    <>
      <AContainer
        showCollectionTray={{ show: true, showTagByDeafult: true }}
        showRecipeFilterTray={{
          show: true,
          showPanle: "left",
          showTagByDeafult: false,
        }}
        headerTitle="Discovery"
        showCommentsTray={{
          show: true,
          showPanle: "right",
          showTagByDeafult: false,
        }}
      >
        <div
          className={styles.main__div}
          style={{
            marginLeft: openFilterTray ? "310px" : "0px",
            transition: "all 0.3s",
          }}
        >
          <div>
            <DiscoveryPageSearchBar
              input={recipeSearchInput}
              handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setRecipeSearchInput(e.target.value);
              }}
            />

            {allFilters?.length ? (
              <SearchTagsComponent allFilters={allFilters} />
            ) : null}
          </div>
          {showFilterOrSearchRecipes ? (
            <ShowRecipeContainer
              data={allFilterRecipes.filterRecipes}
              loading={filterRecipesLoading || searchRecipeLoading}
              closeHandler={closeFilterRecipes}
              showItems="recipe"
              showDefaultLeftHeader
              showDefaultMiddleHeader={
                allFilterRecipes.filterRecipes.length ? true : false
              }
              showDefaultRightHeader
              hasMore={allFilterRecipes?.totalItems > dataLimit * pageNum}
              totalDataCount={allFilterRecipes?.totalItems}
              nextPage={() => {
                setPageNum((page) => page + 1);
                handleFilterRecipes(
                  allFilters,
                  filterRecipe,
                  pageNum + 1,
                  dataLimit,
                  false,
                );
              }}
            />
          ) : (
            <RegularRecipes setOpenCollectionModal={setOpenCollectionModal} />
          )}
        </div>
        <div className={styles.footerMainDiv}>
          <FooterRecipeFilter />
        </div>
      </AContainer>
      <ShowLastModifiedCollection
        open={openCollectionModal}
        setOpen={setOpenCollectionModal}
        shouldCloseOnOverlayClick={true}
        lastModifiedCollectionName={lastModifiedCollection?.name}
        openCollectionPanel={handleOpenCollectionTray}
      />
    </>
  );
};

export default RecipeDiscovery;
