import React, { Fragment, useEffect, useState } from "react";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { faTelescope } from "@fortawesome/pro-light-svg-icons";

import {
  useFindQueuedRecipe,
  useRecipeCategory,
  useDiscoveryQueue,
} from "../../../../hooks/modules/Challenge/useChallengeRecipes";

import IconHeading from "../../../../theme/iconHeading/iconHeading.component";
import SkeletonElement from "../../../../theme/skeletons/SkeletonElement";
import ToggleCard from "../../../../theme/toggleCard/toggleCard.component";
import Icon from "../../../../component/atoms/Icon/Icon.component";
import RecipeCard from "../../../../component/molecules/Card/RecipeCard.component";
import Searchbox from "../../../../component/molecules/Searchbox/Searchbox.component";
import Combobox from "../../../../component/organisms/Forms/Combobox.component";

import styles from "./RecipePanel.module.scss";

interface PlannerPanelProps {
  height?: string;
  addRecipeToPlan?: any;
}

const PlannerQueue = (props: PlannerPanelProps) => {
  const { height, addRecipeToPlan } = props;
  const queuedRecipes = [];
  const [toggler, setToggler] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [type, setType] = useState("all");

  const { parentRef } = useFindQueuedRecipe([toggler, setToggler]);
  const { ref, categories, onHide, onShow } = useRecipeCategory();
  const { loading, recipes } = useDiscoveryQueue({
    type,
    query,
    page,
    setPage,
  });

  // When we toggle the tab between Discover and Queue
  useEffect(() => {
    setQuery("");
    setPage(1);
    setType("all");
  }, [toggler]);

  return (
    <Fragment>
      <IconHeading icon={faTelescope} title="Recipe" iconStyle={{ fontSize: "24px" }} />
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
      <div
        className={`${styles.wrapper} ${styles[toggler ? "wrapper--discover" : "wrapper--queue"]}`}
        style={{
          maxHeight: height ? (toggler ? `calc(${height} - 111px)` : `calc(${height} - 51px)`) : "auto",
        }}
        ref={parentRef}
      >
        <Recipes recipes={toggler ? recipes : queuedRecipes} addRecipeToPlan={addRecipeToPlan} />
        {loading &&
          [...Array(page === 1 ? 3 : 1)]?.map((_, index) => (
            <SkeletonElement type="thumbnail" key={index} style={{ width: "100%", height: "277px" }} />
          ))}
      </div>
    </Fragment>
  );
};

interface RecipesProps {
  recipes: any[];
  addRecipeToPlan?: any;
}

const Recipes = (props: RecipesProps) => {
  const { recipes, addRecipeToPlan } = props;
  const [shownDayId, setShownDayId] = useState("");

  return (
    <Fragment>
      {recipes?.map((recipe) => {
        const {
          recipeId: { _id, name, recipeBlendCategory, averageRating, totalRating, image },
          defaultVersion,
        } = recipe;

        return (
          <div key={_id} data-recipe={_id}>
            <RecipeCard
              variant="border"
              className="mt-10"
              title={name}
              category={recipeBlendCategory?.name}
              ratings={averageRating}
              noOfRatings={totalRating}
              image={image.find((img) => img.default === true)?.image}
              recipeId={_id}
              ingredients={defaultVersion?.ingredients || []}
              calorie={defaultVersion?.calorie?.value}
              carbs={defaultVersion?.gigl?.netCarbs}
            >
              <div>
                <div className={styles.daypicker}>
                  <div className={styles.daypicker__field} onClick={() => setShownDayId(shownDayId === _id ? "" : _id)}>
                    <Icon fontName={faPlus} size={15} />
                  </div>
                  {shownDayId === _id && (
                    <ul className={styles.daypicker__options}>
                      {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                        <li
                          key={day}
                          onClick={() => {
                            addRecipeToPlan(day, recipe);
                            setShownDayId("");
                          }}
                        >
                          {day}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </RecipeCard>
          </div>
        );
      })}
    </Fragment>
  );
};
export default PlannerQueue;
