import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query getCurrentUser {
    me {
      _id
      email
    }
  }
`;
