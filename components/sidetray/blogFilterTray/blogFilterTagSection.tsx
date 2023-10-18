import { useQuery } from "@apollo/client";
import GET_ALL_ADMIN from "gqlLib/user/queries/getAllAdmin";
import React, { useState } from "react";
import CustomAccordion from "theme/accordion/accordion.component";
import FilterItemWithCheckmark from "../common/filterItemWithCharkmark";
import OptionSelect from "../filter/optionSelect/OptionSelect";
import GET_ALL_BLOG_COLLECTIONS from "gqlLib/blog/query/getAllBlogCollections";
import { useUser } from "context/AuthProvider";

type BlogPublisherType = {
  [key: string]: {
    _id: string;
    categories: { label: string; value: string }[];
  };
};

const publisher: BlogPublisherType = {
  poily: {
    _id: "643e2a567ce212e372cbfb69",
    categories: [
      { label: "Monitoring and Evaluation", value: "monitoring_and_evaluation" },
      // { label: 'How To', value: 'how_to' },
      { label: "Our Work", value: "our_work" },
      { label: "Practice Domains", value: "practice_domains" },
      { label: "Partner Spotlight", value: "partner_spotlight" },
      { label: "Data Visualization", value: "data_visualization" },
      // { label: 'Spot Light', value: 'spot_light' },
    ],
  },
  blending101: {
    _id: "643e29e87ce212e372cbfb66",
    categories: [{ label: "Blending101", value: "blending101" }],
  },
  plantMilkmakers: {
    _id: "650c14fba57ef09efe92d52e",
    categories: [{ label: "PlantMilkmakers", value: "plantMilkmakers" }],
  },
};

const BlogFilterTagSection = () => {
  const user = useUser();
  const [activePublisher, setActivePublisher] = useState<string[]>([]);
  const { data: getAllAdminData, loading: getAllAdminLoading } = useQuery(GET_ALL_ADMIN);
  const { data: blogCollectionData, loading: blogCollectionLoading } = useQuery(GET_ALL_BLOG_COLLECTIONS, {
    variables: { memberId: user?.id },
  });

  const handleActivePublisher = (value: string) => {
    if (activePublisher?.includes(value)) {
      setActivePublisher((activePublisher) => activePublisher?.filter((publisher) => publisher !== value));
    } else {
      setActivePublisher((activePublisher) => [...activePublisher, value]);
    }
  };
  return (
    <>
      <CustomAccordion title="Author" iconRight>
        <OptionSelect
          optionSelectItems={getAllAdminData?.getAllAdmin?.map((admin) => ({
            ...admin,
            name: admin?.displayName || `${admin?.firstName} ${admin?.lastName}`,
          }))}
          optionsLoading={getAllAdminLoading}
          style={{ marginTop: "1rem" }}
        />
      </CustomAccordion>
      <CustomAccordion title="Publishers" iconRight>
        {Object.entries(publisher)?.map(([key, value]) => {
          return (
            <React.Fragment key={key}>
              <FilterItemWithCheckmark
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={key}
                isChecked={(value) => activePublisher?.includes(value)}
                onClick={(value) => handleActivePublisher(value)}
              />
              {activePublisher?.includes(key) && (
                <CustomAccordion title="Category" iconRight style={{ padding: "0 1rem" }}>
                  <OptionSelect
                    optionSelectItems={value?.categories?.map((category) => ({
                      name: category.label,
                      _id: category.value,
                    }))}
                    style={{ marginTop: "1rem" }}
                  />
                </CustomAccordion>
              )}
            </React.Fragment>
          );
        })}
      </CustomAccordion>
      <CustomAccordion title="Collections" iconRight>
        <OptionSelect
          optionSelectItems={blogCollectionData?.getAllBlogCollections?.blogCollections}
          optionsLoading={blogCollectionLoading}
          style={{ marginTop: "1rem" }}
        />
      </CustomAccordion>
    </>
  );
};

export default BlogFilterTagSection;
