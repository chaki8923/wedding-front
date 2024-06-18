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

export const CREATE_INVITATION = gql`
  mutation CreateInvitation($userId: String!, $title: String!, $event_date: String!, $place: String!) {
    createInvitation(input: { userId: $userId, title: $title, event_date: $event_date, place: $place }) {
      id
      title
      event_date
      place
      user {
        id
      }
      created_at
    }
  }
`;


export const GET_INVITATION = gql`
  query GetInvitation {
    getInvitation {
      id
      title
      event_date
      place
      created_at
      user {
        name
      }
    }
  }
`;