import React, { useEffect, useState } from "react";
import styles from "./recipe.module.scss";
import Image from "next/image";
import DatacardComponent from "../../../theme/cards/dataCard/dataCard.component";
import { useLazyQuery } from "@apollo/client";
import GET_RECIPES_BY_BLEND_AND_INGREDIENTS from "../../../gqlLib/recipes/queries/getRecipesByBlaendAndIngredients";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setLoading } from "../../../redux/slices/utilitySlice";
import useLocalStorage from "../../../customHooks/useLocalStorage";
import ShowCollectionModal from "../../showModal/ShowCollectionModal";
import { setAllFilterRecipe } from "../../../redux/slices/recipeSlice";
import FILTER_RECIPE from "../../../gqlLib/recipes/queries/filterRecipe";
import {
  FilterCriteriaValue,
  FilterCriteriaOptions,
} from "../../../redux/slices/filterRecipeSlice";

interface Props {
  allFilters: FilterCriteriaValue[];
}

function FilterPageBottom({ allFilters = [] }: Props) {
  const [filterRecipe, { data, loading }] = useLazyQuery(FILTER_RECIPE, {
    fetchPolicy: "network-only",
  });
  const { dbUser } = useAppSelector((state) => state?.user);
  const { allFilterRecipe } = useAppSelector((state) => state?.recipe);
  const dispatch = useAppDispatch();
  const [compareRecipeList, setcompareRecipeList] = useLocalStorage<any>(
    "compareList",
    [],
  );
  const [openCollectionModal, setOpenCollectionModal] = useState(false);

  const fetchGetRecipesByBlendAndIngredients = async () => {
    let blendTypesArr: string[] = allFilters
      .filter((filter) => filter.filterCriteria === "blendTypes")
      ?.map((item) => item.id);
    let ingredientIds: string[] = allFilters
      .filter((filter) => filter.filterCriteria === "includeIngredientIds")
      ?.map((item) => item.id);
    let nutrientFiltersMap = allFilters
      .filter((filter) => filter.filterCriteria === "nutrientFilters")
      ?.map(
        ({
          id,
          name,
          //@ts-ignore
          between,
          //@ts-ignore
          category,
          //@ts-ignore
          greaterThan,
          //@ts-ignore
          lessThan,
          //@ts-ignore
          lessThanValue,
          //@ts-ignore
          greaterThanValue,
          //@ts-ignore
          betweenStartValue,
          //@ts-ignore
          betweenEndValue,
        }) => {
          let arrangeValue = {
            beetween: between,
            category: category.toLowerCase(),
            greaterThan,
            lessThan,
            nutrientId: id,
            value: 0,
            value1: 0,
            value2: 0,
          };
          if (lessThan) {
            arrangeValue = {
              ...arrangeValue,
              value: lessThanValue,
            };
          }
          if (greaterThan) {
            arrangeValue = {
              ...arrangeValue,
              value: greaterThanValue,
            };
          }
          if (between) {
            arrangeValue = {
              ...arrangeValue,
              value1: betweenStartValue,
              value2: betweenEndValue,
            };
          }

          return arrangeValue;
        },
      );

    let nutrientMatrixMap = allFilters
      .filter((filter) => filter.filterCriteria === "nutrientMatrix")
      ?.map(
        ({
          id,
          name,
          //@ts-ignore
          between,
          //@ts-ignore
          greaterThan,
          //@ts-ignore
          lessThan,
          //@ts-ignore
          lessThanValue,
          //@ts-ignore
          greaterThanValue,
          //@ts-ignore
          betweenStartValue,
          //@ts-ignore
          betweenEndValue,
        }) => {
          let arrangeValue = {
            matrixName: name.toLowerCase(),
            beetween: between,
            greaterThan,
            lessThan,
            value: 0,
            value1: 0,
            value2: 0,
          };
          if (lessThan) {
            arrangeValue = {
              ...arrangeValue,
              value: lessThanValue,
            };
          }
          if (greaterThan) {
            arrangeValue = {
              ...arrangeValue,
              value: greaterThanValue,
            };
          }
          if (between) {
            arrangeValue = {
              ...arrangeValue,
              value1: betweenStartValue,
              value2: betweenEndValue,
            };
          }

          return arrangeValue;
        },
      );
    dispatch(setLoading(true));
    try {
      const { data } = await filterRecipe({
        variables: {
          data: {
            userId: dbUser?._id,
            blendTypes: blendTypesArr,
            includeIngredientIds: ingredientIds,
            nutrientFilters: nutrientFiltersMap,
            nutrientMatrix: nutrientMatrixMap,
          },
        },
      });

      dispatch(setAllFilterRecipe(data?.filterRecipe || []));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchGetRecipesByBlendAndIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFilters]);

  return (
    <>
      <div className={styles.mainDiv}>
        <div className={styles.mainDiv__results}>
          <div className={styles.mainDiv__results__heading}>
            <div className={styles.mainDiv__results__heading__left}>
              {allFilterRecipe.length} results
            </div>
            <div className={styles.mainDiv__results__heading__right}>
              <div className={styles.mainDiv__results__heading__right__image}>
                <div>
                  <Image
                    src={"/icons/dash-icon.svg"}
                    alt=""
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
              <div className={styles.mainDiv__results__heading__right__image}>
                <div>
                  {" "}
                  <Image
                    src={"/icons/share-orange.png"}
                    alt=""
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.mainDiv__results__body}>
            <ul className={styles.mainDiv__results__body__ul}>
              {allFilterRecipe?.length
                ? allFilterRecipe?.map((item, index) => {
                    let ingredients = [];
                    item?.ingredients?.forEach((ing) => {
                      const ingredient = ing?.ingredientId?.ingredientName;
                      ingredients.push(ingredient);
                    });
                    const ing = ingredients.toString();
                    return (
                      <li
                        className={styles.mainDiv__results__body__ul__li}
                        key={"recommended" + index}
                      >
                        <div className={styles.slider__card}>
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
                            compareRecipeList={compareRecipeList}
                            setcompareRecipeList={setcompareRecipeList}
                            isCollectionIds={item?.userCollections}
                            setOpenCollectionModal={setOpenCollectionModal}
                            isMatch={item?.isMatch}
                            postfixTitle={item?.defaultVersion?.postfixTitle}
                          />
                        </div>
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        </div>
      </div>
      <ShowCollectionModal
        open={openCollectionModal}
        setOpen={setOpenCollectionModal}
        shouldCloseOnOverlayClick={true}
      />
    </>
  );
}

export default FilterPageBottom;
