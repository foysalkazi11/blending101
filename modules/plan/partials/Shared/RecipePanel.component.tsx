import React, { Fragment, forwardRef, useRef, useState } from "react";
import { faTelescope } from "@fortawesome/pro-light-svg-icons";

import Combobox from "component/organisms/Forms/Combobox.component";
import Searchbox from "component/molecules/Searchbox/Searchbox.component";
import ToggleCard from "theme/toggleCard/toggleCard.component";
import IconHeading from "theme/iconHeading/iconHeading.component";
import SkeletonElement from "theme/skeletons/SkeletonElement";
import RecipeCard from "component/molecules/Card/RecipeCard.component";
import { UserRecipe } from "@/recipe/recipe.types";
import { useRecipeCategory } from "@/recipe/hooks";
import usePlanRecipes from "@/plan/hooks/usePlanRecipes";
import useFindRecipe from "@/recipe/hooks/useFindRecipe";

import styles from "./RecipePanel.module.scss";
import { useMediaQuery } from "@/app/hooks/interface/useMediaQuery";

interface RecipePanelProps {
  height?: string;
  style?: React.CSSProperties;
  queuedRecipes: UserRecipe[];
}

const RecipePanel: React.FC<RecipePanelProps> = (props) => {
  const { children, style, height, queuedRecipes } = props;

  const [toggler, setToggler] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [type, setType] = useState("all");

  const categories = useRecipeCategory();
  const { parentRef, queueRef } = useFindRecipe(toggler);
  const { discoverRef, recipes, loading } = usePlanRecipes({ type, query, page, setPage });

  const filterRef = useRef<HTMLDivElement>(null);
  const recipeRef = toggler ? discoverRef : queueRef;

  const isMobile = useMediaQuery("md");
  return (
    <div style={style}>
      {!isMobile && <IconHeading icon={faTelescope} title="Recipe" iconStyle={{ fontSize: "24px" }} />}
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
        className={`${styles.wrapper} ${styles[toggler ? "wrapper--discover" : "wrapper--queue"]}`}
        style={{
          maxHeight: height ? (toggler ? `calc(${height} - 111px)` : `calc(${height} - 51px)`) : "auto",
        }}
      >
        <Recipes ref={recipeRef} showAction={toggler} recipes={toggler ? recipes : queuedRecipes}>
          {children}
        </Recipes>
        {/* IF DISCOVER TAB IS OPEN & LAZY LOADING IS HAPPENING */}
        {toggler &&
          loading &&
          [...Array(page === 1 ? 3 : 1)]?.map((_, index) => (
            <SkeletonElement type="thumbnail" key={index} style={{ width: "100%", height: "277px" }} />
          ))}
      </div>
    </div>
  );
};

interface RecipesProps {
  children: any;
  showAction: boolean;
  recipes: UserRecipe[];
}
const Recipes = forwardRef((props: RecipesProps, ref: any) => {
  const { recipes, showAction, children } = props;
  return (
    <Fragment>
      {recipes?.map((recipe) => {
        const {
          recipeId: { _id, name, recipeBlendCategory, averageRating, totalRating, image },
          defaultVersion,
        } = recipe;
        return (
          <div ref={ref} key={_id + showAction ? "Discover" : "Queue"} data-recipe={_id}>
            <RecipeCard
              variant="border"
              className="mt-10"
              title={name}
              category={recipeBlendCategory?.name}
              ratings={averageRating}
              noOfRatings={totalRating}
              image={image?.find((img) => img.default === true)?.image || image[0]?.image}
              recipeId={_id}
              ingredients={defaultVersion?.ingredients || []}
              calorie={defaultVersion?.calorie?.value}
              carbs={defaultVersion?.gigl?.netCarbs}
            >
              {children && showAction && React.cloneElement(children, { _id, recipe })}
            </RecipeCard>
          </div>
        );
      })}
    </Fragment>
  );
});

Recipes.displayName = "Recipes Panel";

export default RecipePanel;
