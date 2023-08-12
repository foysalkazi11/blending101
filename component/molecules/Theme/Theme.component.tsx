import React, { useEffect, useRef } from "react";
import ejs from "ejs";

import styles from "./Theme.module.scss";

interface ThemeProps extends React.HTMLProps<HTMLDivElement> {
  template: string;
  data: any;
  methods?: any;
}

const Theme = (props: ThemeProps) => {
  const { template, data, methods, ...otherDivProps } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Object.keys(methods).map((method) => {
      const element: any = ref.current.querySelector(`#${method}`);
      if (element) {
        element.onclick = props?.methods[method];
      }
    });
  });

  return (
    <div
      ref={ref}
      className={styles.theme}
      dangerouslySetInnerHTML={{
        __html: ejs.render(template, { data, methods: methods || {} }),
      }}
      {...otherDivProps}
    />
  );
};

export default Theme;
