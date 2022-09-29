import React, { useEffect, useState } from "react";
import { faTimes } from "@fortawesome/pro-solid-svg-icons";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import ejs from "ejs";

import FooterRecipeFilter from "../components/footer/footerRecipeFilter.component";
import DiscoverPageSearch from "../components/recipe/recipeDiscovery/discoverPageSearch/DiscoverPageSearch.Component";
import FilterPageBottom from "../components/recipe/recipeFilter/filterBottom.component";
import SearchtagsComponent from "../components/searchtags/searchtags.component";
import AContainer from "../containers/A.container";
import IconButton from "../component/atoms/Button/IconButton.component";

import useLocalStorage from "../customHooks/useLocalStorage";
import { useAppSelector } from "../redux/hooks";
import { GET_GRID_WIDGET_DATA } from "../graphql/Widget";

import styles from "../components/recipe/recipeDiscovery/recipeDiscovery.module.scss";
import classes from "../styles/pages/viewAll.module.scss";

const ViewAll = () => {
  const router = useRouter();
  const widgetId = router.query?.id as string;
  const params = router.query?.viewAll as string[];

  const { filters } = useAppSelector((state) => state?.filterRecipe);
  const { blends, ingredients, openFilterTray } = useAppSelector(
    (state) => state.sideTray,
  );

  const { data } = useQuery(GET_GRID_WIDGET_DATA, {
    variables: {
      collection: params && params[0],
      widget: widgetId,
    },
    skip: widgetId === "" || params?.length === 0,
  });

  const collection = data?.getWidgetCollectionbyDisplayName;
  const items = collection?.data[collection?.data?.collectionType] || [];

  const [theme, setTheme] = useState("");
  useEffect(() => {
    if (!collection?.themeLink) return;
    fetch(collection?.themeLink)
      .then((r) => r.text())
      .then((t) => {
        setTheme(t);
      });
  }, [collection?.themeLink]);

  const [banner, setBanner] = useState("");
  useEffect(() => {
    if (!collection?.bannerLink) return;
    fetch(collection?.bannerLink)
      .then((r) => r.text())
      .then((t) => {
        setBanner(t);
      });
  }, [collection?.bannerLink]);

  return (
    <AContainer
      showCollectionTray={{ show: true, showTagByDeafult: true }}
      filterTray={true}
      showCommentsTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
    >
      <div className={styles.main__div}>
        <div
          style={{
            marginLeft: openFilterTray ? "310px" : "16px",
            transition: "all 0.5s",
          }}
        >
          <DiscoverPageSearch />
          {blends.length || ingredients.length || filters?.length ? (
            <SearchtagsComponent />
          ) : null}
        </div>

        {blends.length || ingredients.length || filters?.length ? (
          <FilterPageBottom
            blends={blends}
            ingredients={ingredients}
            filters={filters}
          />
        ) : (
          <div>
            <div className={classes.head}>
              <div className="flex ai-center">
                <img
                  className={classes.head__icon}
                  src={collection?.icon}
                  alt={collection?.displayName}
                />
                <h2 className={classes.head__title}>
                  {collection?.displayName}
                </h2>
              </div>
              <IconButton
                fontName={faTimes}
                variant="secondary"
                size="small"
                colorCode="#fff"
                onClick={() => {
                  router.back();
                }}
              />
            </div>
            <div
              className="mb-30"
              dangerouslySetInnerHTML={{
                __html: banner,
              }}
            />
            <div className="row mb-20">
              {items?.map((item, idx) => (
                <div
                  key={idx}
                  className="col-2"
                  dangerouslySetInnerHTML={{
                    __html: ejs.render(theme, { data: item, methods: {} }),
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={styles.footerMainDiv}>
        <FooterRecipeFilter />
      </div>
    </AContainer>
  );
};

export default ViewAll;
