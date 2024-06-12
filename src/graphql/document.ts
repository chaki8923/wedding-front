import { gql } from '@apollo/client';



export const USER_LOGIN = gql`
  mutation UserLogin($email: String!, $password: String!, $token: String!) {
    userLogin(input: { email: $email, password: $password, token: $token }) {
      email
      password
      token
    }
  }
`;

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