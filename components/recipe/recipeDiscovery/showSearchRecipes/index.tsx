import {
  faChartTreeMap,
  faShareNodes,
  faXmark,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  resetAllFilters,
  updateAllFilterRecipes,
} from "../../../../redux/slices/filterRecipeSlice";
import IconWarper from "../../../../theme/iconWarper/IconWarper";
import { RecipeType } from "../../../../type/recipeType";
import ShowRecipeContainer from "../../../showRecipeContainer";

interface ShowSearchRecipesType {
  recipes?: RecipeType[];
  loading?: boolean;
  setOpenCollectionModal: React.Dispatch<React.SetStateAction<boolean>>;
  headerRightSide?: React.ReactChild | string | null;
  headerLeftSide?: React.ReactChild | string | null;
  headerMiddle?: React.ReactChild | string | null;
}

const ShowSearchRecipes = ({
  setOpenCollectionModal = () => {},
  loading = false,
  recipes = [],
  headerLeftSide,
  headerMiddle,
  headerRightSide,
}: ShowSearchRecipesType) => {
  const dispatch = useAppDispatch();

  return (
    <ShowRecipeContainer
      data={recipes || []}
      loading={loading}
      setOpenCollectionModal={setOpenCollectionModal}
      headerLeftSide={
        headerLeftSide || (
          <p style={{ color: "#ababab" }}>
            <span style={{ fontWeight: "600" }}>{recipes?.length}</span> results
          </p>
        )
      }
      headerMiddle={
        headerMiddle || (
          <div style={{ display: "flex" }}>
            <IconWarper
              defaultBg="slightGray"
              hover="bgPrimary"
              style={{ width: "28px", height: "28px", marginRight: "10px" }}
            >
              <FontAwesomeIcon icon={faChartTreeMap} />
            </IconWarper>
            <IconWarper
              defaultBg="slightGray"
              hover="bgPrimary"
              style={{ width: "28px", height: "28px" }}
            >
              <FontAwesomeIcon icon={faShareNodes} />
            </IconWarper>
          </div>
        )
      }
      headerRightSide={
        headerRightSide || (
          <IconWarper
            defaultBg="slightGray"
            hover="bgPrimary"
            style={{ width: "28px", height: "28px" }}
            handleClick={() => {
              dispatch(
                updateAllFilterRecipes({
                  filterRecipes: [],
                  isFiltering: false,
                }),
              );
              dispatch(resetAllFilters());
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </IconWarper>
        )
      }
    />
  );
};

export default ShowSearchRecipes;
