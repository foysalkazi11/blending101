import React from "react";
import BlogList from "../../components/pages/blog";
import ClientOnly from "components/ClientOnly";

const BlogListPage = () => {
  return (
    <ClientOnly>
      <BlogList />
    </ClientOnly>
  );
};
BlogListPage.meta = {
  icon: "/icons/book_light.svg",
  title: "Blog Discovery",
};

export default BlogListPage;
