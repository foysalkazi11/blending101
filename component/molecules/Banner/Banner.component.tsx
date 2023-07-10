import React, { Fragment, useEffect, useState } from "react";

interface BannerProps extends React.HTMLProps<HTMLDivElement> {
  link: string;
}

const Banner = (props: BannerProps) => {
  const { link, ...otherDivProps } = props;
  const [banner, setBanner] = useState("");
  useEffect(() => {
    if (!link) return;
    fetch(link)
      .then((r) => r.text())
      .then((t) => {
        setBanner(t);
      });
  }, [link]);

  return link ? (
    <div dangerouslySetInnerHTML={{ __html: banner }} {...otherDivProps} />
  ) : (
    <Fragment />
  );
};

export default Banner;
