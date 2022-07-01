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
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_RECIPES_FOR_PLANNER } from "../../../../graphql/Planner";
import Pagination from "../../../molecules/Pagination/ServerPagination.component";
import Combobox from "../../../organisms/Forms/Combobox.component";
import { RECIPE_CATEGORY } from "../../../../data/Recipe";
import Searchbox from "../../../molecules/Searchbox/Searchbox.component";
import { GET_BLEND_CATEGORY } from "../../../../graphql/Recipe";

const plannerIcon = (
  <div className={styles.plannerIcon}>
    <Image src={"/images/planner.svg"} alt="" layout="fill" objectFit="cover" />
  </div>
);

const PlannerPanel = () => {
  const [toggler, setToggler] = useState(true);
  return (
    <>
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
      {toggler ? <Discovery /> : <Queue />}
    </>
  );
};

const Discovery = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [type, setType] = useState("");
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const [recipes, setRecipes] = useState([]);

  const blendTypeRef = useRef<HTMLDivElement>(null);

  const { data: categories } = useQuery(GET_BLEND_CATEGORY);
  const [getRecipes, { loading, data }] = useLazyQuery(GET_RECIPES_FOR_PLANNER);

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
  }, [getRecipes, limit, page, query, type, userId]);

  useEffect(() => {
    setRecipes(data?.getAllRecipesForPlanner?.recipes || []);
  }, [data]);

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
      <Recipes recipes={recipes} />
      <div className="flex ai-center jc-center mt-20">
        <Pagination pageState={[page, setPage]} totalPage={5} />
      </div>
    </Fragment>
  );
};

const Queue = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [type] = useState("");
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const [recipes, setRecipes] = useState([]);

  const [getRecipes, { loading, data }] = useLazyQuery(GET_RECIPES_FOR_PLANNER);

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
  }, [getRecipes, limit, page, query, type, userId]);

  useEffect(() => {
    setRecipes(data?.getAllRecipesForPlanner || []);
  }, [data]);

  return (
    <div>
      <Recipes recipes={recipes} />
      <div className="flex ai-center jc-center mt-20">
        <Pagination
          pageState={[page, setPage]}
          totalPage={data?.getAllRecipesForPlanner?.totalRecipe || 0}
        />
      </div>
    </div>
  );
};

const Recipes = (props) => {
  const { recipes } = props;
  const [showCalenderId, setShowCalenderId] = useState("");

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
          <RiCalendarEventLine
            className={styles.calender}
            onClick={() =>
              setShowCalenderId((prev) => (showCalenderId === _id ? "" : _id))
            }
          />
          {showCalenderId === _id && (
            <div className={styles.calender__tray}>
              <CalendarTray />
            </div>
          )}
        </div>
      </RecipeCard>
    );
  });
};
export default PlannerPanel;
