/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import styles from "./CreateNewRecipe.module.scss";
import { Droppable, Draggable } from "react-beautiful-dnd";
import SectionTitleWithIcon from "../../../../theme/recipe/sectionTitleWithIcon/SectionTitleWithIcon.component";
import SingleIngredient from "../singleIngredient/SingleIngredient";
import { useLazyQuery } from "@apollo/client";
import GET_BLEND_NUTRITION_BASED_ON_RECIPE_XXX from "../../../../gqlLib/recipes/queries/getBlendNutritionBasedOnRecipeXxx";
import NutrationPanelSkeleton from "../../../../theme/skeletons/nutrationPanelSkeleton/NutrationPanelSkeleton";
import UpdatedRecursiveAccordian from "../../../customRecursiveAccordian/updatedRecursiveAccordian.component";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS from "../../../../gqlLib/ingredient/query/filterIngredientByCategroyAndClass";
import { setAllIngredients } from "../../../../redux/slices/ingredientsSlice";
import Image from "next/image";
import { FETCH_BLEND_CATEGORIES } from "../../../../gqlLib/category/queries/fetchCategories";
import { setAllCategories } from "../../../../redux/slices/categroySlice";
import { IoClose, IoCloseCircle } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineSave } from "react-icons/ai";
import useOnClickOutside from "../../../utility/useOnClickOutside";
import { useRouter } from "next/router";
import Tooltip from "../../../../theme/toolTip/CustomToolTip";
import CreateRecipeSkeleton from "../../../../theme/skeletons/createRecipeSkeleton/CreateRecipeSkeleton";
import IconWraper from "../../../../theme/iconWarper/IconWarper";
import CircularRotatingLoader from "../../../../theme/loader/circularRotatingLoader.component";
import InputComponent from "../../../../theme/input/input.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleVerticalHistory } from "@fortawesome/pro-light-svg-icons";
import { faXmark } from "@fortawesome/pro-solid-svg-icons";
import { CreateNewRecipeType } from "../../../pages/versionCompare";
import useGetBlendNutritionBasedOnRecipexxx from "../../../../customHooks/useGetBlendNutritionBasedOnRecipexxx";
import notification from "../../../utility/reactToastifyNotification";
import GET_NUTRIENT_lIST_ADN_GI_GL_BY_INGREDIENTS from "../../../../gqlLib/nutrition/query/getNutrientsListAndGiGlByIngredients";
import { GiGl } from "../../../../type/nutrationType";
import compareArrays from "../../../../helperFunc/array/compareArrays";
import IngredientAddingFormForCompare from "./ingredientAdddingFormForCompare";

interface CreateNewRecipeTypeComponentType {
  [key: string]: any;
  newRecipe: CreateNewRecipeType;
}

interface IngredientsInfo {
  ingredientId: string;
  value: number;
}

const CreateNewRecipe = ({
  newRecipe = {} as CreateNewRecipeType,
  setNewRecipe = () => {},
  setNewlyCreatedRecipe = () => {},
  newlyCreatedRecipe = {},
  copyImage = "",
  updateData = () => {},
  handleCreateNewRecipe = () => {},
  loading = false,
  closeCreateNewRecipeInterface = () => {},
  disableCategory = false,
  disableImageUpload = false,
  recipeSaveLoading = false,
  handleToOpenVersionTray = () => {},
  recipe = {},
  showTopCancelButton = true,
}: CreateNewRecipeTypeComponentType) => {
  const [winReady, setWinReady] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { allIngredients } = useAppSelector((state) => state?.ingredients);
  const [searchIngredientData, setSearchIngredientData] = useState<any[]>([]);
  const [
    getNutrientsListAndGiGlByIngredients,
    { data: nutritionData, loading: nutritionLoading },
  ] = useLazyQuery(GET_NUTRIENT_lIST_ADN_GI_GL_BY_INGREDIENTS);
  const [filterIngredientByCategroyAndClass] = useLazyQuery(
    FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS,
  );
  const [getAllBlendCategory, { loading: blendCategroyLoading }] = useLazyQuery(
    FETCH_BLEND_CATEGORIES,
  );
  const { allCategories } = useAppSelector((state) => state?.categroy);
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);
  const router = useRouter();
  const previousIngredient = useRef(null);

  // find if existing item
  const findItem = (id) => {
    return newRecipe?.ingredients?.find((item) => item?.ingredientId === id);
  };

  // fetch ingredient
  const fetchFilterIngredientByCategroyAndClass = async () => {
    try {
      const { data } = await filterIngredientByCategroyAndClass({
        variables: {
          data: {
            ingredientCategory: "All",
            IngredientClass: 1,
          },
        },
      });

      dispatch(setAllIngredients(data?.filterIngredientByCategoryAndClass));
    } catch (error) {
      console.log(error?.message);
    }
  };

  // remove ingredient by ingredientId
  const removeIngredient = (id) => {
    setNewRecipe((state) => ({
      ...state,
      ingredients: [
        ...state?.ingredients?.filter((item) => item?.ingredientId !== id),
      ],
    }));
  };

  // remove ingredient by qaid
  const removeByQaId = (id) => {
    setNewRecipe((state) => ({
      ...state,
      ingredients: [...state?.ingredients?.filter((item) => item?.qaId !== id)],
    }));
  };

  // fetch blend category
  const fetchAllBlendCategroy = async () => {
    try {
      const { data } = await getAllBlendCategory();
      dispatch(setAllCategories(data?.getAllCategories));
    } catch (error) {
      console.log(error?.message);
    }
  };

  // collect ingredient value after clicking ingredient
  const selectIngredientOnClick = (ele) => {
    const item = findItem(ele?.ingredient._id);

    if (!item) {
      // let obj = {};
      // ele?.portions?.forEach((item) => {
      //   if (item?.default) {
      //     obj["ingredientId"] = ele?._id;
      //     obj["selectedPortionName"] = item?.measurement;
      //     obj["weightInGram"] = Number(item?.meausermentWeight);
      //     obj["label"] = `${1} ${item?.measurement} ${ele?.ingredientName}`;
      //     obj["ingredientName"] = `${ele?.ingredientName}`;
      //     obj["selectedPortionQuantity"] = 1;
      //     obj["ingredientStatus"] = "ok";
      //   }
      // });

      const newIngredient = {
        ingredientId: ele?.ingredient._id,
        selectedPortionName: ele?.portion?.measurement,
        weightInGram: +ele?.portion?.meausermentWeight,
        label: `${ele?.quantity} ${ele?.portion?.measurement} ${ele?.ingredient?.ingredientName}`,
        ingredientName: `${ele?.ingredient?.ingredientName}`,
        selectedPortionQuantity: ele?.quantity,
        ingredientStatus: "ok",
        comment: `${ele?.comment}`,
      };

      setNewRecipe((state) => ({
        ...state,
        ingredients: [...state?.ingredients, newIngredient],
      }));
      setInputValue("");
    } else {
      setInputValue("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!allCategories?.length) {
      fetchAllBlendCategroy();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      if (inputValue === "") {
        setSearchIngredientData([]);
      } else {
        const filter = allIngredients?.filter((item) =>
          //@ts-ignore
          item?.ingredientName
            ?.toLowerCase()
            ?.includes(inputValue?.toLowerCase()),
        );
        setSearchIngredientData(filter);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  useEffect(() => {
    if (!allIngredients?.length) {
      fetchFilterIngredientByCategroyAndClass();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNutritionData = async (ingredientsInfo: IngredientsInfo[]) => {
    try {
      const { data } = await getNutrientsListAndGiGlByIngredients({
        variables: {
          ingredientsInfo,
        },
      });
      const nutrition = data?.getNutrientsListAndGiGlByIngredients?.nutrients
        ? JSON.parse(data?.getNutrientsListAndGiGlByIngredients?.nutrients)
        : 0;
      const giGl = data?.getNutrientsListAndGiGlByIngredients?.giGl;
      const calorie = Math.round(nutrition?.Calories?.cals?.value || 0);
      const netCarbs = Math.round(giGl?.netCarbs || 0);
      updateData({ target: { name: "calorie", value: calorie } });
      updateData({ target: { name: "netCarbs", value: netCarbs } });
    } catch (error) {
      notification("error", "failed to fetch nutrients list");
    }
  };

  useEffect(
    () => {
      const ingredientsInfo = newRecipe?.ingredients
        ?.filter((recipe) => recipe?.ingredientStatus === "ok")
        ?.map((item) => ({
          ingredientId: item?.ingredientId,
          value: item?.weightInGram,
        }));

      if (!compareArrays(previousIngredient.current || [], ingredientsInfo)) {
        fetchNutritionData(ingredientsInfo);
        previousIngredient.current = ingredientsInfo;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [newRecipe?.ingredients],
  );

  useEffect(() => {
    setWinReady(true);
  }, []);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const floatingMenu = (
    <div className={styles.floating__menu}>
      <ul>
        {newlyCreatedRecipe?.recipeId?._id ? (
          <>
            <Tooltip content="Edit view" direction="top">
              <li>
                <MdOutlineEdit
                  className={styles.icon}
                  onClick={() =>
                    router?.push(
                      `/edit_recipe/${newlyCreatedRecipe?.recipeId?._id}`,
                    )
                  }
                />
              </li>
            </Tooltip>
            {/* <Tooltip content={"Details view"} direction="right">
                <li>
                  <BiDetail
                    className={styles.icon}
                    onClick={() =>
                      router?.push(`/recipe_details/${newlyCreatedRecipe?._id}`)
                    }
                  />
                </li>
              </Tooltip> */}
          </>
        ) : null}

        <Tooltip
          content={
            newlyCreatedRecipe?.recipeId?._id ? "Update recipe" : "Save recipe"
          }
          direction="top"
        >
          <li>
            {recipeSaveLoading ? (
              <CircularRotatingLoader
                style={{ fontSize: "16px" }}
                color="secondary"
              />
            ) : (
              <AiOutlineSave
                className={styles.icon}
                onClick={(e) => handleCreateNewRecipe(e)}
              />
            )}
          </li>
        </Tooltip>
        {/* <Tooltip content={"Cancel"} direction="top">
          <li>
            <FontAwesomeIcon
              icon={faXmark}
              className={styles.icon}
              onClick={closeCreateNewRecipeInterface}
            />
          </li>
        </Tooltip> */}
      </ul>
    </div>
  );

  if (loading) {
    return <CreateRecipeSkeleton />;
  }

  return (
    <div className={styles.createNewRecipeContainer}>
      {showTopCancelButton && (
        <div className={styles.closeNewRecipeIcon}>
          <IconWraper
            defaultBg="gray"
            handleClick={closeCreateNewRecipeInterface}
          >
            <IoClose />
          </IconWraper>
        </div>
      )}

      <div className={styles.firstContainer}>
        <div className={styles.firstContainer__firstSection}>
          <div className={styles.addRecipeTitle}>
            <input
              type="text"
              name="name"
              placeholder="Add Recipe Title"
              value={newRecipe?.name}
              onChange={(e) => updateData(e)}
            />
            {/* {createNewRecipe?.name && newRecipe?.ingredients?.length ? (
              <div>
                <MdMoreVert
                  className={styles.moreIcon}
                  onClick={() => setOpenFloatingMenu((pre) => !pre)}
                />
              </div>
            ) : null}

            {openFloatingMenu ? <FloatingMenu /> : null} */}
          </div>
          <div className={styles.imageBoxContainer}>
            <div className={styles.fileUpload}>
              {newRecipe?.image?.length ? null : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => updateData(e)}
                  disabled={disableImageUpload}
                />
              )}

              <img
                className={styles.imageBox}
                src={
                  newRecipe?.image?.length
                    ? typeof newRecipe?.image[0] === "string"
                      ? newRecipe?.image[0]
                      : URL.createObjectURL(newRecipe?.image[0])
                    : "/images/black-add.svg"
                }
                alt="addIcon"
              />
              {newRecipe?.image?.length && !disableImageUpload ? (
                <IoCloseCircle
                  className={styles.cancleIcon}
                  onClick={() =>
                    setNewRecipe((state) => ({ ...state, image: [] }))
                  }
                />
              ) : null}
            </div>

            <div className={styles.dropDown}>
              <div className="flex">
                <select
                  id="cars"
                  name="recipeBlendCategory"
                  value={newRecipe?.recipeBlendCategory}
                  onChange={(e) => updateData(e)}
                  disabled={disableCategory}
                >
                  {allCategories?.map((cat) => {
                    return (
                      <option key={cat?._id} value={cat?._id}>
                        {cat?.name}
                      </option>
                    );
                  })}
                </select>
                {floatingMenu}
              </div>

              <textarea
                className="y-scroll"
                placeholder="Discripation"
                value={newRecipe?.description}
                name="description"
                onChange={(e) => updateData(e)}
              />
            </div>
          </div>
        </div>

        <div className={styles.datacard__body__belt}>
          <div className={styles.datacard__body__belt__child}>
            Net Carbs <span>{Math.round(newRecipe?.netCarbs)}</span>
          </div>
          <div className={styles.datacard__body__belt__child}>
            Rx Score <span>100</span>
          </div>
          <div className={styles.datacard__body__belt__child}>
            Calorie <span>{Math.round(newRecipe?.calorie)}</span>
          </div>
        </div>
        {/* <div
          style={{
            marginTop: "10px",
            marginRight: "10px",
            display: "flex",
            justifyContent: "flex-end",
            cursor: "pointer",
          }}
        >
          <Tooltip content={`Version`} direction="left">
            <FontAwesomeIcon
              icon={faRectangleVerticalHistory}
              color="#7cbc39"
              onClick={() =>
                handleToOpenVersionTray(
                  recipe?.recipeId?._id,
                  recipe?.defaultVersion,
                  true,
                )
              }
            />
          </Tooltip>
        </div> */}
      </div>
      <div className={styles.dividerBox}>
        <SectionTitleWithIcon
          title="Ingredients"
          icon="/images/right-blender.svg"
        />

        <IngredientAddingFormForCompare
          ingredients={newRecipe.ingredients}
          onSave={selectIngredientOnClick}
        />
        {/* <form onSubmit={handleSubmit}>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              placeholder="Search ingredients"
            />
          </form>
          <div
            className={styles.suggested}
            style={
              searchIngredientData.length === 0
                ? { display: "none" }
                : { display: "block" }
            }
          >
            <ul className={styles.suggested__ul}>
              {searchIngredientData?.map((elem) => {
                return (
                  <li
                    key={elem?._id}
                    className={styles.suggested__li}
                    onClick={() => {
                      selectIngredientOnClick(elem);
                    }}
                  >
                    {elem.featuredImage !== null ? (
                      <div className={styles.ingredientImg}>
                        <Image
                          src={elem.featuredImage}
                          alt="Picture will load soon"
                          objectFit="contain"
                          width={20}
                          height={20}
                        />
                      </div>
                    ) : (
                      <div className={styles.ingredientImg}>
                        <Image
                          src={"/food/Dandelion.png"}
                          alt="Picture will load soon"
                          objectFit="contain"
                          width={20}
                          height={20}
                          className={styles.ingredientImg}
                        />
                      </div>
                    )}

                    {elem.ingredientName}
                  </li>
                );
              })}
            </ul>
          </div> */}

        <div className={styles.dargAndDropArea}>
          {winReady ? (
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    backgroundColor: snapshot.isDraggingOver
                      ? "#f6f6f6"
                      : "#f6f6f6",
                  }}
                  className={`${styles.dropableArea} y-scroll`}
                  // isDraggingOver={snapshot.isDraggingOver}
                >
                  {newRecipe?.ingredients?.map((item, index) => (
                    <Draggable
                      key={item?.ingredientId}
                      draggableId={`${item?.ingredientId}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          style={{ left: "0px", top: "0px" }}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <SingleIngredient
                            label={item?.label}
                            showPlusIcon={false}
                            dargProps={provided.dragHandleProps}
                            showCloseIcon={true}
                            handleClose={() =>
                              item?.ingredientStatus === "ok"
                                ? removeIngredient(item?.ingredientId)
                                : removeByQaId(item?.qaId)
                            }
                            isErrorIngredient={item?.ingredientStatus !== "ok"}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ) : null}
        </div>
      </div>

      <div className={styles.dividerBox}>
        <SectionTitleWithIcon
          title="Nutrition"
          icon="/icons/chart-bar-light-green.svg"
        />
        <div className={styles.nutritionHeader}>
          <p>Amount Per Serving Calories</p>
        </div>

        <div className={styles.ingredientsDetails}>
          {nutritionLoading ? (
            <NutrationPanelSkeleton />
          ) : nutritionData?.getNutrientsListAndGiGlByIngredients?.nutrients ? (
            <UpdatedRecursiveAccordian
              dataObject={
                nutritionData?.getNutrientsListAndGiGlByIngredients
                  ?.nutrients &&
                JSON?.parse(
                  nutritionData?.getNutrientsListAndGiGlByIngredients
                    ?.nutrients,
                )
              }
              showUser={false}
              counter={1}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CreateNewRecipe;
