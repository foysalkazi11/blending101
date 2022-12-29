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
import IconWarper from "../../../theme/iconWarper/IconWarper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faShareNodes } from "@fortawesome/pro-regular-svg-icons";

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
      handleFilterRecipes(allFilters, filterRecipe);
    } else {
      dispatch(
        updateAllFilterRecipes({
          filterRecipes: [],
          isFiltering: false,
        }),
      );
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
          {allFilterRecipes.filterRecipes.length ||
          filterRecipesLoading ||
          searchRecipeLoading ? (
            <ShowRecipeContainer
              data={allFilterRecipes.filterRecipes}
              loading={filterRecipesLoading || searchRecipeLoading}
              closeHandler={closeFilterRecipes}
              showItems="recipe"
              headerMiddle={
                <div style={{ display: "flex" }}>
                  <IconWarper
                    iconColor="iconColorPrimary"
                    defaultBg="slightGray"
                    hover="bgPrimary"
                    style={{
                      width: "28px",
                      height: "28px",
                      marginRight: "10px",
                    }}
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
              }
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
