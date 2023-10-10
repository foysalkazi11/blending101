import { useUser } from "../../context/AuthProvider";
import GET_ALL_GENERAL_BLOG_FOR_CLIENT from "../../gqlLib/blog/query/getAllGeneralBlogForClient";
import client from "../../gqlLib/client";
import { useAppSelector } from "../../redux/hooks";

type Props = (id: string, obj: object) => void;

const useToUpdateBlogField = () => {
  const memberId = useUser().id;
  const handleUpdateBlog: Props = (id = "", obj = {}) => {
    const { getAllGeneralBlogForClient } = client.readQuery({
      query: GET_ALL_GENERAL_BLOG_FOR_CLIENT,
      variables: {
        memberId,
        currentDate: new Date().toISOString().slice(0, 10),
      },
    });

    client.writeQuery({
      query: GET_ALL_GENERAL_BLOG_FOR_CLIENT,
      variables: {
        memberId,
        currentDate: new Date().toISOString().slice(0, 10),
      },
      data: {
        getAllGeneralBlogForClient: {
          ...getAllGeneralBlogForClient,
          blogs: [getAllGeneralBlogForClient?.blogs?.map((blog) => (blog?._id === id ? { ...blog, ...obj } : blog))],
        },
      },
    });
  };

  return handleUpdateBlog;
};

export default useToUpdateBlogField;
