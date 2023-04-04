import React, { Fragment, useEffect, useRef, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { faPlusCircle } from "@fortawesome/pro-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/pro-light-svg-icons";
import { faCalendarDay } from "@fortawesome/pro-regular-svg-icons";
import { format } from "date-fns";

import Pagination from "../../molecules/Pagination/ServerPagination.component";
import Combobox from "../../organisms/Forms/Combobox.component";
import Searchbox from "../../molecules/Searchbox/Searchbox.component";
import ToggleCard from "../../../theme/toggleCard/toggleCard.component";
import IconHeading from "../../../theme/iconHeading/iconHeading.component";
import CalendarTray from "../../../theme/calendar/calendarTray.component";
import SkeletonElement from "../../../theme/skeletons/SkeletonElement";
import RecipeCard from "../../molecules/Card/RecipeCard.component";
import Icon from "../../atoms/Icon/Icon.component";

import {
  ADD_RECIPE_TO_PLANNER,
  GET_QUEUED_PLANNER_RECIPES,
  GET_ALL_PLANNER_RECIPES,
} from "../../../graphql/Planner";
import { GET_BLEND_CATEGORY } from "../../../graphql/Recipe";
import { useAppSelector } from "../../../redux/hooks";
import { addPlanner } from "../../../redux/slices/Planner.slice";
import { setRecipeInfo } from "../../../redux/slices/Challenge.slice";

import Publish from "../../../helpers/Publish";

import styles from "./Queue.module.scss";
import {
  useAddRecipeToMyPlan,
  useRecipeCategory,
  useRecipeQueue,
} from "../../../hooks/modules/Plan/useRecipeQueue";

interface PlannerPanelProps {
  panel: "my-plan" | "plan" | "challenge";
  modifyPlan?: any;
  week?: any;
  isWeekFromURL?: boolean;
}

const PlannerQueue = (props: PlannerPanelProps) => {
  const { panel, week, isWeekFromURL, modifyPlan } = props;
  const [toggler, setToggler] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [type, setType] = useState("all");

  const { ref, categories, onHide, onShow } = useRecipeCategory();
  const { recipes, pageLength, limit, isLoading } = useRecipeQueue({
    type,
    toggler,
    query,
    page,
  });
  const addRecipeToPlanner = useAddRecipeToMyPlan({
    limit,
    page,
    query,
    type: type === "all" ? "" : type,
    week,
    isWeekFromURL,
  });

  // When we toggle the tab between Discover and Queue
  useEffect(() => {
    setQuery("");
    setPage(1);
    setType("all");
  }, [toggler]);

  console.log(pageLength);

  return (
    <Fragment>
      <IconHeading
        icon={faCalendarAlt}
        title="Recipe Queue"
        iconStyle={{ fontSize: "18px" }}
      />
      <ToggleCard
        noRoute
        toggler={toggler}
        setTogglerFunc={setToggler}
        leftToggleHeading="Discover"
        rightToggleHeading="Queue"
        headingStyle={{
          padding: "15px 5px",
        }}
      />

      {toggler && (
        <div className={styles.action}>
          {}
          <div ref={ref} style={{ width: "100%" }}>
            <Combobox
              options={categories}
              className={styles.blendType}
              value={type}
              onChange={(e) => {
                setPage(1);
                setType(e.target.value);
              }}
            />
          </div>
          <Searchbox
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onReset={() => {
              setQuery("");
              onHide();
            }}
            onFocus={onHide}
            onMouseEnter={onHide}
            onMouseLeave={onShow}
            onBlur={onShow}
          />
        </div>
      )}
      <div className={styles.wrapper}>
        {isLoading ? (
          [...Array(limit)]?.map((_, index) => (
            <SkeletonElement
              type="thumbnail"
              key={index}
              style={{ width: "100%", height: "277px" }}
            />
          ))
        ) : (
          <Recipes
            recipes={recipes}
            panel={panel}
            modifyPlan={modifyPlan}
            addRecipeToPlanner={addRecipeToPlanner}
          />
        )}

        {pageLength > 1 && (
          <div className="flex ai-center jc-center mt-20">
            <Pagination
              limit={5}
              pageState={[page, setPage]}
              totalPage={pageLength}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};

interface RecipesProps {
  recipes: any[];
  panel: "my-plan" | "plan" | "challenge";
  modifyPlan?: any;
  addRecipeToPlanner?: any;
}
const Recipes = (props: RecipesProps) => {
  const { recipes, panel, modifyPlan, addRecipeToPlanner } = props;
  const [showCalenderId, setShowCalenderId] = useState("");

  const dispatch = useDispatch();
  const uploadRecipe = (_id, name, image, category, ingredients) => {
    dispatch(
      setRecipeInfo({
        _id,
        name,
        image: {
          url: image?.find((img) => img.default)?.image || image[0]?.image,
          hash: "",
        },
        category,
        ingredients,
      }),
    );
  };

  return (
    <Fragment>
      {recipes?.map((recipe) => {
        const {
          recipeId: {
            _id,
            name,
            recipeBlendCategory,
            averageRating,
            totalRating,
            image,
          },
          defaultVersion,
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
            ingredients={defaultVersion?.ingredients || []}
          >
            <div>
              {panel === "challenge" && (
                <Icon
                  fontName={faPlusCircle}
                  style={{ color: "#fe5d1f" }}
                  size="20px"
                  onClick={() =>
                    uploadRecipe(
                      _id,
                      name,
                      image,
                      recipeBlendCategory?._id,
                      defaultVersion?.ingredients,
                    )
                  }
                />
              )}
              {panel === "plan" && (
                <select onChange={(e) => modifyPlan(e.target.value, recipe)}>
                  <option value={""}></option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                </select>
              )}
              {panel === "my-plan" && (
                <Icon
                  fontName={faCalendarDay}
                  style={{ color: "#fe5d1f" }}
                  size="20px"
                  onClick={() =>
                    setShowCalenderId((prev) =>
                      showCalenderId === _id ? "" : _id,
                    )
                  }
                />
              )}
              {panel === "my-plan" && showCalenderId === _id && (
                <div className={styles.calender__tray}>
                  <CalendarTray
                    handler={(date) =>
                      addRecipeToPlanner(recipe, date, setShowCalenderId)
                    }
                  />
                </div>
              )}
            </div>
          </RecipeCard>
        );
      })}
    </Fragment>
  );
};
export default PlannerQueue;
