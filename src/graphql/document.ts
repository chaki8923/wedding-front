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
  mutation CreateInvitation(
    $userId: String!
    $title: String!
    $event_date: String!
    $place: String!
    $comment: String!
    $file_url: Upload!
  ) {
    createInvitation(
      input: {
        userId: $userId
        title: $title
        event_date: $event_date
        place: $place
        comment: $comment
        file_url: $file_url
      }
    ) {
      id
      title
      event_date
      place
      comment
      file_url
      user {
        id
      }
      created_at
    }
  }
`;

export const UPDATE_INVITATION = gql`
  mutation UpdateInvitation(
    $id: String!
    $title: String
    $event_date: String
    $place: String
    $comment: String
  ) {
    updateInvitation(
      input: { id: $id, title: $title, event_date: $event_date, place: $place, comment: $comment }
    ) {
      id
      title
      event_date
      place
      comment
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
      comment
      file_url
      created_at
      user {
        name
      }
    }
  }
`;

export const SHOW_INVITATION = gql`
  query ShowInvitation($id: String!) {
    showInvitation(id: $id) {
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


export const CREATE_INVITEE = gql`
  mutation CreateInvitee(
    $family_kj: String!
    $first_kj: String!
    $family_kn: String!
    $first_kn: String!
    $zip_code: String!
    $address_text: String!
    $email: String!
    $allergy: String!
    $userId: String!
    $file_url: Upload!
  ) {
    createInvitee(
      input: {
        family_kj: $family_kj
        first_kj: $first_kj
        family_kn: $family_kn
        first_kn: $first_kn
        zip_code: $zip_code
        address_text: $address_text
        email: $email
        allergy: $allergy
        userId: $userId
        file_url: $file_url
      }
    ) {
      family_kj
      first_kj
      family_kn
      first_kn
      zip_code
      address_text
      email
      allergy
      user {
        id
      }
      file_url
      created_at
    }
  }
`;


export const GET_INVITEE = gql`
  query GetInvitee {
    getInvitee {
      id
      family_kj
      first_kj
      family_kn
      first_kn
      zip_code
      address_text
      email
      allergy
      file_url
      join_flag
      user {
        name
      }
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation UploadFile(
    $comment: String!
    $file_url: Upload!
  ) {
    uploadFile(
      input: {
        comment: $comment
        file_url: $file_url
      }
    ) {
      comment
      file_url
      created_at
    }
  }
`;

export const GET_IMAGES = gql`
  query GetImages {
    getImages {
      id
      comment
      file_url
      created_at
    }
  }
`;


export const DELETE_INVITEE = gql`
  mutation DeleteInvitee($id: String!) {
    deleteInvitee(id: $id) {
      id
      family_kj
      first_kj
      family_kn
      first_kn
      zip_code
      address_text
      email
      allergy
      file_url
      user {
        name
      }
    }
  }
`;

export const DELETE_INVITATION = gql`
  mutation DeleteInvitation($id: String!) {
    deleteInvitation(id: $id) {
      id
      title
      event_date
      place
      file_url
      created_at
      user {
        name
      }
    }
  }
`;


export const UPDATE_INVITEE = gql`
  mutation UpdateInvitee(
    $id: String!
    $family_kj: String
    $first_kj: String
    $family_kn: String
    $first_kn: String
    $zip_code: String
    $address_text: String
    $email: String
    $allergy: String
    $file_url: Upload
    $join_flag: Boolean
  ) {
    updateInvitee(
      input: { 
        id: $id, 
        family_kj: $family_kj
        first_kj: $first_kj
        family_kn: $family_kn
        first_kn: $first_kn
        zip_code: $zip_code
        address_text: $address_text
        email: $email
        allergy: $allergy
        file_url: $file_url
        join_flag: $join_flag
       }
    ) {
      id
      family_kj
      first_kj
      family_kn
      first_kn
      zip_code
      address_text
      email
      allergy
      user {
        id
      }
      file_url
      join_flag
      created_at
    }
  }
`;