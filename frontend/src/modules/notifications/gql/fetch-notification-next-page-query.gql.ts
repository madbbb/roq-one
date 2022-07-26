import { gql } from '@apollo/client';

export const fetchNotificationNextPageQuery = gql`
  query notificationsInAppForCurrentUser($limit: Int, $order: NotificationInAppOrderArgType!, $filter: NotificationInAppFilterArgType) {
    notificationsInAppForCurrentUser(limit: $limit, order: $order, filter: $filter) {
      totalCount
      data {
        id
        title
        content
        locale
        createdAt
        read
        icon
      }
    }
  }
`;
