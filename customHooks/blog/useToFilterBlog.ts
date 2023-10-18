import { useLazyQuery } from "@apollo/client";
import notification from "components/utility/reactToastifyNotification";
import { useUser } from "context/AuthProvider";
import FILTER_BLOG from "gqlLib/blog/query/filterBlog";

type BlogFilterDataInputType = {
  author?: string[];
  searchTerm?: string;
  publishers?: [
    {
      publisher: string;
      categories: string[];
    },
  ];
  collections?: string[];
};

const useToFilterBlog = () => {
  const user = useUser();
  const [filterBlog, rest] = useLazyQuery(FILTER_BLOG);
  // handler To filter Blog
  const handlerToFilterBlog = async (
    blogFilterInput: BlogFilterDataInputType,
    page: number = 1,
    limit: number = 12,
  ) => {
    try {
      const { data } = await filterBlog({
        variables: {
          data: blogFilterInput,
          currentDate: new Date().toISOString().slice(0, 10),
          memberId: user.id,
          limit,
          page,
        },
      });

      return data;
    } catch (error) {
      notification("error", error?.message || "Failed to filter blog");
    }
  };

  return { handlerToFilterBlog, ...rest };
};

export default useToFilterBlog;
