import React, { useEffect, useState } from "react";
import CustomAccordion from "../../../../theme/accordion/accordion.component";
import styles from "./TagSection.module.scss";
import { INGREDIENTS_FILTER } from "../static/recipe";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import OptionSelect from "../optionSelect/OptionSelect";
import OptionSelectHeader from "../optionSelect/OptionSelectHeader";
import NumericFilter from "../numericFilter/NumericFilter";
import { updateNumericFilterState } from "../../../../redux/slices/filterRecipeSlice";
import { BlendCategoryType } from "../../../../type/blendCategoryType";
import { categories } from "../../../../data/categories";
import { useLazyQuery, useQuery } from "@apollo/client";
import GET_BLEND_NUTRIENTS_BASED_ON_CATEGORY from "../../../../gqlLib/nutrition/query/getBlendNutrientsBasedOnCategoey";
import ExcludeFilter from "../excludeFilter";
import GET_COLLECTIONS_AND_THEMES from "../../../../gqlLib/collection/query/getCollectionsAndThemes";
import {
  ActiveSectionType,
  FilterCriteriaOptions,
  FilterCriteriaValue,
  FiltersUpdateCriteria,
  NutrientFiltersType,
  NutrientMatrixType,
} from "../../../../type/filterType";
import { useUser } from "../../../../context/AuthProvider";
const { INGREDIENTS_BY_CATEGORY, TYPE, ALLERGIES, DIET, EQUIPMENT, DRUGS } = INGREDIENTS_FILTER;

const nutritionList = [
  {
    title: "Nutrition Metrics",
    child: [],
  },
  {
    title: "Macronutrients (Energy)",
    child: [],
  },
  {
    title: "Micronutrients",
    child: [
      {
        name: "Vitamins",
        id: "6203a96e1c100bd226c13c69",
      },
      {
        name: "Minerals",
        id: "6203a98a1c100bd226c13c6b",
      },
    ],
  },
  {
    title: "Phytonutrients",
    child: [],
  },
];
const recipeList = ["Review Rating", "Review Count", "Source", "Author", "Publish Date"];

const nutrientMatrix = [
  {
    name: "GI",
    id: "1",
    between: false,
    greaterThan: false,
    lessThan: true,
    matrixName: null,
    lessThanValue: 20,
    greaterThanValue: 20,
    betweenStartValue: 20,
    betweenEndValue: 30,
    tagLabel: ` GI `,
    filterCriteria: "nutrientMatrix",
  },
  {
    name: "GL",
    id: "2",
    between: false,
    greaterThan: false,
    lessThan: true,
    matrixName: null,
    lessThanValue: 20,
    greaterThanValue: 20,
    betweenStartValue: 20,
    betweenEndValue: 30,
    tagLabel: ` GL `,
    filterCriteria: "nutrientMatrix",
  },
  {
    name: "Calorie",
    id: "3",
    between: false,
    greaterThan: false,
    lessThan: true,
    matrixName: null,
    lessThanValue: 20,
    greaterThanValue: 20,
    betweenStartValue: 20,
    betweenEndValue: 30,
    tagLabel: ` Calorie `,
    filterCriteria: "nutrientMatrix",
  },
  {
    name: "NetCarbs",
    id: "4",
    between: false,
    greaterThan: false,
    lessThan: true,
    matrixName: null,
    lessThanValue: 20,
    greaterThanValue: 20,
    betweenStartValue: 20,
    betweenEndValue: 30,
    tagLabel: `NetCarbs`,
    filterCriteria: "nutrientMatrix",
  },
];

const nutrient = [
  {
    name: "Energy",
    id: "6203a9381c100bd226c13c67",
  },
  {
    name: "Calories",
    id: "6203a9061c100bd226c13c65",
  },
  {
    name: "Vitamins",
    id: "6203a96e1c100bd226c13c69",
  },
  {
    name: "Minerals",
    id: "6203a98a1c100bd226c13c6b",
  },
];

const collections = [
  { name: "My Collections", child: [] },
  { name: "Shared With Me", child: [] },
  // {
  //   name: "Global",
  //   child: ["Blending101", "Brands", "My Recipes", "Shared With Me"],
  // },
];

interface Props {
  checkActiveItem: (id: string) => boolean;
  checkFocusItem: (id: string) => boolean;
  blendCategoryData: BlendCategoryType[];
  blendCategoryLoading: boolean;
  ingredientCategoryData: any[];
  ingredientCategoryLoading: boolean;
  checkExcludeIngredientIds: (id: string) => boolean;
  handleUpdateFilterCriteria: (obj: {
    filterCriteria?: FilterCriteriaOptions;
    value?: FilterCriteriaValue;
    updateStatus: FiltersUpdateCriteria;
  }) => void;
  handleUpdateActiveFilterTag: (
    activeSection: ActiveSectionType,
    filterCriteria: FilterCriteriaOptions,
    activeTab: string,
    childTab: string,
    id: string,
  ) => void;
}

const TagSection = ({
  checkActiveItem = () => false,
  checkFocusItem = () => false,
  blendCategoryData = [],
  blendCategoryLoading = false,
  ingredientCategoryData = [],
  ingredientCategoryLoading = false,
  checkExcludeIngredientIds = () => false,
  handleUpdateFilterCriteria,
  handleUpdateActiveFilterTag,
}: Props) => {
  const [optionSelectItems, setOptionSelectItems] = useState<any[]>([]);
  const [childIngredient, setChailIngredient] = useState("");
  const dispatch = useAppDispatch();
  const userId = useUser().id;
  const [getBlendNutrientsBasedOnCategoey, { data: blendNutrientData, loading: blendNutrientLoading }] = useLazyQuery(
    GET_BLEND_NUTRIENTS_BASED_ON_CATEGORY,
    {
      // fetchPolicy: "cache-and-network",
    },
  );
  const {
    data: collectionsData,
    loading: collectionsLoading,
    error: collectionsError,
  } = useQuery(GET_COLLECTIONS_AND_THEMES, {
    variables: { userId },
  });
  const { activeFilterTag, excludeFilterState, numericFilterState } = useAppSelector((state) => state?.filterRecipe);
  const { activeTab, childTab, filterCriteria } = activeFilterTag;

  const handleGetBlendNutrition = async (nutrientCategoryId: string, category: string) => {
    try {
      const { data } = await getBlendNutrientsBasedOnCategoey({
        variables: { nutrientCategoryId },
      });

      setOptionSelectItems([
        ...data.getBlendNutrientsBasedOnCategoey?.map((item) => ({
          id: item?._id,
          name: item?.nutrientName,
          between: false,
          category,
          greaterThan: false,
          lessThan: true,
          lessThanValue: 200,
          greaterThanValue: 200,
          betweenStartValue: 200,
          betweenEndValue: 201,
          tagLabel: ` ${item?.nutrientName} `,
          filterCriteria: "nutrientFilters",
        })),
      ]);
    } catch (error) {
      setOptionSelectItems([]);
    }
  };

  const handleUpdateNumericFilterState = (value: NutrientFiltersType | NutrientMatrixType) => {
    dispatch(updateNumericFilterState(value));
  };

  const optionSelectorHandler = (chip: string) => {
    // let data = [];
    // if (values.includes(chip)) {
    //   data = values.filter((value) => value !== chip);
    // } else {
    //   data = [...values, chip];
    // }
    // dispatch(
    //   modifyFilter({
    //     pageTitle: pageTitle,
    //     expandedMenu,
    //     activeTab,
    //     values: data,
    //     isMultiprops: true,
    //     prefix: pageTitle,
    //   }),
    // );
  };

  useEffect(() => {
    if (activeTab === "Collections") {
      if (childTab === "My Collections") {
        let collections = collectionsData?.getUserCollectionsAndThemes?.collections;
        (collections = collections
          ?.filter((collection) => !collection?.isShared)
          ?.map((item) => ({
            id: item?._id,
            name: item?.personalizedName || item?.name,
            image: item?.image,
            tagLabel: ` ${item?.personalizedName || item?.name}`,
            filterCriteria: "collectionIds",
          }))),
          setOptionSelectItems(collections);
      }
      if (childTab === "Shared With Me") {
        let collections = collectionsData?.getUserCollectionsAndThemes?.collections;
        (collections = collections
          ?.filter((collection) => collection?.isShared)
          ?.map((item) => ({
            id: item?._id,
            name: item?.personalizedName || item?.name,
            image: item?.image,
            tagLabel: ` ${item?.personalizedName || item?.name}`,
            filterCriteria: "collectionIds",
          }))),
          setOptionSelectItems(collections);
      }
      if (childTab === "Global") {
        let global = collections?.find((col) => col?.name === childTab);
        let mapGlobal = global.child?.map((item, index) => ({
          id: index,
          name: item,
          image: `Global collection | ${item}`,
          tagLabel: item,
          filterCriteria: "collectionIds",
        }));
        setOptionSelectItems(mapGlobal);
      }
    }
    if (childTab === "Blend Type") {
      setOptionSelectItems(
        blendCategoryData?.map((item) => ({
          id: item?._id,
          name: item?.name,
          image: item?.image,
          tagLabel: ` ${item?.name}`,
          filterCriteria: "blendTypes",
        })),
      );
    }
    if (activeTab === "Ingredient") {
      if (childTab !== "All") {
        setOptionSelectItems(
          ingredientCategoryData
            ?.filter((item) => item?.category === childTab)
            .map((item) => ({
              id: item?._id,
              image: item?.featuredImage || "/food/chard.png",
              name: item?.ingredientName,
              tagLabel: ` ${item?.ingredientName}`,
              filterCriteria: "includeIngredientIds",
              excludeIngredientIds: false,
            })),
        );
      } else {
        setOptionSelectItems(
          ingredientCategoryData.map((item) => ({
            id: item?._id,
            image: item?.featuredImage || "/food/chard.png",
            name: item?.ingredientName,
            tagLabel: ` ${item?.ingredientName}`,
            filterCriteria: "includeIngredientIds",
            excludeIngredientIds: false,
          })),
        );
      }
    }

    if (activeTab === "Nutrition") {
      const findNutrient = (name: string) => {
        return nutrient.find((item) => item.name === name);
      };
      if (childTab === "Nutrition Metrics") {
        setOptionSelectItems([...nutrientMatrix]);
      }
      if (childTab === "Macronutrients (Energy)") {
        const findOneNutrient = findNutrient("Energy");
        handleGetBlendNutrition(findOneNutrient.id, findOneNutrient.name.toLowerCase());
      }
      if (childTab === "Vitamins") {
        const findOneNutrient = findNutrient(childTab);
        handleGetBlendNutrition(
          findOneNutrient.id,
          findOneNutrient.name.toLowerCase().slice(0, findOneNutrient.name.length - 1),
        );
      }
      if (childTab === "Minerals") {
        const findOneNutrient = findNutrient(childTab);
        handleGetBlendNutrition(
          findOneNutrient.id,
          findOneNutrient.name.toLowerCase().slice(0, findOneNutrient.name.length - 1),
        );
      }
      if (childTab === "Phytonutrients") {
        setOptionSelectItems([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childTab]);

  return (
    <div className={styles.tagSectionContainer}>
      {activeTab ? (
        <>
          <OptionSelectHeader
            activeTab={childTab}
            filterCriteria={filterCriteria}
            handleUpdateFilterCriteria={handleUpdateFilterCriteria}
            handleUpdateActiveFilterTag={handleUpdateActiveFilterTag}
          />
          {activeTab === "Blend Type" || activeTab === "Collections" ? (
            <OptionSelect
              optionSelectItems={optionSelectItems}
              filterCriteria={filterCriteria}
              checkActiveItem={checkActiveItem}
              checkFocusItem={checkFocusItem}
              checkExcludeIngredientIds={checkExcludeIngredientIds}
              activeFilterTag={activeFilterTag}
              handleUpdateFilterCriteria={handleUpdateFilterCriteria}
            />
          ) : null}
          {activeTab === "Ingredient" ? (
            <>
              <ExcludeFilter
                excludeFilterState={excludeFilterState}
                handleUpdateFilterCriteria={handleUpdateFilterCriteria}
              />
              <OptionSelect
                optionSelectItems={optionSelectItems}
                filterCriteria={filterCriteria}
                checkActiveItem={checkActiveItem}
                checkFocusItem={checkFocusItem}
                checkExcludeIngredientIds={checkExcludeIngredientIds}
                focusOptionId={excludeFilterState.id}
                activeFilterTag={activeFilterTag}
                handleUpdateFilterCriteria={handleUpdateFilterCriteria}
              />
            </>
          ) : null}

          {activeTab === "Nutrition" ? (
            <>
              <NumericFilter
                childIngredient={childIngredient}
                filterCriteria={filterCriteria}
                activeTab={activeTab}
                handleUpdateFilterCriteria={handleUpdateFilterCriteria}
                handleUpdateNumericFilterState={handleUpdateNumericFilterState}
                numericFilterUseFrom="plan"
              />
              <OptionSelect
                optionSelectItems={optionSelectItems}
                filterCriteria={filterCriteria}
                checkActiveItem={checkActiveItem}
                checkFocusItem={checkFocusItem}
                focusOptionId={numericFilterState.id}
                activeFilterTag={activeFilterTag}
                optionsLoading={blendNutrientLoading}
                handleUpdateFilterCriteria={handleUpdateFilterCriteria}
              />
            </>
          ) : null}
          {/* {activeTab === "Collection" || activeTab === "Dynamic" ? (
            <CheckboxOptions values={values} onSelect={optionSelectorHandler} />
          ) : null}
          {activeTab === "Drugs" ? (
            <Multiselect
              placeholder="Select Drugs"
              options={DRUGS}
              values={values}
              onSelect={optionSelectorHandler}
              onDelete={optionSelectorHandler}
            />
          ) : null} */}
        </>
      ) : (
        <>
          <input className={styles.tagSectionInput} placeholder="Search" />
          <div
            className={styles.singleItem}
            onClick={() => handleUpdateActiveFilterTag("tags", "blendTypes", "Blend Type", "Blend Type", "")}
          >
            <h5>Blend Type</h5>
          </div>

          <CustomAccordion title="Ingredient" iconRight={true}>
            {categories?.length
              ? categories?.map((item, index) => {
                  return (
                    <div
                      className={styles.singleItemInside}
                      key={index}
                      onClick={() =>
                        handleUpdateActiveFilterTag("tags", "includeIngredientIds", "Ingredient", item?.value, "")
                      }
                    >
                      <h5>{item?.label}</h5>
                    </div>
                  );
                })
              : null}
          </CustomAccordion>

          <CustomAccordion title="Nutrition" iconRight={true}>
            {nutritionList?.length
              ? nutritionList?.map((item, index) => {
                  const isChildLength = item.child.length;
                  return (
                    <>
                      {isChildLength ? (
                        <CustomAccordion title={item.title} iconRight={true} style={{ paddingLeft: "10px" }}>
                          {item.child?.map((child, index) => {
                            return (
                              <div
                                className={styles.singleItemInside}
                                key={index}
                                onClick={() =>
                                  handleUpdateActiveFilterTag(
                                    "tags",
                                    item.title === "Nutrition Metrics" ? "nutrientMatrix" : "nutrientFilters",
                                    "Nutrition",
                                    child.name,
                                    "",
                                  )
                                }
                              >
                                <h5>{child.name}</h5>
                              </div>
                            );
                          })}
                        </CustomAccordion>
                      ) : (
                        <div
                          className={styles.singleItemInside}
                          key={index}
                          onClick={() =>
                            handleUpdateActiveFilterTag(
                              "tags",
                              item.title === "Nutrition Metrics" ? "nutrientMatrix" : "nutrientFilters",
                              "Nutrition",
                              item.title,
                              "",
                            )
                          }
                        >
                          <h5>{item.title}</h5>
                        </div>
                      )}
                    </>
                  );
                })
              : null}
          </CustomAccordion>

          <CustomAccordion title="Collections" iconRight={true}>
            {collections?.length
              ? collections?.map((item, index) => {
                  return (
                    <div
                      className={styles.singleItemInside}
                      key={index}
                      onClick={() => handleUpdateActiveFilterTag("tags", "collectionIds", "Collections", item.name, "")}
                    >
                      <h5>{item.name}</h5>
                    </div>
                  );
                })
              : null}
          </CustomAccordion>
          <div
            className={styles.singleItem}
            // onClick={() => recipeFilterByCategory("Diet")}
          >
            <h5>Brands</h5>
          </div>
          <div
            className={styles.singleItem}
            // onClick={() => recipeFilterByCategory("Diet")}
          >
            <h5>Diet</h5>
          </div>
          <div
            className={styles.singleItem}
            // onClick={() => recipeFilterByCategory("Allergies")}
          >
            <h5>Allergies</h5>
          </div>
          <div
            className={styles.singleItem}
            // onClick={() => recipeFilterByCategory("Time")}
          >
            <h5>Time</h5>
          </div>
          <div
            className={styles.singleItem}
            // onClick={() => recipeFilterByCategory("Price")}
          >
            <h5>Price</h5>
          </div>
          <div
            className={styles.singleItem}
            // onClick={() => recipeFilterByCategory("Equipment")}
          >
            <h5>Equipment</h5>
          </div>
          <CustomAccordion title="Recipe" iconRight={true}>
            {recipeList?.length
              ? recipeList?.map((item, index) => {
                  return (
                    <div className={styles.singleItemInside} key={index}>
                      <h5>{item}</h5>
                    </div>
                  );
                })
              : null}
          </CustomAccordion>

          <div
            className={styles.singleItem}
            // onClick={() => recipeFilterByCategory("Teste")}
          >
            <h5>Test</h5>
          </div>
          <div
            className={styles.singleItem}
            // onClick={() => recipeFilterByCategory("Dynamic")}
          >
            <h5>Dynamic</h5>
          </div>
          <div
            className={styles.singleItem}
            // onClick={() => recipeFilterByCategory("Drugs")}
          >
            <h5>Drugs</h5>
          </div>
        </>
      )}
    </div>
  );
};

export default TagSection;
