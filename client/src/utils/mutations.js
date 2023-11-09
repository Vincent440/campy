import { gql } from '@apollo/client';

// http://localhost:3001/graphql?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4RxighigSwiQAIAbCAcwKQAoASBOXAs9EgZRQCcbKBCADQl6AB1wBnCQHcI3MOy68kAgJQlgAHVLkqNWkxZsRh1sPFTZ89mMky5YdVp0kSKCAGtk2165gSEbg0fX1cAfQIwEND-QKRcRGiSAF8Q1KR0kEEQADdcXlwAIzIECQwQLW4QzRBTMhr2GpyaKFKACxhuAE8AAUpmVgA6KAg4GsFNKp0ai3t5BpIZuysokEntZKyQCSheUTRMEGSgA

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// http://localhost:3001/graphql?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4RxighigSwiQAJcwwBVAZwQCcAKAEhlrqV0XRIGUU6CSAOYBCADQkmCOLgIAbbnwHDxkgA65q1AO4Q6YRf0GiAlCWAAdOhdJkKNeg1b0OXSc-acEE6bIWTfeQkNLV19biYQnT0wM0trWxISFAgAa2QrGySkj3NMxOyAfQIwfOzsj1cEMuyAXxr6hMabEDEQADdcAVwAIzkEagwQeKySCxBKr3HucfbBKGrWmvHAuWmxjvmBgAsYOgBPAAEhGXkAOigIOHGxZZAosNKMDYeY8fza1pBqKAE1NEwIFqQA

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

