import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
  query GetMessages {
    getMessages {
      id
      text
      created_at
      user {
        name
      }
    }
  }
`;

export const POST_MESSAGE = gql`
  mutation Create_Message($userId: String!, $text: String!) {
    createMessage(userId: $userId, text: $text) {
      id
      text
      user {
        id
      }
      created_at
    }
  }
`;

export const create = gql(/* GraphQL */ `
  mutation createMessage($userId: String!, $text: String!) {
    createMessage(input: { userId: $userId, text: $text }) {
      id
      text
      user {
        id
      }
      created_at
    }
  }
`);