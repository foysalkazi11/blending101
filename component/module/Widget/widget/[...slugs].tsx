import React from "react";
import { useRouter } from "next/router";
import { useRecipeCollections } from "../../../../hooks/modules/useWidget";
import AContainer from "../../../../containers/A.container";
import { useThemeTemplate } from "../../../../hooks/modules/useThemeMethod";
import Theme from "../../../molecules/Theme/Theme.component";
import Banner from "../../../molecules/Banner/Banner.component";

const WidgetCollection = () => {
  const router = useRouter();
  const [_, __, widgetSlug, collectionSlug] = router.query.slugs as string[];

  const collection = useRecipeCollections(widgetSlug, collectionSlug);
  const template = useThemeTemplate(collection?.themeLink);

  return (
    <AContainer
      headerIcon="/icons/whistle.svg"
      headerTitle="Widget Collection Details"
      headTagInfo={{
        title: "Challenge",
        description: "challenge",
      }}
    >
      <div className="mt-60 mb-20 ml-20 mr-20">
        <Banner link={collection?.bannerLink} className="mb-20 mt-60" />
        <div className="row">
          {collection?.data?.Recipes.map((recipe) => (
            <div key={recipe?._id} className="col-2">
              <Theme template={template} data={recipe} />
            </div>
          ))}
        </div>
      </div>
    </AContainer>
  );
};

export default WidgetCollection;
