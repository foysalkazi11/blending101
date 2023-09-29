import React, { Children } from "react";
import PanelHeader from "../../../recipe/share/panelHeader/PanelHeader";
import WikiCard from "../../wikiCard/WikiCard";
import dummyData from "../dummyData";
import { WikiListType } from "type/wikiListType";
import { RecipeDetailsLeftSide } from "theme/skeletons/skeletonRecipeDetails";
import SlickSlider from "theme/carousel/SlickSlider";

interface Props {
  type?: string;
  wikiList?: WikiListType[];
  total?: number;
  loading?: boolean;
  viewItems?: "list" | "slider";
}

const RelatedWikiItem = ({
  type = "Ingredient",
  total = 0,
  wikiList = [],
  loading = false,
  viewItems = "list",
}: Props) => {
  if (loading) {
    return (
      <RecipeDetailsLeftSide
        style={viewItems === "slider" ? { display: "flex", gap: "2rem" } : {}}
        recipeCardStyle={viewItems === "slider" ? { maxWidth: "377px" } : {}}
      />
    );
  }
  return (
    <div className="sticky_top" style={{ width: "100%" }}>
      <PanelHeader
        icon={
          "/images/telescope.svg"
          // <FontAwesomeIcon icon={faChartColumn} fontSize="24" />
        }
        title={`Related ${type}`}
      />

      {viewItems === "list" &&
        wikiList?.map((wikiItem) => {
          const {
            _id,
            category,
            commentsCount,
            description,
            hasInCompare,
            image,
            isPublished,
            portions,
            publishedBy,
            status,
            type,
            wikiDescription,
            wikiTitle,
          } = wikiItem;
          return (
            <div key={_id} style={{ paddingBottom: "10px" }}>
              <WikiCard
                author={publishedBy}
                comments={commentsCount}
                description={wikiDescription}
                image={image}
                title={wikiTitle}
                type={type}
                portions={portions}
                id={_id}
                hasInCompare={hasInCompare}
              />
            </div>
          );
        })}
      {viewItems === "slider" && (
        <SlickSlider moreSetting={responsiveSetting}>
          {wikiList?.map((wikiItem) => {
            const {
              _id,
              category,
              commentsCount,
              description,
              hasInCompare,
              image,
              isPublished,
              portions,
              publishedBy,
              status,
              type,
              wikiDescription,
              wikiTitle,
            } = wikiItem;
            return (
              <div key={_id} className="pr-10">
                <WikiCard
                  author={publishedBy}
                  comments={commentsCount}
                  description={wikiDescription}
                  image={image}
                  title={wikiTitle}
                  type={type}
                  portions={portions}
                  id={_id}
                  hasInCompare={hasInCompare}
                />
              </div>
            );
          })}
        </SlickSlider>
      )}
    </div>
  );
};

export default RelatedWikiItem;

export const responsiveSetting = {
  slidesToShow: 4,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
