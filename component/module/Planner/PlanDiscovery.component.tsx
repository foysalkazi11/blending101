import React, { Fragment, useEffect, useRef, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import {
  faCalendarDay,
  faTelescope,
  faPlusCircle,
} from "@fortawesome/pro-regular-svg-icons";

import Pagination from "../../molecules/Pagination/ServerPagination.component";
import Combobox from "../../organisms/Forms/Combobox.component";
import Searchbox from "../../molecules/Searchbox/Searchbox.component";
import ToggleCard from "../../../theme/toggleCard/toggleCard.component";
import IconHeading from "../../../theme/iconHeading/iconHeading.component";
import SkeletonElement from "../../../theme/skeletons/SkeletonElement";
import RecipeCard from "../../molecules/Card/RecipeCard.component";
import Icon from "../../atoms/Icon/Icon.component";

import { GET_ALL_PLANS } from "../../../graphql/Planner";
import { GET_BLEND_CATEGORY } from "../../../graphql/Recipe";
import { useAppSelector } from "../../../redux/hooks";
import { setRecipeInfo } from "../../../redux/slices/Challenge.slice";

import styles from "./PlanDiscovery.module.scss";
import PlanCard from "./PlanCard.component";
import { useAllPlan } from "../../../hooks/modules/Plan/usePlanDiscovery";
import { useRecipeCategory } from "../../../hooks/modules/Plan/usePlanRecipes";

interface PlannerPanelProps {
  recipes: any[];
}

const PlanDiscovery = (props: PlannerPanelProps) => {
  const { recipes } = props;
  const [toggler, setToggler] = useState(true);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);

  const { plans, loading, observer } = useAllPlan({ page, setPage, query });
  const { ref, categories, onHide, onShow } = useRecipeCategory();
  useEffect(() => {
    setQuery("");
    setPage(1);
    setType("all");
  }, [toggler]);

  return (
    <Fragment>
      <IconHeading
        icon={faTelescope}
        title={`Plan ${toggler ? "Discovery" : "Queue"}`}
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
        {toggler ? (
          <Plans plans={plans} observer={observer} />
        ) : (
          <Recipes recipes={recipes || []} />
        )}
        {toggler &&
          loading &&
          [...Array(page === 1 ? 3 : 1)]?.map((_, index) => (
            <SkeletonElement
              type="thumbnail"
              key={index}
              style={{ width: "100%", height: "277px" }}
            />
          ))}
      </div>
    </Fragment>
  );
};

const Plans = (props) => {
  const { plans, observer } = props;
  return plans?.map((plan) => (
    <div key={plan?._id} ref={observer} className="mt-10">
      <PlanCard
        planId={plan?._id}
        title={plan.planName}
        image={plan?.image?.url}
      />
    </div>
  ));
};

const Recipes = (props) => {
  const { recipes } = props;
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
      />
    );
  });
};

export default PlanDiscovery;
