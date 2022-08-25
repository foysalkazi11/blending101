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

function FilterPageBottom({ blends, ingredients, filters }) {
  const [getRecipesByBlendAndIngredients, { data, loading }] = useLazyQuery(
    GET_RECIPES_BY_BLEND_AND_INGREDIENTS,
    { fetchPolicy: "network-only" },
  );
  const { dbUser } = useAppSelector((state) => state?.user);
  const { allFilterRecipe } = useAppSelector((state) => state?.recipe);
  const dispatch = useAppDispatch();
  const [compareRecipeList, setcompareRecipeList] = useLocalStorage<any>(
    "compareList",
    [],
  );
  const [openCollectionModal, setOpenCollectionModal] = useState(false);

  const fetchGetRecipesByBlendAndIngredients = async () => {
    let arr = [];
    blends?.forEach((blend) => {
      arr?.push(`${blend?.id}`);
    });
    let ingredientIds: string[] = [];
    ingredients?.forEach((blend) => {
      ingredientIds?.push(blend?.id);
    });
    dispatch(setLoading(true));
    try {
      const { data } = await getRecipesByBlendAndIngredients({
        variables: {
          data: {
            userId: dbUser?._id,
            blendTypes: arr,
            includeIngredientIds: ingredientIds?.length ? ingredientIds : [],
          },
        },
      });

      dispatch(setAllFilterRecipe(data?.getAllRecipesByBlendCategory || []));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchGetRecipesByBlendAndIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blends, ingredients]);

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
