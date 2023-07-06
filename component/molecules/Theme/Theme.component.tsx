import React from "react";
import ejs from "ejs";

interface ThemeProps extends React.HTMLProps<HTMLDivElement> {
  template: string;
  data: any;
  methods?: any;
}

const Theme = (props: ThemeProps) => {
  const { template, data, methods, ...otherDivProps } = props;

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: ejs.render(template, { data, methods: methods || {} }),
      }}
      {...otherDivProps}
    />
  );
};

export default Theme;
