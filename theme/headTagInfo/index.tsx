import Head from "next/head";
import React from "react";
import { useAppSelector } from "../../redux/hooks";

const HeadTagInfo = () => {
  const { description, title } = useAppSelector(
    (state) => state.head.headTagInfo,
  );

  return (
    <Head>
      <title>Blending101-{title}</title>
      <meta name="description" content={"Blending101-" + description}></meta>
    </Head>
  );
};

export default HeadTagInfo;
