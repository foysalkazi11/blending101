import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCopy } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { BiBarChart } from "react-icons/bi";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  addPlanner,
  deleteRecipe,
  IPlannerRecipe,
} from "../../../../redux/slices/Planner.slice";
import { RECIPE_CATEGORY_COLOR } from "../../../../data/Recipe";
import CalendarTray from "../../../../theme/calendar/calendarTray.component";

import styles from "./Plan.module.scss";
import { useMutation } from "@apollo/client";
import {
  ADD_RECIPE_TO_PLANNER,
  ADD_TO_GROCERY_LIST,
  DELETE_RECIPE_FROM_PLANNER,
  MOVE_PLANNER,
} from "../../../../graphql/Planner";
import Publish from "../../../../helpers/Publish";
import { faChartSimple } from "@fortawesome/pro-solid-svg-icons";
import IconButton from "../../../atoms/Button/IconButton.component";

interface PlanProps {
  plannerId?: string;
  day?: string;
  date?: string;
  indexValue: number;
  setToggleOptionCard?: any;
  toggleOptionCard?: object;
  recipeList?: IPlannerRecipe[];
}

const Plan = (props: PlanProps) => {
  const { plannerId, day, date, indexValue, recipeList } = props;

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const [copyRecipes, copyState] = useMutation(ADD_RECIPE_TO_PLANNER);
  const [moveRecipes, moveState] = useMutation(MOVE_PLANNER, {
    refetchQueries: ["GetPlannerByWeek"],
  });
  const [deleteRecipes, deleteState] = useMutation(DELETE_RECIPE_FROM_PLANNER);

  if (!day && !date) return null;

  const deleteHandler = async (id) => {
    await Publish({
      mutate: deleteRecipes,
      variables: {
        plannerId,
        recipeId: id,
      },
      state: deleteState,
      success: `Deleted Planner sucessfully`,
      onSuccess: () => {
        dispatch(deleteRecipe({ recipeId: id, plannerId }));
      },
    });
  };

  const copyHandler = async (date, recipe) => {
    await Publish({
      mutate: copyRecipes,
      variables: {
        assignDate: date,
        recipeId: recipe._id,
        userId,
      },
      state: copyState,
      success: `Copied Planner sucessfully`,
      onSuccess: (data) => {
        console.log(recipe);
        dispatch(
          addPlanner({
            id: data?.createPlanner?._id,
            date: date,
            recipe: {
              _id: recipe._id,
              name: recipe.name,
              category: recipe?.category,
              rxScore: 786,
              calorie: 250,
            },
          }),
        );
        // dispatch(duplicateRecipe({ date, recipe }));
      },
    });
  };

  const moveHandler = async (date, recipe) => {
    await Publish({
      mutate: moveRecipes,
      variables: {
        data: {
          plannerId,
          assignDate: date,
          recipeId: recipe._id,
        },
      },
      state: moveState,
      success: `Moved Planner sucessfully`,
      // onSuccess: (data) => {
      //   console.log(data);
      //   dispatch(
      //     moveRecipe({
      //       currentPlannerId: plannerId,
      //       newPlannerId: data?.movePlanner?._id,
      //       date,
      //       recipe,
      //     }),
      //   );
      // },
    });
  };

  return (
    <div className={styles.plan}>
      <div
        className={styles.plan__dateDiv}
        style={indexValue % 2 == 0 ? { backgroundColor: "#eeeeee" } : {}}
      >
        <div className={styles.plan__dateDiv__day}>{day}</div>
        <div className={styles.plan__dateDiv__date}>{date}</div>
      </div>
      <div className={styles.plan__recipeDiv}>
        {recipeList?.map((recipe) => (
          <PlanRecipe
            key={recipe?._id}
            recipe={recipe}
            onDelete={deleteHandler}
            onCopy={copyHandler}
            onMove={moveHandler}
          />
        ))}
      </div>
    </div>
  );
};

interface RecipeColorIndicatorInterface {
  recipe: IPlannerRecipe;
  onCopy?: any;
  onMove?: any;
  onDelete?: any;
}
const PlanRecipe = ({
  recipe,
  onCopy,
  onMove,
  onDelete,
}: RecipeColorIndicatorInterface) => {
  const { _id, name: recipeName, calorie, category, rxScore } = recipe;

  const [showMenu, setShowMenu] = useState(false);
  const [showCalender, setShowCalender] = useState<"move" | "copy" | "">("");

  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const [addToGrocery, addState] = useMutation(ADD_TO_GROCERY_LIST, {
    refetchQueries: ["GetCartData"],
  });

  const style = { backgroundColor: RECIPE_CATEGORY_COLOR[category] };

  if (!recipeName) return null;

  const addToGroceryList = async () => {
    await Publish({
      mutate: addToGrocery,
      variables: {
        recipeId: _id,
        memberId: userId,
      },
      state: addState,
      success: `Added Ingredients to the Grocery List`,
      onSuccess: (data) => {},
    });
  };

  return (
    <div className={styles.recipe}>
      <div className={styles.recipe__containerDiv}>
        <div
          className={styles.recipe__containerDiv__colorIndicator}
          style={style}
        />
        {recipeName}
      </div>

      <div className={styles.recipe__rxScore}>{rxScore}</div>
      <div className={styles.recipe__calories}>{calorie}</div>
      <div className={styles.recipe__tray}>
        {/* <IconButton size="medium" fontName={faChartSimple} /> */}
        <BiBarChart
          className={styles.recipe__tray__icons}
          style={{ fontSize: "22px" }}
        />
        <BsCartPlus
          className={styles.recipe__tray__icons}
          onClick={addToGroceryList}
        />
        <HiOutlineDotsVertical
          onClick={() => setShowMenu((prev) => !prev)}
          className={styles.recipe__tray__icons}
        />
      </div>

      <div
        className={styles.recipe__optionTray}
        style={showMenu ? { display: "block", zIndex: "1" } : { zIndex: "-1" }}
      >
        <div className={styles.recipe__optionTray__pointingDiv} />
        <div className={styles.option} onClick={() => onDelete(_id)}>
          <span>Remove</span>
          <span className={styles.option__icon}>
            <RiDeleteBin6Line />
          </span>
        </div>
        <div
          className={styles.option}
          onClick={() => {
            setShowCalender("copy");
            setShowMenu(false);
          }}
        >
          <span>Copy</span>
          <span className={styles.option__icon}>
            <IoCopy />
          </span>
        </div>
        <div
          className={styles.option}
          onClick={() => {
            setShowCalender("move");
            setShowMenu(false);
          }}
        >
          <span>Move</span>
          <span className={styles.option__icon}>
            <IoCopy />
          </span>
        </div>
      </div>
      {showCalender !== "" && (
        <div className={styles.calender}>
          <CalendarTray
            handler={(date) => {
              showCalender === "copy"
                ? onCopy(date, recipe)
                : onMove(date, recipe);
              setShowCalender("");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Plan;
