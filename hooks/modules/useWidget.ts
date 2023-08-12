import { useQuery } from "@apollo/client";
import {
  GET_PLAN_WIDGET,
  GET_RECIPE_WIDGET,
  GET_RECIPE_WIDGET_COLLECTIONS,
  GET_WIDGET_COLLECTIONS,
  GET_WIDGET,
} from "../../graphql/Widget";

export const useWidget = (widgetSlug: string) => {
  const { data } = useQuery(GET_WIDGET, {
    variables: {
      slug: widgetSlug,
    },
    skip: !widgetSlug,
  });
  return data?.getWidgetsForClient;
};

export const useWidgetCollections = (widgetSlug: string) => {
  const { data } = useQuery(GET_WIDGET_COLLECTIONS, {
    variables: {
      widgetSlug,
    },
    skip: !widgetSlug,
  });
  return data?.getWidgetCollections;
};

export const useRecipeCollections = (
  widgetSlug: string,
  collectionSlug: string,
) => {
  const { data } = useQuery(GET_RECIPE_WIDGET_COLLECTIONS, {
    variables: {
      widgetSlug,
      collectionSlug,
    },
    skip: !widgetSlug || !collectionSlug,
  });
  return data?.getRecipeCollection;
};

export const useRecipeWidget = (widgetSlug: string) => {
  const { data } = useQuery(GET_RECIPE_WIDGET, {
    variables: {
      widgetSlug,
    },
    skip: !widgetSlug,
  });
  return data?.getRecipeWidget;
};

export const usePlanWidget = (widgetSlug: string) => {
  const { data } = useQuery(GET_PLAN_WIDGET, {
    variables: {
      widgetSlug,
    },
    skip: !widgetSlug,
  });
  return data?.getPlanWidget;
};
