import React from "react";
import ejs from "ejs";

import styles from "./Theme.module.scss";

interface ThemeProps extends React.HTMLProps<HTMLDivElement> {
  template: string;
  data: any;
  methods?: any;
}

const Theme = (props: ThemeProps) => {
  const { template, data, methods, ...otherDivProps } = props;

  return (
    <div
      className={styles.theme}
      dangerouslySetInnerHTML={{
        __html: ejs.render(template, { data, methods: methods || {} }),
      }}
      {...otherDivProps}
    />
  );
};

export default Theme;
