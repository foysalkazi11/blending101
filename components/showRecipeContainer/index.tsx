import {
  faBookmark,
  faShareNodes,
  faXmark,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import useLocalStorage from "../../customHooks/useLocalStorage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setChangeRecipeWithinCollection,
  setSingleRecipeWithinCollecions,
} from "../../redux/slices/collectionSlice";
import { setOpenCollectionsTary } from "../../redux/slices/sideTraySlice";
import DatacardComponent from "../../theme/cards/dataCard/dataCard.component";
import IconWarper from "../../theme/iconWarper/IconWarper";
import SkeletonCollectionRecipe from "../../theme/skeletons/skeletonCollectionRecipe/SkeletonCollectionRecipe";
import { RecipeType } from "../../type/recipeType";
import ErrorPage from "../pages/404Page";
import ShowLastModifiedCollection from "../showLastModifiedCollection/ShowLastModifiedCollection";
import styles from "./index.module.scss";

interface Props {
  data: RecipeType[];
  loading: boolean;
  headerLeftSide?: React.ReactChild | null;
  headerRightSide?: React.ReactChild | null;
  headerMiddle?: React.ReactChild | null;
  closeHandler?: () => void;
}

const ShowRecipeContainer = ({
  data = [],
  loading = false,
  headerLeftSide = null,
  headerRightSide = null,
  headerMiddle = null,
  closeHandler = () => {},
}: Props) => {
  const [compareRecipeList, setcompareRecipeList] = useLocalStorage<any>(
    "compareList",
    [],
  );
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const { lastModifiedCollection } = useAppSelector(
    (state) => state?.collections,
  );
  const dispatch = useAppDispatch();

  // open recipe collection panel after added a recipe to a collection
  const handleOpenCollectionTray = () => {
    dispatch(setSingleRecipeWithinCollecions([lastModifiedCollection?.id]));
    dispatch(setOpenCollectionsTary(true));
    dispatch(setChangeRecipeWithinCollection(true));
    setOpenCollectionModal(false);
  };

  if (loading) {
    return (
      <div className={styles.showRecipeCollectionsContainer}>
        <SkeletonCollectionRecipe />
      </div>
    );
  }

  return (
    <div className={styles.showRecipeCollectionsContainer}>
      <div className={styles.showRecipeCollectionsHeader}>
        {headerLeftSide || (
          <p style={{ color: "#ababab" }}>
            <span style={{ fontWeight: "600" }}>{data?.length}</span> results
          </p>
        )}
        {headerMiddle || (
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
        )}
        {headerRightSide || (
          <IconWarper
            iconColor="iconColorWhite"
            defaultBg="primary"
            hover="bgPrimary"
            style={{ width: "28px", height: "28px" }}
            handleClick={closeHandler}
          >
            <FontAwesomeIcon icon={faXmark} />
          </IconWarper>
        )}
      </div>

      {data?.length ? (
        <div className={styles.showRecipes}>
          {data?.map((item, index) => {
            let ingredients = [];
            item?.ingredients?.forEach((ing) => {
              const ingredient = ing?.ingredientId?.ingredientName;
              ingredients.push(ingredient);
            });
            const ing = ingredients.toString();
            return (
              <DatacardComponent
                key={index}
                title={item.name}
                ingredients={ing}
                category={item.recipeBlendCategory?.name}
                ratings={item?.averageRating}
                noOfRatings={item?.numberOfRating}
                carbs={item.carbs}
                score={item.score}
                calorie={item.calorie}
                noOfComments={item?.numberOfRating}
                image={item.image[0]?.image}
                recipeId={item?._id}
                notes={item?.notes}
                addedToCompare={item?.addedToCompare}
                compareRecipeList={compareRecipeList}
                setcompareRecipeList={setcompareRecipeList}
                setOpenCollectionModal={setOpenCollectionModal}
                isCollectionIds={item?.userCollections}
                isMatch={item?.isMatch}
                postfixTitle={item?.defaultVersion?.postfixTitle}
                userId={item?.userId}
              />
            );
          })}
        </div>
      ) : (
        <ErrorPage
          errorMessage="No recipes found, search again !!!"
          image="/icons/empty_data.svg"
          showBackIcon={false}
          showHomeIcon={false}
          imageHight={250}
          imageWidth={250}
          style={{ height: "40vh" }}
        />
      )}
      <ShowLastModifiedCollection
        open={openCollectionModal}
        setOpen={setOpenCollectionModal}
        shouldCloseOnOverlayClick={true}
        lastModifiedCollectionName={lastModifiedCollection?.name}
        openCollectionPanel={handleOpenCollectionTray}
      />
    </div>
  );
};

export default ShowRecipeContainer;
