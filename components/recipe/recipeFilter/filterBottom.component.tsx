import React, { useEffect, useState } from "react";
import styles from "./recipe.module.scss";
import Image from "next/image";
import DatacardComponent from "../../../theme/cards/dataCard/dataCard.component";
import { useLazyQuery } from "@apollo/client";
import GET_RECIPES_BY_BLEND_AND_INGREDIENTS from "../../../gqlLib/recipes/queries/getRecipesByBlaendAndIngredients";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setLoading } from "../../../redux/slices/utilitySlice";

function FilterPageBottom({ blends, ingredients, filters }) {
  const [recommended, setRecommended] = useState([]);
  const [getRecipesByBlendAndIngredients, { data, loading }] = useLazyQuery(
    GET_RECIPES_BY_BLEND_AND_INGREDIENTS,
    { fetchPolicy: "network-only" }
  );
  const { dbUser } = useAppSelector((state) => state?.user);
  const dispatch = useAppDispatch();

  const fetchGetRecipesByBlendAndIngredients = () => {
    let arr = [];
    blends?.forEach((blend) => {
      arr?.push(`${blend?.id}`);
    });
    let ingredientIds: string[] = [];
    ingredients?.forEach((blend) => {
      ingredientIds?.push(blend?.id);
    });
    try {
      getRecipesByBlendAndIngredients({
        variables: {
          data: {
            userId: dbUser?._id,
            blendTypes: arr,
            includeIngredientIds: ingredientIds?.length ? ingredientIds : [],
          },
        },
      });
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    if (loading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    fetchGetRecipesByBlendAndIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blends, ingredients]);

  useEffect(() => {
    if (!loading) {
      setRecommended(data?.getAllRecipesByBlendCategory || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.mainDiv__results}>
        <div className={styles.mainDiv__results__heading}>
          <div className={styles.mainDiv__results__heading__left}>
            {recommended.length} results
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
            {recommended?.length
              ? recommended?.map((item, index) => {
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
  );
}

export default FilterPageBottom;
