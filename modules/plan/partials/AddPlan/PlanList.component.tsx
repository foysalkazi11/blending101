import { faBlender, faChartSimple, faTrash } from "@fortawesome/pro-light-svg-icons";

import IconButton from "component/atoms/Button/IconButton.component";

import { UserRecipe } from "@/recipe/recipe.types";
import { RECIPE_CATEGORY_COLOR } from "data/Recipe";
import { useAppDispatch } from "redux/hooks";
import { setShowPanel } from "redux/slices/Ui.slice";

import { MyPlanItem } from "@/app/types/plan.types";
import styles from "./PlanList.module.scss";

interface PlanListProps {
  data?: MyPlanItem[];
  onRemove?: any;
}

const PlanList = (props: PlanListProps) => {
  const { data, onRemove } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__header}>
        <span></span>
        <span>Calorie</span>
        <span>Rx Facts</span>
        <span>Price</span>
      </div>
      {data?.map((planner, index) => {
        return (
          <DayPlan
            key={planner.day}
            plannerId={planner.day}
            indexValue={index}
            day="Day"
            date={`${index + 1}`}
            recipeList={planner.recipes}
            onRemove={onRemove}
          />
        );
      })}
    </div>
  );
};

export default PlanList;

interface PlanProps {
  plannerId?: number;
  day?: string;
  date?: string;
  indexValue: number;
  recipeList?: UserRecipe[];
  cart?: boolean;
  onRemove?: any;
}

const DayPlan = (props: PlanProps) => {
  const { plannerId, day, date, indexValue, recipeList, cart, onRemove } = props;
  return (
    <div className={styles.plan}>
      <div className={styles.plan__dateDiv} style={indexValue % 2 == 0 ? { backgroundColor: "#eeeeee" } : {}}>
        <div className={styles.plan__dateDiv__day}>{day}</div>
        <div className={styles.plan__dateDiv__date}>{date}</div>
      </div>
      <div className={styles.plan__recipeDiv}>
        {recipeList?.map((recipe) => (
          <PlanItem key={recipe?.recipeId?._id} plannerId={plannerId} cart={cart} recipe={recipe} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
};

interface RecipeColorIndicatorInterface {
  recipe: UserRecipe;
  plannerId: number;
  isEditMode?: boolean;
  cart?: boolean;
  onRemove?: any;
}
const PlanItem = (props: RecipeColorIndicatorInterface) => {
  const { recipe, plannerId, onRemove } = props;
  const { recipeId, defaultVersion } = recipe;

  const dispatch = useAppDispatch();
  const calorie = Math.round(defaultVersion?.calorie?.value);
  const ingredients = recipe?.defaultVersion?.ingredients || [];
  const category = recipeId?.recipeBlendCategory?.name;

  const style = { backgroundColor: RECIPE_CATEGORY_COLOR[category] };

  if (!recipeId.name) return null;

  return (
    <div className={styles.recipe}>
      <div className={styles.recipe__containerDiv}>
        <div className={styles.recipe__containerDiv__colorIndicator} style={style} />
        {recipeId.name}
      </div>
      <div className={styles.recipe__rxScore}>{calorie || 0}</div>
      <div className={styles.recipe__calories}>{defaultVersion.gigl.rxScore || 0}</div>
      <div className={styles.recipe__calories}>${0}</div>
      <div className={styles.recipe__tray}>
        <IconButton
          size="medium"
          variant="hover"
          fontName={faBlender}
          color="primary"
          onClick={() =>
            dispatch(
              setShowPanel({
                name: "Ingredient",
                show: true,
                payload: ingredients,
              }),
            )
          }
        />
        <IconButton
          size="medium"
          variant="hover"
          fontName={faChartSimple}
          color="primary"
          onClick={() =>
            dispatch(
              setShowPanel({
                name: "RXPanel",
                show: true,
                payload: ingredients?.map((ing) => ({
                  ingredientId: ing?.ingredientId?._id,
                  value: ing?.selectedPortion?.gram,
                })),
              }),
            )
          }
        />
        {onRemove && (
          <IconButton
            size="medium"
            variant="hover"
            fontName={faTrash}
            color="primary"
            onClick={() => onRemove(plannerId, recipeId._id)}
          />
        )}
      </div>
    </div>
  );
};
