import React, { FC, useEffect } from "react";
import HeaderComponent from "../components/header/Header.component";
import SidebarComponent from "../components/sidebar/Sidebar.component";
import styles from "./container.module.scss";
import CollectionTray from "../components/sidetray/collection/RecipeCollectionAndThemeTray";
import NutritionTrayComponent from "../components/sidetray/wiki/nutrition/nutrition.component";
import HealthTrayComponent from "../components/sidetray/wiki/health/heath.component";
import IngredientTrayComponent from "../components/sidetray/wiki/ingredient/ingredient.component";
import FilterTray from "../components/sidetray/filter";
import CommentsTray from "../components/sidetray/commentsTray/RecipeCommentsTray";
import CartPanel from "../component/templates/Panel/CartPanel.component/Panel.component";
import VersionTray from "../components/sidetray/versionTray/VersionTray";
import WikiCommentsTray from "../components/sidetray/wikiCommentsTray";
import BlogCommentsTray from "../components/sidetray/blogCommentsTray";
import BlogCollectionTray from "../components/sidetray/blogCollectionTray";
import PlanCollectionTray from "../components/sidetray/planCollectionTray";
// import { push as Menu } from "react-burger-menu";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hooks";
import useWindowSize from "../components/utility/useWindowSize";

interface ShowTray {
  show: boolean;
  showTagByDeafult?: boolean;
  showPanle?: "left" | "right";
}

type AContainerProps = {
  showHeader?: boolean;
  showSidebar?: boolean;
  showCollectionTray?: ShowTray;
  showVersionTray?: ShowTray;
  showGroceryTray?: ShowTray;
  showCommentsTray?: ShowTray;
  showWikiCommentsTray?: ShowTray;
  showBlogCommentsTray?: ShowTray;
  showBlogCollectionTray?: ShowTray;
  showPlanCollectionTray?: ShowTray;
  showRecipeFilterTray?: ShowTray;
  logo?: boolean;
  headerTitle?: string;
  headerLogo?: string;
  children: React.ReactNode;
  nutritionTray?: Boolean;
  healthTray?: Boolean;
  ingredientTray?: Boolean;
  headerFullWidth?: Boolean;
};

const AContainer: FC<AContainerProps> = (props) => {
  const {
    showHeader = true,
    showSidebar = true,
    showCollectionTray = {
      show: false,
      showTagByDeafult: true,
      showPanle: "left",
    },
    showVersionTray = {
      show: false,
      showTagByDeafult: true,
      showPanle: "right",
    },
    showGroceryTray = {
      show: false,
      showTagByDeafult: true,
      showPanle: "right",
    },
    showCommentsTray = {
      show: false,
      showTagByDeafult: true,
      showPanle: "right",
    },
    showWikiCommentsTray = {
      show: false,
      showTagByDeafult: false,
      showPanle: "right",
    },
    showBlogCommentsTray = {
      show: false,
      showTagByDeafult: false,
      showPanle: "right",
    },
    showBlogCollectionTray = {
      show: false,
      showTagByDeafult: false,
      showPanle: "left",
    },
    showPlanCollectionTray = {
      show: false,
      showTagByDeafult: false,
      showPanle: "left",
    },
    showRecipeFilterTray = {
      show: false,
      showPanle: "left",
      showTagByDeafult: false,
    },
    logo = true,
    headerTitle = "",
    nutritionTray = false,
    healthTray = false,
    ingredientTray = false,
    headerFullWidth = false,
  } = props;

  const dispatch = useDispatch();
  const { openFilterTray } = useAppSelector((state) => state?.sideTray);
  const { width } = useWindowSize();
  // dispatch(setOpenFilterTray(!openFilterTray));

  // useEffect(() => {
  //   let viewport_meta = document.querySelector("[name=viewport]");
  //   if (viewport_meta) {
  //     let viewport = {
  //       default: `width=${width}`,
  //       responsiveWidth: `width=${600}`,
  //     };
  //     console.log(viewport_meta);
  //     console.log(viewport_meta.getAttribute("content"));
  //     console.log(viewport_meta.getAttribute("content").slice(6));
  //     // console.log(
  //     //   `${parseFloat(viewport_meta.getAttribute("content").slice(6)) - 320}`,
  //     // );
  //     const documentWidth = document.documentElement.clientWidth;
  //     const screenWidth = window.screen.width;
  //     const viewportWidth = window.innerWidth;
  //     console.log(documentWidth, screenWidth, viewportWidth);

  //     if (openFilterTray) {
  //       viewport_meta.setAttribute("content", viewport.responsiveWidth);
  //     } else {
  //       viewport_meta.setAttribute("content", viewport.default);
  //     }
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [openFilterTray]);
  return (
    <div className={styles.containerA} style={{ overflow: "hidden" }}>
      {showSidebar ? (
        <div className={styles.sidebarA}>
          <SidebarComponent />
        </div>
      ) : null}
      <div
        className={styles.mainA}
        style={headerFullWidth ? { width: "100%" } : {}}
        id="outer-container"
      >
        {showHeader ? (
          <HeaderComponent
            logo={logo}
            headerTitle={headerTitle}
            fullWidth={headerFullWidth}
          />
        ) : null}
        {showCollectionTray?.show ? (
          <div className={`${styles.fixed__main__left}`}>
            <CollectionTray
              showTagByDefaut={showCollectionTray?.showTagByDeafult}
              showPanle={showCollectionTray?.showPanle}
            />
          </div>
        ) : null}
        {showVersionTray?.show ? (
          <div className={`${styles.fixed__main__right}`}>
            <VersionTray
              showTagByDefaut={showVersionTray?.showTagByDeafult}
              showPanle={showVersionTray?.showPanle}
            />
          </div>
        ) : null}
        {showGroceryTray?.show ? (
          <div className={styles.fixed__main__right}>
            <CartPanel
              showTagByDefaut={showGroceryTray?.showTagByDeafult}
              showPanle={showGroceryTray?.showPanle}
            />
          </div>
        ) : null}
        {showCommentsTray?.show && (
          <div className={styles.fixed__main__right}>
            <CommentsTray
              showTagByDefaut={showCommentsTray?.showTagByDeafult}
              showPanle={showCommentsTray?.showPanle}
            />
          </div>
        )}
        {showWikiCommentsTray?.show && (
          <div className={styles.fixed__main__right}>
            <WikiCommentsTray
              showTagByDefaut={showWikiCommentsTray?.showTagByDeafult}
              showPanle={showWikiCommentsTray?.showPanle}
            />
          </div>
        )}
        {showBlogCommentsTray?.show && (
          <div className={styles.fixed__main__right}>
            <BlogCommentsTray
              showTagByDefaut={showBlogCommentsTray?.showTagByDeafult}
              showPanle={showBlogCommentsTray?.showPanle}
            />
          </div>
        )}
        {showBlogCollectionTray?.show && (
          <div className={styles.fixed__main__left}>
            <BlogCollectionTray
              showTagByDefaut={showBlogCollectionTray?.showTagByDeafult}
              showPanle={showBlogCollectionTray?.showPanle}
            />
          </div>
        )}
        {showPlanCollectionTray?.show && (
          <div className={styles.fixed__main__left}>
            <PlanCollectionTray
              showTagByDefaut={showPlanCollectionTray?.showTagByDeafult}
              showPanle={showPlanCollectionTray?.showPanle}
            />
          </div>
        )}
        {nutritionTray && (
          <div className={styles.fixed__main__left}>
            <NutritionTrayComponent title="Nutrition Lists" />
          </div>
        )}
        {healthTray && (
          <div className={styles.fixed__main__left}>
            <HealthTrayComponent title="Health Lists" />
          </div>
        )}
        {ingredientTray && (
          <div className={styles.fixed__main__left}>
            <IngredientTrayComponent title="Ingredient Lists" />
          </div>
        )}
        {showRecipeFilterTray && (
          // <Menu
          //   pageWrapId={"page-wrap"}
          //   outerContainerId={"outer-container"}
          //   isOpen={openFilterTray}
          //   customBurgerIcon={false}
          //   itemListElement="div"
          //   noOverlay
          // >

          // </Menu>
          <div className={styles.fixed__main__left}>
            <FilterTray
              showTagByDefaut={showRecipeFilterTray?.showTagByDeafult}
              showPanle={showRecipeFilterTray?.showPanle}
            />
          </div>
        )}
        <div id="page-wrap">{props.children}</div>
      </div>
    </div>
  );
};

export default AContainer;
