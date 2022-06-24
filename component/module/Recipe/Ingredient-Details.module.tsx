import React from "react";
import { BiBarChart } from "react-icons/bi";
import { BsCartPlus } from "react-icons/bs";
import { MdOutlineInfo } from "react-icons/md";
import { setNutritionState } from "../../../redux/edit_recipe/quantity";
import CircularRotatingLoader from "../../../theme/loader/circularRotatingLoader.component";

import styles from "../../../components/recipe/recipeDetails/center/Center.module.scss";
import { useMutation } from "@apollo/client";
import {
  ADD_GROCERY_ITEM,
  DELETE_CART_ITEM,
} from "../../../graphql/GroceryPantry";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  addGrocery,
  deleteCartIngredients,
} from "../../../redux/slices/Cart.slice";
import Publish from "../../../helpers/Publish";

const scaleMenu = [
  { label: ".5x", value: 0.5 },
  { label: "1x", value: 1 },
  { label: "2x", value: 2 },
];

const IngredientDetails = (props) => {
  const {
    counter,
    setCounter,
    recipeData,
    nutritionState,
    setIngredientId,
    singleElement,
    setsingleElement,
  } = props;

  const [addGroceryList, groceryState] = useMutation(ADD_GROCERY_ITEM);
  const [deleteCartItem, deleteState] = useMutation(DELETE_CART_ITEM);

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.dbUser);
  const groceries = useAppSelector((state) => state.cart.groceries);

  const addToCartHandler = async (ingredient) => {
    const variables: any = {
      data: {
        memberId: userId._id,
        ingredients: [
          {
            ingredientId: ingredient?.ingredientId._id,
            selectedPortion: ingredient?.selectedPortion?.name,
            quantity: parseFloat(ingredient?.selectedPortion?.quantity),
          },
        ],
      },
    };

    console.log(ingredient);

    await Publish({
      mutate: addGroceryList,
      variables: variables,
      state: groceryState,
      success: `Added ingredient to grocery Successfully`,
      onSuccess: () => {
        dispatch(
          addGrocery({
            ingredientId: {
              _id: ingredient?.ingredientId._id,
              ingredientName: ingredient?.ingredientId?.ingredientName,
              featuredImage:
                ingredient?.ingredientId?.featuredImage ||
                ingredient?.ingredientId?.images[0] ||
                "",
            },
            selectedPortion: ingredient?.selectedPortion?.name,
            quantity: parseFloat(ingredient?.selectedPortion?.quantity),
          }),
        );
      },
    });
  };

  const removeFromCartHandler = async (ingredient) => {
    const variables = {
      userId: userId._id,
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
            {Math.round(parseInt(recipeData?.servingSize) * counter)} 0z
          </span>
        </div>
        <div className={styles.usMatric}>
          <span>US</span>
          <p>| Metric</p>
        </div>
      </div>
      <div className={styles.ingredentDisContainer}>
        {recipeData?.ingredients ? (
          recipeData?.ingredients?.map((ingredient) => {
            const addedToCart = groceries.some(
              (grocery) =>
                grocery.ingredientId._id === ingredient?.ingredientId._id,
            );
            console.log(addedToCart);
            return (
              <div
                className={styles.singleIngredent}
                key={ingredient?.ingredientId._id}
              >
                <div className={styles.leftSide}>
                  {ingredient?.ingredientId?.featuredImage ||
                  ingredient?.ingredientId?.images?.length ? (
                    <img
                      src={
                        ingredient?.ingredientId?.featuredImage ||
                        ingredient?.ingredientId?.images[0]
                      }
                      alt="icon"
                    />
                  ) : (
                    <img src="/images/5-2-avocado-png-hd.png" alt="icon" />
                  )}

                  <div>
                    {`${ingredient?.selectedPortion?.quantity * counter}
                  ${ingredient.selectedPortion.name} `}
                    {ingredient?.ingredientId?._id ===
                    nutritionState?.ingredientId?._id ? (
                      <span
                        className={styles.leftSide__highlighted}
                        style={{ color: "#fe5d1f" }}
                        onClick={() => {
                          window.scrollBy(0, 0);
                          setNutritionState({});
                        }}
                      >
                        {ingredient?.ingredientId?.ingredientName}
                      </span>
                    ) : (
                      <span
                        className={styles.leftSide__highlighted}
                        onClick={() => {
                          window.scrollBy(0, 0);
                          setNutritionState(ingredient);
                        }}
                      >
                        {ingredient?.ingredientId?.ingredientName}
                      </span>
                    )}
                  </div>
                </div>
                {ingredient?.ingredientId?._id ===
                nutritionState?.ingredientId?._id ? (
                  <div className={styles.iconGroup} style={{ display: "flex" }}>
                    <MdOutlineInfo
                      className={styles.icon}
                      onClick={() =>
                        setIngredientId(ingredient?.ingredientId?._id)
                      }
                    />

                    <BiBarChart
                      style={{ color: "#fe5d1f" }}
                      className={styles.icon}
                      onClick={() => {
                        setsingleElement(!singleElement);
                        setNutritionState({});
                      }}
                    />
                    <BsCartPlus
                      className={styles.icon}
                      onClick={() => addToCartHandler(ingredient)}
                    />
                  </div>
                ) : (
                  <div className={styles.iconGroup}>
                    <MdOutlineInfo
                      className={styles.icon}
                      onClick={() =>
                        setIngredientId(ingredient?.ingredientId?._id)
                      }
                    />

                    <BiBarChart
                      className={styles.icon}
                      onClick={() => {
                        window.scrollBy(0, 0);
                        setsingleElement(true);
                        setNutritionState(ingredient);
                      }}
                    />

                    <BsCartPlus
                      className={`${styles.icon} ${
                        addedToCart ? styles["icon--active"] : ""
                      }`}
                      onClick={() =>
                        addedToCart
                          ? removeFromCartHandler(ingredient)
                          : addToCartHandler(ingredient)
                      }
                    />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div style={{ margin: "30px 0px" }}>
            <CircularRotatingLoader />
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientDetails;
