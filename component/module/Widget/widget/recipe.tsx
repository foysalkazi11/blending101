import React, { useState } from "react";
import AContainer from "../../../../containers/A.container";
import { useRecipeWidget } from "../../../../hooks/modules/useWidget";
import Banner from "../../../molecules/Banner/Banner.component";
import Link from "next/link";
import PlanCard from "../../Planner/PlanCard.component";
import ContentTray from "../../../../components/recipe/recipeDiscovery/ContentTray/ContentTray.component";
import { data } from "../../../../data/Temporary";
import { useThemeTemplate } from "../../../../hooks/modules/useThemeMethod";
import Theme from "../../../molecules/Theme/Theme.component";

const Test = () => {
  const widget = useRecipeWidget("recipe-theme");
  return (
    <AContainer
      headerIcon="/icons/whistle.svg"
      headerTitle="Challenges"
      headTagInfo={{
        title: "Challenge",
        description: "challenge",
      }}
    >
      <div className="mt-20 mb-20 ml-20 mr-20">
        {/* A WIDGET WITH SLIDER VIEW */}
        <div className="wc">
          <Banner link={widget?.bannerId?.link} className="mb-20" />
          <h1>{widget?.widgetName}</h1>
          <div className="row">
            {widget?.widgetCollections.map((collection) => (
              <Recipes key={collection._id} collection={collection} />
            ))}
          </div>
        </div>
      </div>
    </AContainer>
  );
};

const Recipes = ({ collection }) => {
  const [tab, setTab] = useState("");
  const template = useThemeTemplate(collection?.themeLink);
  return (
    <div className="mt-40">
      <ContentTray
        heading={collection.displayName}
        hasFilter={collection?.showTabMenu}
        filters={collection.filter.values.map((value) => value.label)}
        tabState={[tab, setTab]}
        image="/images/clock-light.svg"
        allUrl="planner/recent"
      >
        {collection?.data?.Recipes?.map((item) => (
          <div key={item?._id}>
            <Theme template={template} data={item} />
          </div>
        ))}
      </ContentTray>
    </div>
  );
};

export default Test;
