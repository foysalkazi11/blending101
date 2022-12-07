/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import AContainer from "../../../containers/A.container";
import styles from "./recipeDiscovery.module.scss";
import DiscoverPageSearch from "./discoverPageSearch/DiscoverPageSearch.Component";
import SearchTagsComponent from "../../searchtags/searchtags.component";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import FooterRecipeFilter from "../../footer/footerRecipeFilter.component";
import ShowCollectionModal from "../../showModal/ShowCollectionModal";
import RegularRecipes from "./regularRecipes";
import ShowSearchRecipes from "./showSearchRecipes";
import SEARCH_RECIPE from "../../../gqlLib/recipes/queries/searchRecipe";
import { useLazyQuery } from "@apollo/client";
import useDebounce from "../../../customHooks/useDebounce";
import {
  resetAllFilters,
  updateAllFilterRecipes,
} from "../../../redux/slices/filterRecipeSlice";
import FILTER_RECIPE from "../../../gqlLib/recipes/queries/filterRecipe";
import useFetchGetRecipesByBlendAndIngredients from "./helperFunc/useFetchGetRecipesByBlendAndIngredients";
import useHandleSearchRecipe from "./helperFunc/useSearchRecipes";

const RecipeDiscovery = () => {
  const [recipeSearchInput, setRecipeSearchInput] = useState("");
  const { openFilterTray } = useAppSelector((state) => state.sideTray);
  const { allFilters, allFilterRecipes } = useAppSelector(
    (state) => state?.filterRecipe,
  );
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

  useEffect(() => {
    if (isMounted.current) {
      // filter recipe func
      if (allFilters.length) {
        handleFilterRecipes(allFilters, filterRecipe);
      } else {
        dispatch(
          updateAllFilterRecipes({
            filterRecipes: [],
            isFiltering: false,
          }),
        );
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFilters]);

  // close filter or search recipes

  const closeFilterRecipes = () => {
    dispatch(
      updateAllFilterRecipes({
        filterRecipes: [],
        isFiltering: false,
      }),
    );
    dispatch(resetAllFilters());
  };

  useEffect(() => {
    if (isMounted.current) {
      // search recipe func
      if (debounceSearchTerm.length) {
        handleSearchRecipes(debounceSearchTerm, searchRecipe);
      } else {
        dispatch(
          updateAllFilterRecipes({
            filterRecipes: [],
            isFiltering: false,
          }),
        );
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
        filterTray={true}
        showCommentsTray={{
          show: true,
          showPanle: "right",
          showTagByDeafult: false,
        }}
      >
        <div className={styles.main__div}>
          <div
            style={{
              marginLeft: openFilterTray ? "310px" : "16px",
              transition: "all 0.5s",
            }}
          >
            <DiscoverPageSearch
              input={recipeSearchInput}
              handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setRecipeSearchInput(e.target.value);
              }}
            />

            {allFilters?.length ? (
              <SearchTagsComponent allFilters={allFilters} />
            ) : null}
          </div>
          {allFilterRecipes.filterRecipes.length ||
          allFilterRecipes.isFiltering ? (
            <ShowSearchRecipes
              recipes={allFilterRecipes.filterRecipes}
              loading={filterRecipesLoading || searchRecipeLoading}
              setOpenCollectionModal={setOpenCollectionModal}
              closeHandler={closeFilterRecipes}
            />
          ) : (
            <RegularRecipes setOpenCollectionModal={setOpenCollectionModal} />
          )}
        </div>
        <div className={styles.footerMainDiv}>
          <FooterRecipeFilter />
        </div>
      </AContainer>
      <ShowCollectionModal
        open={openCollectionModal}
        setOpen={setOpenCollectionModal}
        shouldCloseOnOverlayClick={true}
      />
    </>
  );
};

export default RecipeDiscovery;
