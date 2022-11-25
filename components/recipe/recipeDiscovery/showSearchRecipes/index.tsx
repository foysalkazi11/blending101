import { faShareNodes, faXmark } from "@fortawesome/pro-regular-svg-icons";
import { faBookmark } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
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
  closeHandler?: () => void;
}

const ShowSearchRecipes = ({
  setOpenCollectionModal = () => {},
  loading = false,
  recipes = [],
  headerLeftSide,
  headerMiddle,
  headerRightSide,
  closeHandler,
}: ShowSearchRecipesType) => {
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
              iconColor="iconColorPrimary"
              defaultBg="slightGray"
              hover="bgPrimary"
              style={{ width: "28px", height: "28px", marginRight: "10px" }}
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
        )
      }
      headerRightSide={
        headerRightSide || (
          <IconWarper
            iconColor="iconColorWhite"
            defaultBg="primary"
            hover="bgPrimary"
            style={{ width: "28px", height: "28px" }}
            handleClick={closeHandler}
          >
            <FontAwesomeIcon icon={faXmark} />
          </IconWarper>
        )
      }
    />
  );
};

export default ShowSearchRecipes;
