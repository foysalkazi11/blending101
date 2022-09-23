import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ejs from "ejs";

import ContentTray from "../../../components/recipe/recipeDiscovery/ContentTray/ContentTray.component";
import useThemeMethod from "../../../hooks/modules/useThemeMethod";
import styles from "./SliderWidget.module.scss";
// import Theme from "../../../data/Theme";

interface SliderWidgetProps {
  id: string;
  title: string;
  items: any[];
  theme: string;
  filters: any[];
  tabState: any;
  icon: string;
  showTabMenu: boolean;
}
const SliderWidget = (props: SliderWidgetProps) => {
  const { id, title, filters, tabState, items, theme, icon, showTabMenu } =
    props;

  const [html, setHtml] = useState("");
  useEffect(() => {
    if (!theme) return;
    fetch(theme)
      .then((r) => r.text())
      .then((t) => {
        setHtml(t);
      });
  }, [theme]);

  return (
    <ContentTray
      key={id}
      heading={title}
      hasFilter={showTabMenu}
      filters={filters}
      tabState={tabState}
      image={icon}
      customHTML={items.length === 0}
    >
      {items?.map((item) => (
        <Slide key={item?._id} item={item} html={html} />
      ))}
    </ContentTray>
  );
};

const Slide = ({ item, html }) => {
  const router = useRouter();
  const ref = useThemeMethod();

  return (
    <div
      ref={ref}
      className={styles.slider__card}
      onClick={() => router.push(`/recipe_details/${item?._id}`)}
      dangerouslySetInnerHTML={{
        __html: ejs.render(html, { data: item, methods: {} }),
      }}
    />
  );
};

export default SliderWidget;
