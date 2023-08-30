import React from "react";
import WikiHome from "../../../components/wiki";
import Layout from "../../../layouts";
import { useRouter } from "next/router";

const WikiPage = () => {
  return <WikiHome />;
};

export default WikiPage;

WikiPage.useLayout = (page) => {
  const router = useRouter();
  const { params = [] } = router.query;
  const wikiType: string = params?.[0] || "";

  let obj = { title: "", description: "" };
  if (wikiType) {
    obj = {
      title: `Wiki Details`,
      description: `Wiki Details`,
    };
  } else {
    obj = {
      title: `Wiki Discovery`,
      description: `Wiki Discovery`,
    };
  }
  return (
    <Layout title={obj.title} icon="/icons/books.svg">
      {page}
    </Layout>
  );
};
