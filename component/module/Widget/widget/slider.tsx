import React, { useState } from "react";
import AContainer from "../../../../containers/A.container";
import { usePlanWidget } from "../../../../hooks/modules/useWidget";
import Banner from "../../../molecules/Banner/Banner.component";
import PlanCard from "../../../../modules/plan/partials/Shared/PlanCard.component";
import ContentTray from "../../../../components/recipe/recipeDiscovery/ContentTray/ContentTray.component";

const Test = () => {
  const [tab, setTab] = useState("");
  const widget = usePlanWidget("cooks-favourite");
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
              <div key={collection._id} className="mt-40">
                <ContentTray
                  heading={collection.displayName}
                  hasFilter={collection?.showTabMenu}
                  filters={collection.filter.values.map((value) => value.label)}
                  tabState={[tab, setTab]}
                  image="/images/clock-light.svg"
                  allUrl="planner/recent"
                >
                  {collection?.data?.Plans?.map((item) => (
                    <div key={item?._id}>
                      <div className="mr-10">
                        <PlanCard
                          planId={item?._id}
                          title={item.planName}
                          image={item?.image?.url}
                          isCollectionIds={item?.planCollections}
                          noOfComments={item?.commentsCount}
                          // setOpenCollectionModal={setOpenCollectionModal}
                          planComrFrom="list"
                        />
                      </div>
                    </div>
                  ))}
                </ContentTray>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AContainer>
  );
};

export default Test;
