import { useQuery } from "@apollo/client";
import Link from "next/link";
import React from "react";
import { GET_GRID_WIDGET } from "../../../graphql/Widget";
import styles from "./GridWidget.module.scss";

interface GridWidgetProps {
  name: string;
}
const GridWidget: React.FC<GridWidgetProps> = (props) => {
  const { name } = props;
  const { data } = useQuery(GET_GRID_WIDGET, {
    variables: {
      id: name,
    },
    skip: name === "",
  });

  const widget = data?.getWidgetsForClient;
  return (
    <div className={styles.theme}>
      {widget &&
        widget?.widgetCollections?.map((item) => (
          <Link key={item.slug} href={`/${item.slug}?id=${widget?._id}`}>
            <a>
              <div className={styles.theme__child}>
                <div className={styles.theme__cover}>
                  <div
                    className={styles.theme__cover__abs}
                    style={{ backgroundImage: `url(${item.icon})` }}
                  />
                </div>
                <p>{item.displayName}</p>
              </div>
            </a>
          </Link>
        ))}
    </div>
  );
};

GridWidget.defaultProps = {
  name: "",
};

export default GridWidget;
