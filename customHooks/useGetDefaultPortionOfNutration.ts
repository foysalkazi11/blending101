import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import notification from "../components/utility/reactToastifyNotification";
import GET_DEFAULT_PORTION from "../gqlLib/wiki/query/getDefaultPortion";
import { useAppDispatch } from "../redux/hooks";
import { setLoading } from "../redux/slices/utilitySlice";

const useGetDefaultPortionOfnutration = async () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [getDefaultPortion, { loading, error }] = useLazyQuery(
    GET_DEFAULT_PORTION,
    {
      fetchPolicy: "network-only",
    }
  );

  const handleIngredientWiki = async (id: string) => {
    dispatch(setLoading(true));
    try {
      const { data } = await getDefaultPortion({
        variables: { ingredientId: id },
      });
      if (!loading && !error) {
        dispatch(setLoading(false));
        const meausermentWeight = data?.getDefaultPortion;
        router?.push(`/wiki/Ingredient/${id}/${meausermentWeight}`);
      }
    } catch (error) {
      dispatch(setLoading(false));
      notification("error", error?.message);
    }
  };

  return handleIngredientWiki;
};

export default useGetDefaultPortionOfnutration;
