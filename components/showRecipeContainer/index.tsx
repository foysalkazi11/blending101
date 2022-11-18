import React from "react";
import DatacardComponent from "../../theme/cards/dataCard/dataCard.component";
import SkeletonCollectionRecipe from "../../theme/skeletons/skeletonCollectionRecipe/SkeletonCollectionRecipe";
import { RecipeType } from "../../type/recipeType";

import styles from "./index.module.scss";

interface Props {
  data: RecipeType[];
  loading: boolean;
  headerLestSide?: React.ReactChild | null;
  headerRightSide?: React.ReactChild | null;
}

const ShowRecipeContainer = ({
  data = [],
  loading = false,
  headerLestSide = null,
  headerRightSide = null,
}: Props) => {
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
        {headerLestSide}

        {headerRightSide}
      </div>
      <div className={styles.showRecipes}>
        {data?.length
          ? data?.map((item, index) => {
              let ingredients = [];
              item?.ingredients?.forEach((ing) => {
                const ingredient = ing?.ingredientId?.ingredientName;
                ingredients.push(ingredient);
              });
              const ing = ingredients.toString();
              return (
                <div key={index}>
                  <DatacardComponent
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
                    // compareRecipeList={compareRecipeList}
                    // setcompareRecipeList={setcompareRecipeList}
                    isCollectionIds={item?.userCollections}
                    isMatch={item?.isMatch}
                    postfixTitle={item?.defaultVersion?.postfixTitle}
                    userId={item?.userId}
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default ShowRecipeContainer;
