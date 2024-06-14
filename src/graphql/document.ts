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
  mutation CreateMessage($userId: String!, $text: String!) {
    createMessage(input: { userId: $userId, text: $text }) {
      id
      text
      user {
        id
      }
      created_at
    }
  }
`;