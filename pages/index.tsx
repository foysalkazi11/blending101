import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Head from "next/head";

import React, { Fragment, useMemo } from "react";
import { useDispatch } from "react-redux";
import Overview from "../component/module/Home/Overview.component";
import { PAGES } from "../components/sidebar/Sidebar.component";
import { RECIPE_CATEGORY_COLOR } from "../data/Recipe";
import { GET_BLEND_TYPES } from "../graphql/Recipe";
import { useAppSelector } from "../redux/hooks";
import { updateSidebarActiveMenuName } from "../redux/slices/utilitySlice";
import styles from "../styles/pages/home.module.scss";
import useToUpdateFilterCriteria from "../customHooks/recipeFilter/useToUpdateRecipeFilterCriteria";
import { useWidget } from "../hooks/modules/useWidget";
import ContentTray from "../components/recipe/recipeDiscovery/ContentTray/ContentTray.component";
import Link from "next/link";
import CardComponent from "../theme/cards/card.component";
import Theme from "../component/molecules/Theme/Theme.component";
import { useThemeTemplate } from "../hooks/modules/useThemeMethod";
import { useUser } from "../context/AuthProvider";

const defaultBlendImg =
  "https://blending.s3.us-east-1.amazonaws.com/3383678.jpg";

const Home = () => {
  const { allFilters } = useAppSelector((state) => state?.filterRecipe);
  const displayName = useUser().name;
  const { data: blendTypes } = useQuery(GET_BLEND_TYPES);

  const dispatch = useDispatch();
  const router = useRouter();

  const widgetData = useWidget("home-collection");

  const widget = useMemo(() => {
    if (!widgetData) return;
    return {
      ...widgetData,
      widgetCollections: widgetData?.widgetCollections?.map((collection) => {
        const type = collection?.data?.collectionType;
        if (type === "GeneralBlog") {
          return {
            ...collection,
            data: {
              ...collection.data,
              [type]: collection?.data[type].map((item) => ({
                ...item,
                publishDateString: "8 months ago",
                string: "hello",
              })),
            },
          };
        } else {
          return collection;
        }
      }),
    };
  }, [widgetData]);

  const handleUpdateFilterCriteria = useToUpdateFilterCriteria();

  const handleToShowBlendTypes = (value: any) => {
    const findFilter = allFilters?.find((filter) => filter?.id === value?.id);
    if (!findFilter) {
      handleUpdateFilterCriteria({
        updateStatus: "add",
        value: value,
        filterCriteria: value.filterCategory,
      });
    }

    dispatch(updateSidebarActiveMenuName("Blends"));
    router.push("/recipe_discovery");
  };

  return (
    <Fragment>
      <div className={styles.container}>
        <div className="row">
          <div className="col-9">
            <div className={styles.quick}>
              <div className={styles.quick__site}>
                <h3>Explore Site</h3>
                <div>
                  {PAGES &&
                    PAGES.map((page, idx) =>
                      idx !== 0 ? (
                        <Link key={page.content} href={page.link}>
                          <img src={page.logo} alt={page.content} />
                          <h6>{page.content}</h6>
                        </Link>
                      ) : (
                        <></>
                      ),
                    )}
                </div>
              </div>
              <div className={styles.quick__category}>
                <h3>Explore Blend Types</h3>
                <div>
                  {blendTypes?.getAllCategories &&
                    blendTypes?.getAllCategories.map((type, idx) => (
                      <a
                        key={type._id}
                        // href={type._id}
                        // passHref
                        onClick={() =>
                          handleToShowBlendTypes({
                            name: type?.name,
                            image: type?.image || defaultBlendImg,
                            id: type?._id,
                            tagLabel: `Blend Type | ${type?.name}`,
                            filterCriteria: "blendTypes",
                            origin: {
                              activeSection: "visual",
                              filterCriteria: "blendTypes",
                              activeTab: "Blend Type",
                              childTab: type?.name || "",
                            },
                          })
                        }
                      >
                        <img src={type.image} alt={type.name} />
                        <span
                          style={{
                            backgroundColor: RECIPE_CATEGORY_COLOR[type.name],
                          }}
                        />
                        <h6>{type.name}</h6>
                      </a>
                    ))}
                </div>
              </div>
            </div>
            <div className={styles.alert}>
              <div className={styles.alert__content}>
                <h3>Hello {displayName}!</h3>
                <p>
                  You have current blending score is{" "}
                  <span className="bold text-green">85%</span>. Did you know
                  people who log their meals daily lose twice as weight as those
                  who don&apos;t? Check out &quot;
                  <span className="text-orange bold">
                    Food Logging like a Pro!
                  </span>
                  &quot;. It could help take your blending score to the next
                  level.
                </p>
              </div>
              <div className={styles.alert__image}>
                <h3>Food logging like a Pro!</h3>
                <img src="/images/smoothie.webp" alt="" />
              </div>
            </div>
            {widget?.widgetCollections.map((collection) => (
              <EntitySlider
                key={collection?.slug}
                collection={collection}
                methods={{
                  onComment: (e) => {
                    e.preventDefault();
                    console.log("Enabling COMMENT PANEL");
                  },
                }}
              />
            ))}
          </div>
          <div className="col-3">
            <Overview />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;

Home.meta = {
  sidebar: false,
  title: "Home",
  icon: "/icons/home.svg",
};

const getDetailURL = (domain: string, id: string, payload?: any) => {
  if (domain === "Recipe") return `recipe_details/${id}/`;
  if (domain === "Plan") return `/planner/plan/${id}/`;
  if (domain === "Wiki") return `/planner/plan/${id}/`;
  if (domain === "GeneralBlog") return `/planner/plan/${id}/`;
};

const EntitySlider = ({ collection, methods }) => {
  const { displayName, slug, data, theme } = collection;

  const { _id: themeId, link: file, style } = theme;
  const template = useThemeTemplate(file);

  return (
    <div className="mt-40">
      <Head>
        <link crossOrigin="" rel="stylesheet" type="text/css" href={style} />
      </Head>
      <ContentTray
        heading={displayName}
        image="/images/clock-light.svg"
        allUrl={`/${slug}`}
      >
        {data[data?.collectionType]?.map((item) => {
          return (
            <div id={`blend${themeId}`} key={item?._id}>
              <div style={{ paddingRight: "1rem" }}>
                <Link
                  href={getDetailURL(data?.collectionType, item?._id)}
                  style={{ color: "initial" }}
                >
                  <Theme template={template} data={item} methods={methods} />
                </Link>
              </div>
            </div>
          );
        })}
      </ContentTray>
    </div>
  );
};
