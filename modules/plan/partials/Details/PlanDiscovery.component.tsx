import React, { useEffect, useRef, useState } from "react";
import { faTelescope } from "@fortawesome/pro-regular-svg-icons";

import Combobox from "../../../../component/organisms/Forms/Combobox.component";
import Searchbox from "../../../../component/molecules/Searchbox/Searchbox.component";
import ToggleCard from "../../../../theme/toggleCard/toggleCard.component";
import IconHeading from "../../../../theme/iconHeading/iconHeading.component";
import SkeletonElement from "../../../../theme/skeletons/SkeletonElement";
import RecipeCard from "../../../../component/molecules/Card/RecipeCard.component";
import styles from "./PlanDiscovery.module.scss";
import PlanCard from "../Shared/PlanCard.component";
import { useRecipeCategory } from "@/recipe/hooks";
import { UserRecipe } from "@/recipe/recipe.types";
import useAllPlan from "@/plan/hooks/plan/useAllPlan";
import useFindRecipe from "@/recipe/hooks/useFindRecipe";

interface PlannerPanelProps {
  height: string;
  recipes: UserRecipe[];
  style?: React.CSSProperties;
  setOpenCollectionModal: (arg: boolean) => void;
}

const PlanDiscovery = (props: PlannerPanelProps) => {
  const { style, height, recipes, setOpenCollectionModal } = props;
  const [toggler, setToggler] = useState(true);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);

  const { parentRef, queueRef } = useFindRecipe(toggler);
  const { plans, loading, observer } = useAllPlan({ page, setPage, query });
  // const { ref, categories, onHide, onShow } = useRecipeCategory();
  useEffect(() => {
    setQuery("");
    setPage(1);
    setType("all");
  }, [toggler]);

  const filterRef = useRef<HTMLDivElement>(null);

  const categories = useRecipeCategory();

  return (
    <div style={style}>
      <IconHeading icon={faTelescope} title={`${toggler ? "Plan" : "Recipe"}`} iconStyle={{ fontSize: "18px" }} />
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
          <div ref={filterRef} style={{ width: "100%" }}>
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
            parentRef={filterRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onReset={() => setQuery("")}
          />
        </div>
      )}
      <div
        ref={parentRef}
        className={styles.wrapper}
        style={{
          maxHeight: height ? (toggler ? `calc(${height} - 111px)` : `calc(${height} - 51px)`) : "auto",
        }}
      >
        {toggler ? (
          <Plans plans={plans} observer={observer} setOpenCollectionModal={setOpenCollectionModal} />
        ) : (
          <Recipes recipeRef={queueRef} recipes={recipes || []} />
        )}
        {toggler &&
          loading &&
          [...Array(page === 1 ? 3 : 1)]?.map((_, index) => (
            <SkeletonElement type="thumbnail" key={index} style={{ width: "100%", height: "277px" }} />
          ))}
      </div>
    </div>
  );
};

const Plans = (props) => {
  const { plans, observer, setOpenCollectionModal } = props;
  return plans?.map((plan) => (
    <div key={plan?._id} ref={observer} className="mt-10">
      <PlanCard
        planId={plan?._id}
        title={plan.planName}
        image={plan?.image?.url}
        calorie={plan?.calorie?.value}
        score={plan?.gigl?.rxScore}
        carbs={plan?.gigl?.netCarbs}
        isCollectionIds={plan?.planCollections}
        noOfComments={plan?.commentsCount}
        setOpenCollectionModal={setOpenCollectionModal}
        planComrFrom="globalPlans"
        variant="border"
      />
    </div>
  ));
};

const Recipes = (props) => {
  const { recipeRef, recipes } = props;
  return recipes?.map((recipe) => {
    const {
      recipeId: { _id, name, recipeBlendCategory, averageRating, totalRating, image },
      defaultVersion,
    } = recipe;
    return (
      <div ref={recipeRef} key={`PQueue-${_id}`} data-recipe={_id}>
        <RecipeCard
          className="mt-10"
          title={name}
          category={recipeBlendCategory?.name}
          ratings={averageRating}
          noOfRatings={totalRating}
          image={image.find((img) => img.default === true)?.image}
          recipeId={_id}
          ingredients={defaultVersion?.ingredients || []}
          variant="border"
          calorie={defaultVersion?.calorie?.value}
          carbs={defaultVersion?.gigl?.netCarbs}
        />
      </div>
    );
  });
};

export default PlanDiscovery;
