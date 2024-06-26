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
  '\n  mutation CreateInvitation($userId: String!, $title: String!, $event_date: String!, $place: String!) {\n    createInvitation(input: { userId: $userId, title: $title, event_date: $event_date, place: $place }) {\n      id\n      title\n      event_date\n      place\n      user {\n        id\n      }\n      created_at\n    }\n  }\n':
    types.CreateInvitationDocument,
  '\n  query GetInvitation {\n    getInvitation {\n      id\n      title\n      event_date\n      place\n      created_at\n      user {\n        name\n      }\n    }\n  }\n':
    types.GetInvitationDocument,
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
  source: '\n  mutation CreateInvitation($userId: String!, $title: String!, $event_date: String!, $place: String!) {\n    createInvitation(input: { userId: $userId, title: $title, event_date: $event_date, place: $place }) {\n      id\n      title\n      event_date\n      place\n      user {\n        id\n      }\n      created_at\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateInvitation($userId: String!, $title: String!, $event_date: String!, $place: String!) {\n    createInvitation(input: { userId: $userId, title: $title, event_date: $event_date, place: $place }) {\n      id\n      title\n      event_date\n      place\n      user {\n        id\n      }\n      created_at\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetInvitation {\n    getInvitation {\n      id\n      title\n      event_date\n      place\n      created_at\n      user {\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetInvitation {\n    getInvitation {\n      id\n      title\n      event_date\n      place\n      created_at\n      user {\n        name\n      }\n    }\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
