import { gql } from "@apollo/client";

const GET_WIKI_THEME = gql`
  query GetEntityWidget($widgetSlug: String!, $currentDate: String, $userId: String) {
    getEntityWidget(widgetSlug: $widgetSlug, currentDate: $currentDate, userId: $userId) {
      _id
      slug
      widgetName
      widgetType
      widgetCollections {
        _id
        displayName
        data {
          Wiki {
            _id
            category
            collections
            commentsCount
            description
            hasInCompare
            image
            isPublished
            portions {
              measurement
              meausermentWeight
              default
            }
            status
            type
            wikiDescription
            wikiTitle
          }
        }
        slug
        icon
        theme {
          _id
          link
        }
      }
    }
  }
`;

export default GET_WIKI_THEME;
