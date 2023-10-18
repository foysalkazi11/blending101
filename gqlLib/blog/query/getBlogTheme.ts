import { gql } from "@apollo/client";

const GET_BLOG_THEME = gql`
  query BlogTheme($widgetSlug: String!, $userId: String, $currentDate: String) {
    getEntityWidget(widgetSlug: $widgetSlug, userId: $userId, currentDate: $currentDate) {
      _id
      slug
      widgetName
      widgetType
      widgetCollections {
        _id
        displayName
        icon
        slug
        theme {
          _id
          link
        }
        data {
          GeneralBlog {
            _id
            coverImage
            mediaLength
            mediaUrl
            publishDate
            slug
            title
            publishDateString
            type
            commentsCount
            blogCollections
            createdBy {
              _id
              displayName
              firstName
              image
              lastName
            }
          }
        }
      }
    }
  }
`;

export default GET_BLOG_THEME;
