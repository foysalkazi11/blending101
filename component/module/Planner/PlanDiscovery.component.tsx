import React, { Fragment, useEffect, useRef, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import {
  faCalendarDay,
  faTelescope,
  faPlusCircle,
} from "@fortawesome/pro-regular-svg-icons";
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
  GET_ALL_PLANS,
  GET_INGREDIENTS_BY_RECIPE,
  GET_QUEUED_RECIPES_FOR_PLANNER,
  GET_RECIPES_FOR_PLANNER,
} from "../../../graphql/Planner";
import { GET_BLEND_CATEGORY } from "../../../graphql/Recipe";
import { useAppSelector } from "../../../redux/hooks";
import { addPlanner } from "../../../redux/slices/Planner.slice";
import { setRecipeInfo } from "../../../redux/slices/Challenge.slice";

import Publish from "../../../helpers/Publish";

import styles from "./PlanDiscovery.module.scss";
import PlanCard from "./PlanCard.component";

interface PlannerPanelProps {
  recipes: any[];
  isUpload: boolean;
}

const PlanDiscovery = (props: PlannerPanelProps) => {
  const { recipes, isUpload } = props;
  const [toggler, setToggler] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [pageLength, setPageLength] = useState(1);
  const [type, setType] = useState("all");

  const blendTypeRef = useRef<HTMLDivElement>(null);

  const [getAllPlan, { data, loading }] = useLazyQuery(GET_ALL_PLANS);
  const { data: categories } = useQuery(GET_BLEND_CATEGORY);

  useEffect(() => {
    getAllPlan({
      variables: {
        limit,
        page,
      },
    }).then((response) => {
      setPageLength(
        Math.ceil(response.data.getAllGlobalPlans.totalPlans / limit),
      );
    });
  }, [getAllPlan, limit, page]);
  useEffect(() => {
    setQuery("");
    setPage(1);
    setType("all");
  }, [toggler]);

  // Handling the Blendtype Combobox, When the search is focused/hovered it should be hidden or vice-versa
  const handleShow = () => {
    blendTypeRef?.current.classList.add(styles["blendType--show"]);
    blendTypeRef?.current.classList.remove(styles["blendType--hide"]);
  };
  const handleHide = () => {
    blendTypeRef?.current.classList.remove(styles["blendType--show"]);
    blendTypeRef?.current.classList.add(styles["blendType--hide"]);
  };
  return (
    <Fragment>
      <IconHeading
        icon={faTelescope}
        title="Plan Discovery"
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
          <div ref={blendTypeRef} style={{ width: "100%" }}>
            <Combobox
              options={
                categories?.getAllCategories
                  ? [
                      { label: "All", value: "all" },
                      ...categories?.getAllCategories,
                    ]
                  : [{ label: "All", value: "all" }]
              }
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
              handleHide();
            }}
            onFocus={handleHide}
            onMouseEnter={handleHide}
            onMouseLeave={handleShow}
            onBlur={handleShow}
          />
        </div>
      )}
      <div className={styles.wrapper}>
        {loading ? (
          [...Array(limit)]?.map((_, index) => (
            <SkeletonElement
              type="thumbnail"
              key={index}
              style={{ width: "100%", height: "277px" }}
            />
          ))
        ) : toggler ? (
          <Plans
            plans={data?.getAllGlobalPlans?.plans || []}
            isUpload={isUpload}
          />
        ) : (
          <Recipes recipes={recipes || []} isUpload={isUpload} />
        )}
        {pageLength > 1 && (
          <div className="flex ai-center jc-center mt-20">
            <Pagination
              limit={3}
              pageState={[page, setPage]}
              totalPage={pageLength}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};

const Plans = (props) => {
  const { plans } = props;
  return plans?.map((plan) => (
    <PlanCard
      key={plan?._id}
      className="mt-10"
      planId={plan?._id}
      title={plan.planName}
    />
  ));
};

const Recipes = (props) => {
  const { recipes, isUpload } = props;
  const [showCalenderId, setShowCalenderId] = useState("");

  const dispatch = useDispatch();

  const uploadRecipe = (_id, name, image, category, ingredients) => {
    console.log(ingredients);
    dispatch(
      setRecipeInfo({
        _id,
        name,
        image: image?.find((img) => img.default)?.image || image[0]?.image,
        category,
        ingredients,
      }),
    );
  };

  return recipes?.map((recipe) => {
    const {
      _id,
      name,
      recipeBlendCategory,
      averageRating,
      totalRating,
      image,
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
          {isUpload ? (
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
          ) : (
            <Icon
              fontName={faCalendarDay}
              style={{ color: "#fe5d1f" }}
              size="20px"
              onClick={() =>
                setShowCalenderId((prev) => (showCalenderId === _id ? "" : _id))
              }
            />
          )}
        </div>
      </RecipeCard>
    );
  });
};

export default PlanDiscovery;
