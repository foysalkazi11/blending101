import React from "react";
import AContainer from "../../containers/A.container";
import Widget from "../../component/module/Widget/Widget.component";
import { useWidgetCollections } from "../../hooks/modules/useWidget";
import Banner from "../../component/molecules/Banner/Banner.component";
import Link from "next/link";

const Test = () => {
  const widget = useWidgetCollections("recipe-theme");
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
        {/* A WIDGET WITH GRID VIEW */}
        <div className="wc">
          <Banner link={widget?.bannerId.link} className="mb-20" />
          <h1>{widget?.widgetName}</h1>
          <div className="row">
            {widget?.widgetCollections.map((collection) => (
              <div key={collection._id} className="col-3">
                <Link href={`widget/grid/recipe-theme/${collection.slug}`}>
                  <a>
                    <h1 className="wc_card">{collection.displayName}</h1>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AContainer>
  );
};

export default Test;
