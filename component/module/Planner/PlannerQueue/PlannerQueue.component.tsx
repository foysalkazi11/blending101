import React, { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";

import ToggleCard from "../../../../theme/toggleCard/toggleCard.component";
import IconHeading from "../../../../theme/iconHeading/iconHeading.component";
import DropDownSearch from "../../../../theme/toggleCard/customTray/dropdownSearch/dropDownSearch.component";
import QueueTray from "../../../../theme/toggleCard/customTray/queueTray/queueTray.component";

import styles from "./PlannerQueue.module.scss";
import ViewDataCard from "../../../../theme/dataCard/viewDataCard.component";
import RecipeCard from "../../../molecules/Card/RecipeCard.component";

import { RiCalendarEventLine } from "react-icons/ri";
import CalendarTray from "../../../../theme/calendar/calendarTray.component";
import { useAppSelector } from "../../../../redux/hooks";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  ADD_RECIPE_TO_PLANNER,
  GET_INGREDIENTS_BY_RECIPE,
  GET_QUEUED_RECIPES_FOR_PLANNER,
  GET_RECIPES_FOR_PLANNER,
} from "../../../../graphql/Planner";
import Pagination from "../../../molecules/Pagination/ServerPagination.component";
import Combobox from "../../../organisms/Forms/Combobox.component";
import Searchbox from "../../../molecules/Searchbox/Searchbox.component";
import { GET_BLEND_CATEGORY } from "../../../../graphql/Recipe";
import { useDispatch } from "react-redux";
import {
  addPlanner,
  setRecipeInfo,
  setRecipeIngredients,
} from "../../../../redux/slices/Planner.slice";
import Icon from "../../../atoms/Icon/Icon.component";
import { faPlusCircle } from "@fortawesome/pro-solid-svg-icons";
import Publish from "../../../../helpers/Publish";
import SkeletonElement from "../../../../theme/skeletons/SkeletonElement";
import { getDateOnly } from "../../../../helpers/Date";

const plannerIcon = (
  <div className={styles.plannerIcon}>
    <Image src={"/images/planner.svg"} alt="" layout="fill" objectFit="cover" />
  </div>
);

interface PlannerPanelProps {
  isUpload: boolean;
}

const PlannerPanel = (props: PlannerPanelProps) => {
  const { isUpload } = props;
  const [toggler, setToggler] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [pageLength, setPageLength] = useState(1);
  const [type, setType] = useState("");
  const [recipes, setRecipes] = useState([]);

  const blendTypeRef = useRef<HTMLDivElement>(null);

  const { data: categories } = useQuery(GET_BLEND_CATEGORY);
  const [getRecipes, { loading: discoverLoading, data: discoverData }] =
    useLazyQuery(GET_RECIPES_FOR_PLANNER);
  const [getQueuedRecipes, { loading, data: queuedData }] = useLazyQuery(
    GET_QUEUED_RECIPES_FOR_PLANNER,
  );

  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  useEffect(() => {
    if (userId !== "")
      getRecipes({
        variables: {
          user: userId,
          searchTerm: query,
          page,
          limit,
          type,
        },
      });
    getQueuedRecipes({
      variables: {
        user: userId,
        searchTerm: query,
        page,
        limit,
        type,
      },
    });
  }, [getQueuedRecipes, getRecipes, limit, page, query, type, userId]);

  useEffect(() => {
    if (toggler) {
      setRecipes(discoverData?.getAllRecipesForPlanner?.recipes || []);
      setPageLength(
        Math.ceil(discoverData?.getAllRecipesForPlanner?.totalRecipe / limit) ||
          1,
      );
    } else {
      setRecipes(queuedData?.getQuedPlanner?.recipes || []);
      setPageLength(
        Math.ceil(queuedData?.getQuedPlanner?.totalRecipe / limit) || 1,
      );
    }
  }, [
    discoverData?.getAllRecipesForPlanner,
    limit,
    queuedData?.getQuedPlanner,
    toggler,
  ]);

  useEffect(() => {
    setQuery("");
    setPage(1);
    setType("");
  }, [toggler]);

  // Handling the Blendtype Combobox, When the search is focused/hovered it should be hidden or vice-versa
  const handleShow = (e) => {
    blendTypeRef?.current.classList.add(styles["blendType--show"]);
    blendTypeRef?.current.classList.remove(styles["blendType--hide"]);
  };
  const handleHide = (e) => {
    blendTypeRef?.current.classList.remove(styles["blendType--show"]);
    blendTypeRef?.current.classList.add(styles["blendType--hide"]);
  };

  return (
    <Fragment>
      <IconHeading
        icon={plannerIcon}
        title={"Planner Queue"}
        iconStyle={{ fontSize: "18px" }}
      />
      <ToggleCard
        toggler={toggler}
        setTogglerFunc={setToggler}
        leftToggleHeading="Discover"
        rightToggleHeading="Queue"
        headingStyle={{
          padding: "15px 5px",
        }}
      />
      <div className={styles.action}>
        <div ref={blendTypeRef}>
          <Combobox
            options={categories?.getAllCategories}
            className={styles.blendType}
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <Searchbox
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onReset={() => setQuery("")}
          onFocus={handleHide}
          onMouseEnter={handleHide}
          onMouseLeave={handleShow}
          onBlur={handleShow}
        />
      </div>
      {discoverLoading || loading ? (
        [...Array(limit)]?.map((_, index) => (
          <SkeletonElement
            type="thumbnail"
            key={index}
            style={{ width: "100%", height: "277px" }}
          />
        ))
      ) : (
        <Recipes recipes={recipes} isUpload={isUpload} />
      )}
      <div className="flex ai-center jc-center mt-20">
        <Pagination
          limit={5}
          pageState={[page, setPage]}
          totalPage={pageLength}
        />
      </div>
    </Fragment>
  );
};

const Recipes = (props) => {
  const { recipes, isUpload } = props;
  const [showCalenderId, setShowCalenderId] = useState("");

  const [getIngredients, { data }] = useLazyQuery(GET_INGREDIENTS_BY_RECIPE);
  const [addRecipe, addState] = useMutation(ADD_RECIPE_TO_PLANNER);

  const dispatch = useDispatch();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const dateHandler = async (recipe: any, date: Date) => {
    const assignDate = getDateOnly(date);
    await Publish({
      mutate: addRecipe,
      variables: {
        assignDate: assignDate,
        recipeId: recipe._id,
        userId,
      },
      state: addState,
      success: `Added Planner sucessfully`,
      onSuccess: (data) => {
        setShowCalenderId("");
        dispatch(
          addPlanner({
            id: data?.createPlanner?._id,
            date: assignDate,
            recipe: {
              _id: recipe._id,
              name: recipe.name,
              category: recipe?.recipeBlendCategory?.name,
              rxScore: 786,
              calorie: 250,
            },
          }),
        );
      },
    });
  };

  const uploadRecipe = (_id, name, image) => {
    getIngredients({
      variables: {
        recipeId: _id,
      },
    });
    dispatch(
      setRecipeInfo({
        _id,
        name,
        image: image?.find((img) => img.default)?.image || image[0]?.image,
      }),
    );
  };

  useEffect(() => {
    if (data?.getIngredientsFromARecipe)
      dispatch(
        setRecipeIngredients({
          ingredients: data?.getIngredientsFromARecipe || [],
        }),
      );
  }, [data?.getIngredientsFromARecipe, dispatch]);

  return recipes?.map((recipe) => {
    const {
      _id,
      name,
      recipeBlendCategory,
      averageRating,
      totalRating,
      image,
    } = recipe;
    return (
      <RecipeCard
        key={_id}
        className="mt-10"
        title={name}
        category={recipeBlendCategory?.name}
        ratings={averageRating}
        noOfRatings={totalRating}
        image={image.find((img) => img.default === true)?.image}
        recipeId={_id}
      >
        <div>
          {isUpload ? (
            <Icon
              fontName={faPlusCircle}
              style={{ color: "#fe5d1f" }}
              size="25px"
              onClick={() => uploadRecipe(_id, name, image)}
            />
          ) : (
            <RiCalendarEventLine
              className={styles.calender}
              onClick={() =>
                setShowCalenderId((prev) => (showCalenderId === _id ? "" : _id))
              }
            />
          )}
          {showCalenderId === _id && (
            <div className={styles.calender__tray}>
              <CalendarTray handler={(date) => dateHandler(recipe, date)} />
            </div>
          )}
        </div>
      </RecipeCard>
    );
  });
};
export default PlannerPanel;
