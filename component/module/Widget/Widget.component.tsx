import router from "next/router";
import React, { Fragment, useEffect, useRef, useState } from "react";
import GridWidget from "./GridWidget.component";
import SliderWidget from "./SliderWidget.component";

interface WidgetCollectionProps {
  widget: any;
  type: "GRID" | "SLIDER";
}

const Widget = (props: WidgetCollectionProps) => {
  const { widget, type } = props;

  return (
    <Fragment>
      {type === "GRID" && <GridWidget data={widget?.widgetCollections} />}
      {type === "SLIDER" &&
        widget?.widgetCollections.map((collection: any) => (
          <WidgetCollection key={collection?._id} collection={collection} />
        ))}
    </Fragment>
  );
};

const WidgetCollection = ({ collection }) => {
  const {
    _id,
    data,
    filter,
    icon,
    banner,
    themeLink,
    displayName,
    showTabMenu,
  } = collection;

  const [tab, setTab] = useState("All");
  const { filterType, values } = filter;
  const results = data[data?.collectionType] || [];
  const items =
    tab === "All"
      ? results
      : results.filter((recipe) => {
          const filterProps = recipe[filterType];
          if (Array.isArray(filterProps)) {
            return filterProps.includes(tab);
          } else {
            return filterProps === tab;
          }
        });

  return (
    <SliderWidget
      id={_id}
      title={displayName}
      items={items}
      theme={themeLink}
      filters={[...values].sort()}
      tabState={[tab, setTab]}
      icon={icon}
      showTabMenu={showTabMenu}
    />
  );
};

export default Widget;
