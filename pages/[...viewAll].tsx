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
import { GET_ALL_WIDGET_COLLECTION_DATA } from "../graphql/Widget";

import styles from "../components/recipe/recipeDiscovery/recipeDiscovery.module.scss";
import classes from "../styles/pages/viewAll.module.scss";
import ShowCollectionModal from "../components/showModal/ShowCollectionModal";
import useForAddToCollection from "../customHooks/useForAddToCollection";
import useForOpenCollectionTray from "../customHooks/useForOpenCollection";
import useThemeMethod from "../hooks/modules/useThemeMethod";

const ViewAll = () => {
  const router = useRouter();
  const widgetId = router.query?.id as string;
  const params = router.query?.viewAll as string[];

  const { filters } = useAppSelector((state) => state?.filterRecipe);
  const { blends, ingredients, openFilterTray } = useAppSelector(
    (state) => state.sideTray,
  );

  const { data } = useQuery(GET_ALL_WIDGET_COLLECTION_DATA, {
    variables: {
      widgetSlug: params && params[0],
      collectionSlug: params && params[1],
    },
    skip: params?.length === 0,
  });

  const collection = data?.getWidgetCollectionbySlugForClient;
  const items = collection?.data?.[collection?.data?.collectionType] || [];

  const [theme, setTheme] = useState("");
  const [openCollectionModal, setOpenCollectionModal] = useState(false);

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

  const handleAddToCollection = useForAddToCollection();
  const handleOpenCollectionTray = useForOpenCollectionTray();
  const [compareRecipeList, setcompareRecipeList] = useLocalStorage<any>(
    "compareList",
    [],
  );

  const collectionHandler = (e, id: string) => {
    console.log(e);
    alert("I am executed");
    // const item = items.find((i) => i._id === id);
    // const isCollectionIds = item?.userCollections;
    // const recipeId = item?._id;
    // isCollectionIds?.length
    //   ? handleOpenCollectionTray(recipeId, isCollectionIds, e)
    //   : handleAddToCollection(
    //       recipeId,
    //       setOpenCollectionModal,
    //       e,
    //       setcompareRecipeList,
    //     );
  };

  const RecipeRef = useThemeMethod({ toggleCollection: collectionHandler });

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
      <ul className="list-collection">
        <li className="toggleCollection">1</li>
        <li className="toggleCollection">2</li>
        <li className="toggleCollection">3</li>
      </ul>
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
                <img
                  src="https://blending.s3.us-east-1.amazonaws.com/thumbnail/Recipe/_3009104.50140353/images/rating.svg"
                  alt=""
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
                  ref={RecipeRef}
                  className="col-3"
                  data-id={item._id}
                  dangerouslySetInnerHTML={{
                    __html: ejs.render(theme, {
                      data: item,
                      methods: { toggleCollection: collectionHandler },
                    }),
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <ShowCollectionModal
        open={openCollectionModal}
        setOpen={setOpenCollectionModal}
        shouldCloseOnOverlayClick={true}
      />
      <div className={styles.footerMainDiv}>
        <FooterRecipeFilter />
      </div>
    </AContainer>
  );
};

export default ViewAll;
