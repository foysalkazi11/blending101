import React from "react";
import { useAuth } from "../auth/auth.component";
import HeaderComponent from "../components/header/Header.component";
import SidebarComponent from "../components/sidebar/Sidebar.component";
import SidetrayrightComponent from "../components/sidetray/sidetrayRight/SidetrayRight.component";
import styles from "./container.module.scss";
import WikiTray from "../components/sidetray/wiki/wikiTray.component";
import CollectionTray from "../components/sidetray/collection/collectionTray.component";
import NutritionTrayComponent from "../components/sidetray/wiki/nutrition/nutrition.component";
import HealthTrayComponent from "../components/sidetray/wiki/health/heath.component";
import IngredientTrayComponent from "../components/sidetray/wiki/ingredient/ingredient.component";
import Filtertray from "../components/sidetray/filter/filterTray.component";
import CommentsTray from "../components/sidetray/commentsTray/CommentsTray";

type AContainerProps = {
  showHeader?: boolean;
  showSidebar?: boolean;
  showLeftTray?: boolean;
  showRighTray?: boolean;
  logo?: boolean;
  headerTitle?: string;
  headerLogo?: string;
  children: React.ReactNode;
  nutritionTray?: Boolean;
  healthTray?: Boolean;
  ingredientTray?: Boolean;
  filterTray?: Boolean;
  headerFullWidth?: Boolean;
  commentsTray?: boolean;
};

export default function AContainer(props: AContainerProps) {
  const { user } = useAuth();
  const {
    showHeader = true,
    showSidebar = true,
    showLeftTray = false,
    showRighTray = false,
    logo = true,
    headerTitle = "",
    nutritionTray = false,
    healthTray = false,
    ingredientTray = false,
    filterTray = false,
    headerFullWidth = false,
    commentsTray = false,
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
        {showLeftTray ? (
          <div className={styles.fixed__main__left}>
            <CollectionTray />
          </div>
        ) : null}
        {showRighTray ? (
          <div className={styles.fixed__main__right}>
            <SidetrayrightComponent />
          </div>
        ) : null}
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
        {commentsTray && (
          <div className={styles.fixed__main__right}>
            <CommentsTray />
          </div>
        )}
        {props.children}
      </div>
    </div>
  );
}
