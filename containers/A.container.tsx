import React from "react";
import HeaderComponent from "../components/header/Header.component";
import SidebarComponent from "../components/sidebar/Sidebar.component";
import styles from "./container.module.scss";
import WikiTray from "../components/sidetray/wiki/wikiTray.component";
import CollectionTray from "../components/sidetray/collection/collectionTray.component";
import NutritionTrayComponent from "../components/sidetray/wiki/nutrition/nutrition.component";
import HealthTrayComponent from "../components/sidetray/wiki/health/heath.component";
import IngredientTrayComponent from "../components/sidetray/wiki/ingredient/ingredient.component";
import Filtertray from "../components/sidetray/filter/filterTray.component";
import CommentsTray from "../components/sidetray/commentsTray/CommentsTray";
import CartPanel from "../component/templates/Panel/CartPanel.component/Panel.component";
import VersionTray from "../components/sidetray/versionTray/VersionTray";

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
  logo?: boolean;
  headerTitle?: string;
  headerLogo?: string;
  children: React.ReactNode;
  nutritionTray?: Boolean;
  healthTray?: Boolean;
  ingredientTray?: Boolean;
  filterTray?: Boolean;
  headerFullWidth?: Boolean;
};

export default function AContainer(props: AContainerProps) {
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
    logo = true,
    headerTitle = "",
    nutritionTray = false,
    healthTray = false,
    ingredientTray = false,
    filterTray = false,
    headerFullWidth = false,
  } = props;

  return (
    <div className={styles.containerA}>
      {showSidebar ? (
        <div className={styles.sidebarA}>
          <SidebarComponent />
        </div>
      ) : null}
      <div className={styles.mainA}>
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
        {filterTray && (
          <div className={styles.fixed__main__left}>
            <Filtertray filter="true" />
          </div>
        )}

        {props.children}
      </div>
    </div>
  );
}
