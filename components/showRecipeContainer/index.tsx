import React from "react";
import useLocalStorage from "../../customHooks/useLocalStorage";
import DatacardComponent from "../../theme/cards/dataCard/dataCard.component";
import SkeletonCollectionRecipe from "../../theme/skeletons/skeletonCollectionRecipe/SkeletonCollectionRecipe";
import { RecipeType } from "../../type/recipeType";
import ErrorPage from "../pages/404Page";
import styles from "./index.module.scss";

interface Props {
  data: RecipeType[];
  loading: boolean;
  headerLeftSide?: React.ReactChild | null;
  headerRightSide?: React.ReactChild | null;
  headerMiddle?: React.ReactChild | null;
  setOpenCollectionModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowRecipeContainer = ({
  data = [],
  loading = false,
  headerLeftSide = null,
  headerRightSide = null,
  headerMiddle = null,
  setOpenCollectionModal = () => {},
}: Props) => {
  const [compareRecipeList, setcompareRecipeList] = useLocalStorage<any>(
    "compareList",
    [],
  );

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
        {headerLeftSide}
        {headerMiddle}
        {headerRightSide}
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
    </div>
  );
};

export default ShowRecipeContainer;
