import React from "react";
import CircularRotatingLoader from "../../../theme/loader/circularRotatingLoader.component";
import styles from "../../../components/recipe/recipeDetails/center/Center.module.scss";
import { useMutation } from "@apollo/client";
import { ADD_GROCERY_ITEM, DELETE_CART_ITEM } from "../../../graphql/Cart";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  addGrocery,
  deleteCartIngredients,
} from "../../../redux/slices/Cart.slice";
import Publish from "../../../helpers/Publish";
import { RecipeDetailsType } from "../../../type/recipeDetailsType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShoppingSimple,
  faCartPlus,
  faChartSimple,
  faCircleInfo,
} from "@fortawesome/pro-light-svg-icons";
import Tooltip from "../../../theme/toolTip/CustomToolTip";
import { useUser } from "../../../context/AuthProvider";
import {
  ImageWithFallback,
  NextImageWithFallback,
} from "../../../theme/imageWithFallback";

const scaleMenu = [
  { label: ".5x", value: 0.5 },
  { label: "1x", value: 1 },
  { label: "2x", value: 2 },
];

interface IngredientDetailsProps {
  counter?: any;
  setCounter?: any;
  recipeData?: RecipeDetailsType;
  nutritionState?: any;
  setIngredientId?: any;
  setNutritionState?: any;
}

const IngredientDetails = (props: IngredientDetailsProps) => {
  const {
    counter,
    setCounter,
    recipeData,
    nutritionState,
    setIngredientId,
    setNutritionState,
  } = props;

  const [addGroceryList, groceryState] = useMutation(ADD_GROCERY_ITEM, {
    refetchQueries: ["GetCartData"],
  });
  const [deleteCartItem, deleteState] = useMutation(DELETE_CART_ITEM, {
    refetchQueries: ["GetCartData"],
  });

  const dispatch = useAppDispatch();
  const user = useUser();
  const groceries = useAppSelector((state) => state.cart.groceries);

  const windowScrollToZero = (elem = {}) => {
    window.scrollBy(0, 0);
    setNutritionState(elem);
  };

  const addToCartHandler = async (ingredient) => {
    const variables: any = {
      data: {
        memberId: user.id,
        ingredients: [
          {
            ingredientId: ingredient?.ingredientId._id,
            selectedPortion: ingredient?.selectedPortion?.name,
            quantity: parseFloat(ingredient?.selectedPortion?.quantity),
          },
        ],
      },
    };
    await addGroceryList({
      variables,
    });
  };

  const removeFromCartHandler = async (ingredient) => {
    const variables = {
      userId: user.id,
      groceries: [ingredient?.ingredientId._id],
      pantries: [],
      staples: [],
    };
    await Publish({
      mutate: deleteCartItem,
      variables: variables,
      state: deleteState,
      success: `Deleted ingredient from grocery Successfully`,
      onSuccess: () => {
        dispatch(
          deleteCartIngredients({
            ingredients: variables,
          }),
        );
      },
    });
  };

  return (
    <div className={styles.ingredentContainer}>
      <div className={styles.ingredentHeader}>
        <img src="/images/basket.svg" alt="basket" />
        <h3>Ingredients</h3>
      </div>
      <div className={styles.counterBox}>
        <div className={styles.counter}>
          <p>Scaling : </p>

          <div className={styles.tab}>
            {scaleMenu?.map((item, index) => {
              return (
                <div
                  key={item?.value}
                  className={`${styles.menu} ${
                    counter === item?.value ? styles.active : null
                  }`}
                  onClick={() => setCounter(item?.value)}
                >
                  {item?.label}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.size}>
          <p>Volume : </p>
          <span>
            {Math.round(
              parseInt(
                `${recipeData?.tempVersionInfo?.version?.servingSize}`,
              ) || 1 * counter,
            )}{" "}
            oz
          </span>
        </div>
        <div className={styles.usMatric}>
          <span>US</span>
          <p>| Metric</p>
        </div>
      </div>
      <div className={styles.ingredentDisContainer}>
        {recipeData?.tempVersionInfo?.version?.ingredients?.map(
          (ingredient, index) => {
            const addedToCart = groceries.some(
              (grocery) =>
                grocery?.ingredientId?._id === ingredient?.ingredientId?._id,
            );
            const isIngredientStatusOk = ingredient?.ingredientStatus === "ok";
            return (
              <div
                className={styles.singleIngredent}
                key={ingredient?.ingredientId?._id || index}
              >
                <div className={styles.leftSide}>
                  {isIngredientStatusOk ? (
                    ingredient?.ingredientId?.featuredImage ||
                    ingredient?.ingredientId?.images?.length ? (
                      <NextImageWithFallback
                        src={
                          ingredient?.ingredientId?.featuredImage ||
                          ingredient?.ingredientId?.images[0]
                        }
                        fallbackSrc="/food/chard.png"
                        alt="icon"
                        width={28}
                        height={28}
                      />
                    ) : (
                      <span className={styles.imageBox}>
                        <FontAwesomeIcon icon={faBasketShoppingSimple} />
                      </span>
                    )
                  ) : (
                    <span className={styles.imageBox}>
                      <FontAwesomeIcon icon={faBasketShoppingSimple} />
                    </span>
                  )}

                  {isIngredientStatusOk ? (
                    <div>
                      {`${(ingredient?.selectedPortion?.quantity * counter)
                        .toFixed(2)
                        .replace(/\.?0+$/, "")}
                  ${ingredient.selectedPortion?.name} `}

                      <span
                        className={`${styles.leftSide__highlighted} ${
                          ingredient?.ingredientId?._id ===
                            nutritionState?.ingredientId?._id &&
                          "activeColorPrimary"
                        }`}
                        onClick={() => {
                          windowScrollToZero(
                            ingredient?.ingredientId?._id ===
                              nutritionState?.ingredientId?._id
                              ? {}
                              : ingredient,
                          );
                        }}
                      >
                        {ingredient?.ingredientId?.ingredientName}
                      </span>
                      {ingredient?.comment && (
                        <span>{`, ${ingredient?.comment}`}</span>
                      )}
                    </div>
                  ) : (
                    <div
                      className={`${styles.leftSide__ingredient_partial_ok}`}
                    >
                      {ingredient?.errorString}
                    </div>
                  )}
                </div>

                {isIngredientStatusOk && (
                  <div className={`${styles.iconGroup}`}>
                    <div className={`${"flex"}`}>
                      <Tooltip direction="top" content="Wiki">
                        <FontAwesomeIcon
                          icon={faCircleInfo}
                          className={styles.icon}
                          onClick={() =>
                            setIngredientId(ingredient?.ingredientId?._id)
                          }
                        />
                      </Tooltip>

                      <Tooltip direction="top" content="Nutation">
                        <FontAwesomeIcon
                          icon={faChartSimple}
                          className={`${styles.icon} ${
                            ingredient?.ingredientId?._id ===
                              nutritionState?.ingredientId?._id &&
                            "activeColorPrimary"
                          }`}
                          onClick={() => {
                            windowScrollToZero(
                              ingredient?.ingredientId?._id ===
                                nutritionState?.ingredientId?._id
                                ? {}
                                : ingredient,
                            );
                          }}
                        />
                      </Tooltip>
                      <Tooltip direction="top" content="Grocery">
                        <FontAwesomeIcon
                          icon={faCartPlus}
                          className={`${styles.icon} ${
                            addedToCart ? styles["icon--active"] : ""
                          }`}
                          // onClick={() =>
                          //   addedToCart
                          //     ? removeFromCartHandler(ingredient)
                          //     : addToCartHandler(ingredient)
                          // }
                          onClick={() => addToCartHandler(ingredient)}
                        />
                      </Tooltip>
                    </div>
                  </div>
                )}
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};

export default IngredientDetails;
