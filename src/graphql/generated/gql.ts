/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  query GetMessages {\n    getMessages {\n      id\n      text\n      created_at\n      user {\n        name\n      }\n    }\n  }\n':
    types.GetMessagesDocument,
  '\n  mutation CreateMessage($userId: String!, $text: String!) {\n    createMessage(input: { userId: $userId, text: $text }) {\n      id\n      text\n      user {\n        id\n      }\n      created_at\n    }\n  }\n':
    types.CreateMessageDocument,
  '\n  mutation CreateInvitation(\n    $userId: String!\n    $title: String!\n    $event_date: String!\n    $place: String!\n    $comment: String!\n    $file_url: Upload!\n  ) {\n    createInvitation(\n      input: {\n        userId: $userId\n        title: $title\n        event_date: $event_date\n        place: $place\n        comment: $comment\n        file_url: $file_url\n      }\n    ) {\n      id\n      title\n      event_date\n      place\n      comment\n      file_url\n      user {\n        id\n      }\n      created_at\n    }\n  }\n':
    types.CreateInvitationDocument,
  '\n  mutation UpdateInvitation(\n    $id: String!\n    $title: String\n    $event_date: String\n    $place: String\n    $comment: String\n  ) {\n    updateInvitation(\n      input: { id: $id, title: $title, event_date: $event_date, place: $place, comment: $comment }\n    ) {\n      id\n      title\n      event_date\n      place\n      comment\n    }\n  }\n':
    types.UpdateInvitationDocument,
  '\n  query GetInvitation {\n    getInvitation {\n      id\n      title\n      event_date\n      place\n      comment\n      file_url\n      created_at\n      uuid\n      user {\n        name\n      }\n    }\n  }\n':
    types.GetInvitationDocument,
  '\n  query ShowInvitation($uuid: String!) {\n    showInvitation(uuid: $uuid) {\n      id\n      title\n      event_date\n      place\n      created_at\n      uuid\n      user {\n        name\n      }\n    }\n  }\n':
    types.ShowInvitationDocument,
  '\n  mutation CreateInvitee(\n    $family_kj: String!\n    $first_kj: String!\n    $family_kn: String!\n    $first_kn: String!\n    $zip_code: String!\n    $address_text: String!\n    $email: String!\n    $allergy: String!\n    $userId: String!\n    $file_url: Upload!\n  ) {\n    createInvitee(\n      input: {\n        family_kj: $family_kj\n        first_kj: $first_kj\n        family_kn: $family_kn\n        first_kn: $first_kn\n        zip_code: $zip_code\n        address_text: $address_text\n        email: $email\n        allergy: $allergy\n        userId: $userId\n        file_url: $file_url\n      }\n    ) {\n      family_kj\n      first_kj\n      family_kn\n      first_kn\n      zip_code\n      address_text\n      email\n      allergy\n      user {\n        id\n      }\n      file_url\n      created_at\n    }\n  }\n':
    types.CreateInviteeDocument,
  '\n  query GetInvitee {\n    getInvitee {\n      id\n      family_kj\n      first_kj\n      family_kn\n      first_kn\n      zip_code\n      address_text\n      email\n      allergy\n      file_url\n      join_flag\n      user {\n        name\n      }\n    }\n  }\n':
    types.GetInviteeDocument,
  '\n  mutation UploadFile(\n    $comment: String!\n    $file_url: Upload!\n  ) {\n    uploadFile(\n      input: {\n        comment: $comment\n        file_url: $file_url\n      }\n    ) {\n      comment\n      file_url\n      created_at\n    }\n  }\n':
    types.UploadFileDocument,
  '\n  query GetImages {\n    getImages {\n      id\n      comment\n      file_url\n      created_at\n    }\n  }\n':
    types.GetImagesDocument,
  '\n  mutation DeleteInvitee($id: String!) {\n    deleteInvitee(id: $id) {\n      id\n      family_kj\n      first_kj\n      family_kn\n      first_kn\n      zip_code\n      address_text\n      email\n      allergy\n      file_url\n      user {\n        name\n      }\n    }\n  }\n':
    types.DeleteInviteeDocument,
  '\n  mutation DeleteInvitation($id: String!) {\n    deleteInvitation(id: $id) {\n      id\n      title\n      event_date\n      place\n      file_url\n      created_at\n      user {\n        name\n      }\n    }\n  }\n':
    types.DeleteInvitationDocument,
  '\n  mutation UpdateInvitee(\n    $id: String!\n    $family_kj: String\n    $first_kj: String\n    $family_kn: String\n    $first_kn: String\n    $zip_code: String\n    $address_text: String\n    $email: String\n    $allergy: String\n    $file_url: Upload\n    $join_flag: Boolean\n  ) {\n    updateInvitee(\n      input: { \n        id: $id, \n        family_kj: $family_kj\n        first_kj: $first_kj\n        family_kn: $family_kn\n        first_kn: $first_kn\n        zip_code: $zip_code\n        address_text: $address_text\n        email: $email\n        allergy: $allergy\n        file_url: $file_url\n        join_flag: $join_flag\n       }\n    ) {\n      id\n      family_kj\n      first_kj\n      family_kn\n      first_kn\n      zip_code\n      address_text\n      email\n      allergy\n      user {\n        id\n      }\n      file_url\n      join_flag\n      created_at\n    }\n  }\n':
    types.UpdateInviteeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetMessages {\n    getMessages {\n      id\n      text\n      created_at\n      user {\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetMessages {\n    getMessages {\n      id\n      text\n      created_at\n      user {\n        name\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateMessage($userId: String!, $text: String!) {\n    createMessage(input: { userId: $userId, text: $text }) {\n      id\n      text\n      user {\n        id\n      }\n      created_at\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateMessage($userId: String!, $text: String!) {\n    createMessage(input: { userId: $userId, text: $text }) {\n      id\n      text\n      user {\n        id\n      }\n      created_at\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateInvitation(\n    $userId: String!\n    $title: String!\n    $event_date: String!\n    $place: String!\n    $comment: String!\n    $file_url: Upload!\n  ) {\n    createInvitation(\n      input: {\n        userId: $userId\n        title: $title\n        event_date: $event_date\n        place: $place\n        comment: $comment\n        file_url: $file_url\n      }\n    ) {\n      id\n      title\n      event_date\n      place\n      comment\n      file_url\n      user {\n        id\n      }\n      created_at\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateInvitation(\n    $userId: String!\n    $title: String!\n    $event_date: String!\n    $place: String!\n    $comment: String!\n    $file_url: Upload!\n  ) {\n    createInvitation(\n      input: {\n        userId: $userId\n        title: $title\n        event_date: $event_date\n        place: $place\n        comment: $comment\n        file_url: $file_url\n      }\n    ) {\n      id\n      title\n      event_date\n      place\n      comment\n      file_url\n      user {\n        id\n      }\n      created_at\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateInvitation(\n    $id: String!\n    $title: String\n    $event_date: String\n    $place: String\n    $comment: String\n  ) {\n    updateInvitation(\n      input: { id: $id, title: $title, event_date: $event_date, place: $place, comment: $comment }\n    ) {\n      id\n      title\n      event_date\n      place\n      comment\n    }\n  }\n',
): (typeof documents)['\n  mutation UpdateInvitation(\n    $id: String!\n    $title: String\n    $event_date: String\n    $place: String\n    $comment: String\n  ) {\n    updateInvitation(\n      input: { id: $id, title: $title, event_date: $event_date, place: $place, comment: $comment }\n    ) {\n      id\n      title\n      event_date\n      place\n      comment\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetInvitation {\n    getInvitation {\n      id\n      title\n      event_date\n      place\n      comment\n      file_url\n      created_at\n      uuid\n      user {\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetInvitation {\n    getInvitation {\n      id\n      title\n      event_date\n      place\n      comment\n      file_url\n      created_at\n      uuid\n      user {\n        name\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query ShowInvitation($uuid: String!) {\n    showInvitation(uuid: $uuid) {\n      id\n      title\n      event_date\n      place\n      created_at\n      uuid\n      user {\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  query ShowInvitation($uuid: String!) {\n    showInvitation(uuid: $uuid) {\n      id\n      title\n      event_date\n      place\n      created_at\n      uuid\n      user {\n        name\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateInvitee(\n    $family_kj: String!\n    $first_kj: String!\n    $family_kn: String!\n    $first_kn: String!\n    $zip_code: String!\n    $address_text: String!\n    $email: String!\n    $allergy: String!\n    $userId: String!\n    $file_url: Upload!\n  ) {\n    createInvitee(\n      input: {\n        family_kj: $family_kj\n        first_kj: $first_kj\n        family_kn: $family_kn\n        first_kn: $first_kn\n        zip_code: $zip_code\n        address_text: $address_text\n        email: $email\n        allergy: $allergy\n        userId: $userId\n        file_url: $file_url\n      }\n    ) {\n      family_kj\n      first_kj\n      family_kn\n      first_kn\n      zip_code\n      address_text\n      email\n      allergy\n      user {\n        id\n      }\n      file_url\n      created_at\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateInvitee(\n    $family_kj: String!\n    $first_kj: String!\n    $family_kn: String!\n    $first_kn: String!\n    $zip_code: String!\n    $address_text: String!\n    $email: String!\n    $allergy: String!\n    $userId: String!\n    $file_url: Upload!\n  ) {\n    createInvitee(\n      input: {\n        family_kj: $family_kj\n        first_kj: $first_kj\n        family_kn: $family_kn\n        first_kn: $first_kn\n        zip_code: $zip_code\n        address_text: $address_text\n        email: $email\n        allergy: $allergy\n        userId: $userId\n        file_url: $file_url\n      }\n    ) {\n      family_kj\n      first_kj\n      family_kn\n      first_kn\n      zip_code\n      address_text\n      email\n      allergy\n      user {\n        id\n      }\n      file_url\n      created_at\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetInvitee {\n    getInvitee {\n      id\n      family_kj\n      first_kj\n      family_kn\n      first_kn\n      zip_code\n      address_text\n      email\n      allergy\n      file_url\n      join_flag\n      user {\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetInvitee {\n    getInvitee {\n      id\n      family_kj\n      first_kj\n      family_kn\n      first_kn\n      zip_code\n      address_text\n      email\n      allergy\n      file_url\n      join_flag\n      user {\n        name\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UploadFile(\n    $comment: String!\n    $file_url: Upload!\n  ) {\n    uploadFile(\n      input: {\n        comment: $comment\n        file_url: $file_url\n      }\n    ) {\n      comment\n      file_url\n      created_at\n    }\n  }\n',
): (typeof documents)['\n  mutation UploadFile(\n    $comment: String!\n    $file_url: Upload!\n  ) {\n    uploadFile(\n      input: {\n        comment: $comment\n        file_url: $file_url\n      }\n    ) {\n      comment\n      file_url\n      created_at\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetImages {\n    getImages {\n      id\n      comment\n      file_url\n      created_at\n    }\n  }\n',
): (typeof documents)['\n  query GetImages {\n    getImages {\n      id\n      comment\n      file_url\n      created_at\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteInvitee($id: String!) {\n    deleteInvitee(id: $id) {\n      id\n      family_kj\n      first_kj\n      family_kn\n      first_kn\n      zip_code\n      address_text\n      email\n      allergy\n      file_url\n      user {\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation DeleteInvitee($id: String!) {\n    deleteInvitee(id: $id) {\n      id\n      family_kj\n      first_kj\n      family_kn\n      first_kn\n      zip_code\n      address_text\n      email\n      allergy\n      file_url\n      user {\n        name\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteInvitation($id: String!) {\n    deleteInvitation(id: $id) {\n      id\n      title\n      event_date\n      place\n      file_url\n      created_at\n      user {\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation DeleteInvitation($id: String!) {\n    deleteInvitation(id: $id) {\n      id\n      title\n      event_date\n      place\n      file_url\n      created_at\n      user {\n        name\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateInvitee(\n    $id: String!\n    $family_kj: String\n    $first_kj: String\n    $family_kn: String\n    $first_kn: String\n    $zip_code: String\n    $address_text: String\n    $email: String\n    $allergy: String\n    $file_url: Upload\n    $join_flag: Boolean\n  ) {\n    updateInvitee(\n      input: { \n        id: $id, \n        family_kj: $family_kj\n        first_kj: $first_kj\n        family_kn: $family_kn\n        first_kn: $first_kn\n        zip_code: $zip_code\n        address_text: $address_text\n        email: $email\n        allergy: $allergy\n        file_url: $file_url\n        join_flag: $join_flag\n       }\n    ) {\n      id\n      family_kj\n      first_kj\n      family_kn\n      first_kn\n      zip_code\n      address_text\n      email\n      allergy\n      user {\n        id\n      }\n      file_url\n      join_flag\n      created_at\n    }\n  }\n',
): (typeof documents)['\n  mutation UpdateInvitee(\n    $id: String!\n    $family_kj: String\n    $first_kj: String\n    $family_kn: String\n    $first_kn: String\n    $zip_code: String\n    $address_text: String\n    $email: String\n    $allergy: String\n    $file_url: Upload\n    $join_flag: Boolean\n  ) {\n    updateInvitee(\n      input: { \n        id: $id, \n        family_kj: $family_kj\n        first_kj: $first_kj\n        family_kn: $family_kn\n        first_kn: $first_kn\n        zip_code: $zip_code\n        address_text: $address_text\n        email: $email\n        allergy: $allergy\n        file_url: $file_url\n        join_flag: $join_flag\n       }\n    ) {\n      id\n      family_kj\n      first_kj\n      family_kn\n      first_kn\n      zip_code\n      address_text\n      email\n      allergy\n      user {\n        id\n      }\n      file_url\n      join_flag\n      created_at\n    }\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
