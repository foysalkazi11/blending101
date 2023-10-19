import { gql } from "@apollo/client";

export const GET_WIDGET_TYPE = gql`
  query GetWidgetType($slug: String!) {
    getWidgetTypeBySlug(slug: $slug)
  }
`;

export const GET_WIDGET = gql`
  query GetRecipeWidget($slug: String!) {
    getWidgetsForClient(slug: $slug) {
      _id
      widgetName
      widgetType
      widgetCollections {
        _id
        theme {
          _id
          link
          style
        }
        displayName
        icon
        banner
        slug
        showTabMenu
        filter {
          filterType
          values {
            label
            value
          }
        }
        data {
          collectionType
          Recipe {
            _id
            name
            recipeIngredients
            recipeBlendCategory {
              _id
              name
            }
            image {
              image
              default
            }
            description
            prepTime
            cookTime
            totalTime
            url
            favicon
            averageRating
            numberOfRating

            notes
            addedToCompare
          }
          Wiki {
            _id
            wikiTitle
            wikiDescription
            type
            image
          }
          Plan {
            _id
            planName
            description
          }
          GeneralBlog {
            _id
            title
            type
            slug
            coverImage
            createdBy {
              displayName
            }
            publishDateString
            commentsCount
          }
        }
      }
    }
  }
`;

export const GET_GRID_WIDGET = gql`
  query GetRecipeWidget($slug: String!) {
    getWidgetsForClient(slug: $slug) {
      widgetCollections {
        slug
        displayName
        icon
      }
    }
  }
`;

export const GET_ALL_WIDGET_COLLECTION_DATA = gql`
  query GetGridWidgetData($widgetSlug: String!, $collectionSlug: String!) {
    getWidgetCollectionbySlugForClient(widgetSlug: $widgetSlug, slug: $collectionSlug) {
      displayName
      icon
      themeLink
      bannerLink
      data {
        collectionType
        Recipe {
          name
          recipeIngredients
          recipeBlendCategory {
            _id
            name
          }
          image {
            image
            default
          }
          description
          prepTime
          cookTime
          totalTime
          _id
          url
          favicon
          averageRating
          numberOfRating

          notes
          addedToCompare
        }
      }
    }
  }
`;

export const GET_WIDGET_COLLECTIONS = gql`
  query GetWidgetCollections($widgetSlug: String!) {
    getWidgetCollections(widgetSlug: $widgetSlug) {
      _id
      widgetName
      widgetType
      bannerId {
        link
      }
      widgetCollections {
        _id
        displayName
        icon
        slug
        collectionData {
          _id
          name
          children
          collectionType
        }
      }
    }
  }
`;

export const GET_RECIPE_WIDGET_COLLECTIONS = gql`
  query GetRecipeCollection($widgetSlug: String!, $collectionSlug: String!) {
    getRecipeCollection(widgetSlug: $widgetSlug, collectionSlug: $collectionSlug) {
      _id
      displayName
      icon
      data {
        collectionType
        Recipes {
          _id
          name
          image {
            image
          }
        }
      }
      filter {
        filterType
        values {
          label
          value
        }
      }
      themeLink
      bannerLink
    }
  }
`;

export const GET_RECIPE_WIDGET = gql`
  query GetRecipeWidget($widgetSlug: String!) {
    getRecipeWidget(widgetSlug: $widgetSlug) {
      _id
      slug
      widgetName
      widgetType
      bannerId {
        _id
        bannerName
        description
      }
      widgetCollections {
        _id
        displayName
        icon
        data {
          collectionType
          Recipes {
            _id
            name
            image {
              image
            }
            recipeBlendCategory {
              name
            }
          }
        }
        showTabMenu
        filter {
          filterType
          values {
            label
            value
          }
        }
        slug
        themeLink
        bannerLink
      }
    }
  }
`;

export const GET_PLAN_WIDGET = gql`
  query GetPlanWidget($widgetSlug: String!) {
    getPlanWidget(widgetSlug: $widgetSlug) {
      _id
      slug
      widgetName
      widgetType
      bannerId {
        link
      }
      widgetCollections {
        _id
        displayName
        icon
        data {
          collectionType
          Plans {
            _id
            planName
            description
            startDateString
            endDateString
            planCollections
            commentsCount
            image {
              url
              hash
            }
          }
        }
        showTabMenu
        filter {
          filterType
          values {
            label
            value
          }
        }
        slug
        themeLink
        bannerLink
      }
    }
  }
`;
