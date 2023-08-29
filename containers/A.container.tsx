import React, { FC } from "react";
import HeaderComponent from "../components/header/Header.component";
import SidebarComponent from "../components/sidebar/Sidebar.component";
import styles from "./container.module.scss";
import CollectionTray from "../components/sidetray/collection/RecipeCollectionAndThemeTray";
import FilterTray from "../components/sidetray/filter";
import CommentsTray from "../components/sidetray/commentsTray/RecipeCommentsTray";
import CartPanel from "../component/templates/Panel/CartPanel.component/Panel.component";
import VersionTray from "../components/sidetray/versionTray/VersionTray";
import WikiCommentsTray from "../components/sidetray/wikiCommentsTray";
import BlogCommentsTray from "../components/sidetray/blogCommentsTray";
import BlogCollectionTray from "../components/sidetray/blogCollectionTray";
import PlanCollectionTray from "../components/sidetray/planCollectionTray";
import FooterRecipeFilter from "../components/footer/footerRecipeFilter.component";
import HeadTagInfo, { HeadTagInfoType } from "../theme/headTagInfo";
import PlanCommentsTray from "../components/sidetray/planCommentsTray";
import NotificationTray from "../components/sidetray/notificationTray";
import PlanFilterTray from "../components/sidetray/planFilterTray";

interface ShowTray {
  show: boolean;
  showTagByDefault?: boolean;
  showPanel?: "left" | "right";
}

type AContainerProps = {
  showHeader?: boolean;
  showSidebar?: boolean;
  showCollectionTray?: ShowTray;
  showPlanFilterTray?: ShowTray;
  showVersionTray?: ShowTray;
  showGroceryTray?: ShowTray;
  showCommentsTray?: ShowTray;
  showCommentsTrayForPlan?: ShowTray;
  showWikiCommentsTray?: ShowTray;
  showBlogCommentsTray?: ShowTray;
  showBlogCollectionTray?: ShowTray;
  showPlanCollectionTray?: ShowTray;
  showRecipeFilterTray?: ShowTray;
  showNotificationTray?: ShowTray;
  logo?: boolean;
  headerTitle?: string;
  headerIcon?: string | React.ReactNode;
  children: React.ReactNode;
  nutritionTray?: Boolean;
  healthTray?: Boolean;
  ingredientTray?: Boolean;
  headerFullWidth?: Boolean;
  headTagInfo?: HeadTagInfoType;
};

const AContainer: FC<AContainerProps> = (props) => {
  const {
    headerIcon = "",
    showHeader = true,
    showSidebar = true,
    showCollectionTray = {
      show: false,
      showTagByDefault: true,
      showPanel: "left",
    },
    showPlanFilterTray = {
      show: false,
      showTagByDefault: true,
      showPanel: "left",
    },
    showVersionTray = {
      show: false,
      showTagByDefault: true,
      showPanel: "right",
    },
    showGroceryTray = {
      show: false,
      showTagByDefault: true,
      showPanel: "right",
    },
    showCommentsTray = {
      show: false,
      showTagByDefault: true,
      showPanel: "right",
    },
    showCommentsTrayForPlan = {
      show: false,
      showTagByDefault: false,
      showPanel: "right",
    },
    showWikiCommentsTray = {
      show: false,
      showTagByDefault: false,
      showPanel: "right",
    },
    showBlogCommentsTray = {
      show: false,
      showTagByDefault: false,
      showPanel: "right",
    },
    showBlogCollectionTray = {
      show: false,
      showTagByDefault: false,
      showPanel: "left",
    },
    showPlanCollectionTray = {
      show: false,
      showTagByDefault: false,
      showPanel: "left",
    },
    showRecipeFilterTray = {
      show: false,
      showPanel: "left",
      showTagByDefault: false,
    },
    showNotificationTray = {
      show: true,
      showPanel: "right",
      showTagByDefault: false,
    },
    logo = true,
    headerTitle = "",
    nutritionTray = false,
    healthTray = false,
    ingredientTray = false,
    headerFullWidth = false,
    headTagInfo = { description: "", title: "" },
  } = props;

  return (
    <div className={styles.containerA}>
      <HeadTagInfo {...headTagInfo} />
      {showSidebar ? (
        <div className={styles.sidebarA}>
          <SidebarComponent />
        </div>
      ) : null}
      <div
        className={styles.mainA}
        style={headerFullWidth ? { width: "100%" } : {}}
      >
        {showHeader ? (
          <HeaderComponent
            logo={logo}
            headerTitle={headerTitle}
            fullWidth={headerFullWidth}
            headerIcon={headerIcon}
          />
        ) : null}
        {showCollectionTray?.show ? (
          <div className={`${styles.fixed__main__left}`}>
            <CollectionTray
              showTagByDefaut={showCollectionTray?.showTagByDefault}
              showPanle={showCollectionTray?.showPanel}
            />
          </div>
        ) : null}
        {showPlanFilterTray?.show ? (
          <div className={`${styles.fixed__main__left}`}>
            <PlanFilterTray
              showTagByDefaut={showCollectionTray?.showTagByDefault}
              showPanle={showCollectionTray?.showPanel}
            />
          </div>
        ) : null}
        {showVersionTray?.show ? (
          <div className={`${styles.fixed__main__right}`}>
            <VersionTray
              showTagByDefaut={showVersionTray?.showTagByDefault}
              showPanle={showVersionTray?.showPanel}
            />
          </div>
        ) : null}
        {showGroceryTray?.show ? (
          <div className={styles.fixed__main__right}>
            <CartPanel
              showTagByDefaut={showGroceryTray?.showTagByDefault}
              showPanle={showGroceryTray?.showPanel}
            />
          </div>
        ) : null}
        {showCommentsTray?.show && (
          <div className={styles.fixed__main__right}>
            <CommentsTray
              showTagByDefaut={showCommentsTray?.showTagByDefault}
              showPanle={showCommentsTray?.showPanel}
            />
          </div>
        )}
        {showCommentsTrayForPlan?.show && (
          <div className={styles.fixed__main__right}>
            <PlanCommentsTray
              showPanle={showCommentsTrayForPlan.showPanel}
              showTagByDefaut={showCommentsTrayForPlan.showTagByDefault}
            />
          </div>
        )}
        {showWikiCommentsTray?.show && (
          <div className={styles.fixed__main__right}>
            <WikiCommentsTray
              showTagByDefaut={showWikiCommentsTray?.showTagByDefault}
              showPanle={showWikiCommentsTray?.showPanel}
            />
          </div>
        )}
        {showBlogCommentsTray?.show && (
          <div className={styles.fixed__main__right}>
            <BlogCommentsTray
              showTagByDefaut={showBlogCommentsTray?.showTagByDefault}
              showPanle={showBlogCommentsTray?.showPanel}
            />
          </div>
        )}
        {showNotificationTray?.show && (
          <div className={styles.fixed__main__right}>
            <NotificationTray
              showTagByDefaut={showBlogCommentsTray?.showTagByDefault}
              showPanle={showBlogCommentsTray?.showPanel}
            />
          </div>
        )}
        {showBlogCollectionTray?.show && (
          <div className={styles.fixed__main__left}>
            <BlogCollectionTray
              showTagByDefaut={showBlogCollectionTray?.showTagByDefault}
              showPanle={showBlogCollectionTray?.showPanel}
            />
          </div>
        )}
        {showPlanCollectionTray?.show && (
          <div className={styles.fixed__main__left}>
            <PlanCollectionTray
              showTagByDefaut={showPlanCollectionTray?.showTagByDefault}
              showPanle={showPlanCollectionTray?.showPanel}
            />
          </div>
        )}
        {showRecipeFilterTray && (
          <div className={styles.fixed__main__left}>
            <FilterTray
              showTagByDefaut={showRecipeFilterTray?.showTagByDefault}
              showPanle={showRecipeFilterTray?.showPanel}
            />
          </div>
        )}
        {props.children}
        <FooterRecipeFilter />
      </div>
    </div>
  );
};

export default AContainer;
