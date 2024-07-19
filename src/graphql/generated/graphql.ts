/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type Invitation = {
  __typename?: 'Invitation';
  comment: Scalars['String'];
  created_at: Scalars['String'];
  event_date: Scalars['String'];
  file_url: Scalars['String'];
  id: Scalars['ID'];
  place: Scalars['String'];
  title: Scalars['String'];
  updated_at: Scalars['String'];
  user: User;
};

export type Invitee = {
  __typename?: 'Invitee';
  address_text: Scalars['String'];
  allergy: Scalars['String'];
  created_at: Scalars['String'];
  email: Scalars['String'];
  family_kj: Scalars['String'];
  family_kn: Scalars['String'];
  file_url: Scalars['String'];
  first_kj: Scalars['String'];
  first_kn: Scalars['String'];
  id: Scalars['ID'];
  join_flag: Scalars['Boolean'];
  updated_at: Scalars['String'];
  user: User;
  zip_code: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  created_at: Scalars['String'];
  id: Scalars['ID'];
  text: Scalars['String'];
  updated_at: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createInvitation: Invitation;
  createInvitee: Invitee;
  createMessage: Message;
  deleteInvitation: Invitation;
  deleteInvitee: Invitee;
  updateInvitation: Invitation;
  updateInvitee: Invitee;
  uploadFile: UploadImage;
};

export type MutationCreateInvitationArgs = {
  input: NewInvitation;
};

export type MutationCreateInviteeArgs = {
  input: NewInvitee;
};

export type MutationCreateMessageArgs = {
  input: NewMessage;
};

export type MutationDeleteInvitationArgs = {
  id: Scalars['String'];
};

export type MutationDeleteInviteeArgs = {
  id: Scalars['String'];
};

export type MutationUpdateInvitationArgs = {
  input: UpdateInvitation;
};

export type MutationUpdateInviteeArgs = {
  input: UpdateInvitee;
};

export type MutationUploadFileArgs = {
  input: NewUpload;
};

export type NewInvitation = {
  comment: Scalars['String'];
  event_date: Scalars['String'];
  file_url: Scalars['Upload'];
  place: Scalars['String'];
  title: Scalars['String'];
  userId: Scalars['String'];
};

export type NewInvitee = {
  address_text: Scalars['String'];
  allergy: Scalars['String'];
  email: Scalars['String'];
  family_kj: Scalars['String'];
  family_kn: Scalars['String'];
  file_url: Scalars['Upload'];
  first_kj: Scalars['String'];
  first_kn: Scalars['String'];
  userId: Scalars['String'];
  zip_code: Scalars['String'];
};

export type NewMessage = {
  text: Scalars['String'];
  userId: Scalars['String'];
};

export type NewUpload = {
  comment: Scalars['String'];
  file_url: Scalars['Upload'];
};

export type NewUser = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getImages: Array<UploadImage>;
  getInvitation: Array<Invitation>;
  getInvitee: Array<Invitee>;
  getMessages: Array<Message>;
  showInvitation: Invitation;
};

export type QueryShowInvitationArgs = {
  id: Scalars['String'];
};

export type UpdateInvitation = {
  comment?: InputMaybe<Scalars['String']>;
  event_date?: InputMaybe<Scalars['String']>;
  file_url?: InputMaybe<Scalars['Upload']>;
  id: Scalars['String'];
  place?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateInvitee = {
  address_text?: InputMaybe<Scalars['String']>;
  allergy?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  family_kj?: InputMaybe<Scalars['String']>;
  family_kn?: InputMaybe<Scalars['String']>;
  file_url?: InputMaybe<Scalars['Upload']>;
  first_kj?: InputMaybe<Scalars['String']>;
  first_kn?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  join_flag?: InputMaybe<Scalars['Boolean']>;
  zip_code?: InputMaybe<Scalars['String']>;
};

export type UploadImage = {
  __typename?: 'UploadImage';
  comment: Scalars['String'];
  created_at: Scalars['String'];
  file_url: Scalars['String'];
  id: Scalars['ID'];
  updated_at: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type GetMessagesQueryVariables = Exact<{ [key: string]: never }>;

export type GetMessagesQuery = {
  __typename?: 'Query';
  getMessages: Array<{
    __typename?: 'Message';
    id: string;
    text: string;
    created_at: string;
    user: { __typename?: 'User'; name: string };
  }>;
};

export type CreateMessageMutationVariables = Exact<{
  userId: Scalars['String'];
  text: Scalars['String'];
}>;

export type CreateMessageMutation = {
  __typename?: 'Mutation';
  createMessage: {
    __typename?: 'Message';
    id: string;
    text: string;
    created_at: string;
    user: { __typename?: 'User'; id: string };
  };
};

export type CreateInvitationMutationVariables = Exact<{
  userId: Scalars['String'];
  title: Scalars['String'];
  event_date: Scalars['String'];
  place: Scalars['String'];
  comment: Scalars['String'];
  file_url: Scalars['Upload'];
}>;

export type CreateInvitationMutation = {
  __typename?: 'Mutation';
  createInvitation: {
    __typename?: 'Invitation';
    id: string;
    title: string;
    event_date: string;
    place: string;
    comment: string;
    file_url: string;
    created_at: string;
    user: { __typename?: 'User'; id: string };
  };
};

export type UpdateInvitationMutationVariables = Exact<{
  id: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
  event_date?: InputMaybe<Scalars['String']>;
  place?: InputMaybe<Scalars['String']>;
  comment?: InputMaybe<Scalars['String']>;
}>;

export type UpdateInvitationMutation = {
  __typename?: 'Mutation';
  updateInvitation: {
    __typename?: 'Invitation';
    id: string;
    title: string;
    event_date: string;
    place: string;
    comment: string;
  };
};

export type GetInvitationQueryVariables = Exact<{ [key: string]: never }>;

export type GetInvitationQuery = {
  __typename?: 'Query';
  getInvitation: Array<{
    __typename?: 'Invitation';
    id: string;
    title: string;
    event_date: string;
    place: string;
    comment: string;
    file_url: string;
    created_at: string;
    user: { __typename?: 'User'; name: string };
  }>;
};

export type ShowInvitationQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type ShowInvitationQuery = {
  __typename?: 'Query';
  showInvitation: {
    __typename?: 'Invitation';
    id: string;
    title: string;
    event_date: string;
    place: string;
    created_at: string;
    user: { __typename?: 'User'; name: string };
  };
};

export type CreateInviteeMutationVariables = Exact<{
  family_kj: Scalars['String'];
  first_kj: Scalars['String'];
  family_kn: Scalars['String'];
  first_kn: Scalars['String'];
  zip_code: Scalars['String'];
  address_text: Scalars['String'];
  email: Scalars['String'];
  allergy: Scalars['String'];
  userId: Scalars['String'];
  file_url: Scalars['Upload'];
}>;

export type CreateInviteeMutation = {
  __typename?: 'Mutation';
  createInvitee: {
    __typename?: 'Invitee';
    family_kj: string;
    first_kj: string;
    family_kn: string;
    first_kn: string;
    zip_code: string;
    address_text: string;
    email: string;
    allergy: string;
    file_url: string;
    created_at: string;
    user: { __typename?: 'User'; id: string };
  };
};

export type GetInviteeQueryVariables = Exact<{ [key: string]: never }>;

export type GetInviteeQuery = {
  __typename?: 'Query';
  getInvitee: Array<{
    __typename?: 'Invitee';
    id: string;
    family_kj: string;
    first_kj: string;
    family_kn: string;
    first_kn: string;
    zip_code: string;
    address_text: string;
    email: string;
    allergy: string;
    file_url: string;
    join_flag: boolean;
    user: { __typename?: 'User'; name: string };
  }>;
};

export type UploadFileMutationVariables = Exact<{
  comment: Scalars['String'];
  file_url: Scalars['Upload'];
}>;

export type UploadFileMutation = {
  __typename?: 'Mutation';
  uploadFile: { __typename?: 'UploadImage'; comment: string; file_url: string; created_at: string };
};

export type GetImagesQueryVariables = Exact<{ [key: string]: never }>;

export type GetImagesQuery = {
  __typename?: 'Query';
  getImages: Array<{
    __typename?: 'UploadImage';
    id: string;
    comment: string;
    file_url: string;
    created_at: string;
  }>;
};

export type DeleteInviteeMutationVariables = Exact<{
  id: Scalars['String'];
}>;

export type DeleteInviteeMutation = {
  __typename?: 'Mutation';
  deleteInvitee: {
    __typename?: 'Invitee';
    id: string;
    family_kj: string;
    first_kj: string;
    family_kn: string;
    first_kn: string;
    zip_code: string;
    address_text: string;
    email: string;
    allergy: string;
    file_url: string;
    user: { __typename?: 'User'; name: string };
  };
};

export type DeleteInvitationMutationVariables = Exact<{
  id: Scalars['String'];
}>;

export type DeleteInvitationMutation = {
  __typename?: 'Mutation';
  deleteInvitation: {
    __typename?: 'Invitation';
    id: string;
    title: string;
    event_date: string;
    place: string;
    file_url: string;
    created_at: string;
    user: { __typename?: 'User'; name: string };
  };
};

export type UpdateInviteeMutationVariables = Exact<{
  id: Scalars['String'];
  family_kj?: InputMaybe<Scalars['String']>;
  first_kj?: InputMaybe<Scalars['String']>;
  family_kn?: InputMaybe<Scalars['String']>;
  first_kn?: InputMaybe<Scalars['String']>;
  zip_code?: InputMaybe<Scalars['String']>;
  address_text?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  allergy?: InputMaybe<Scalars['String']>;
  file_url?: InputMaybe<Scalars['Upload']>;
  join_flag?: InputMaybe<Scalars['Boolean']>;
}>;

export type UpdateInviteeMutation = {
  __typename?: 'Mutation';
  updateInvitee: {
    __typename?: 'Invitee';
    id: string;
    family_kj: string;
    first_kj: string;
    family_kn: string;
    first_kn: string;
    zip_code: string;
    address_text: string;
    email: string;
    allergy: string;
    file_url: string;
    join_flag: boolean;
    created_at: string;
    user: { __typename?: 'User'; id: string };
  };
};

export const GetMessagesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMessages' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getMessages' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMessagesQuery, GetMessagesQueryVariables>;
export const CreateMessageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateMessage' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'text' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createMessage' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'userId' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'text' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'text' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateMessageMutation, CreateMessageMutationVariables>;
export const CreateInvitationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateInvitation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'event_date' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'place' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'comment' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'file_url' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Upload' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createInvitation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'userId' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'title' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'event_date' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'event_date' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'place' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'place' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'comment' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'comment' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'file_url' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'file_url' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'event_date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'place' } },
                { kind: 'Field', name: { kind: 'Name', value: 'comment' } },
                { kind: 'Field', name: { kind: 'Name', value: 'file_url' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateInvitationMutation, CreateInvitationMutationVariables>;
export const UpdateInvitationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateInvitation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'event_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'place' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'comment' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateInvitation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'title' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'event_date' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'event_date' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'place' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'place' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'comment' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'comment' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'event_date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'place' } },
                { kind: 'Field', name: { kind: 'Name', value: 'comment' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateInvitationMutation, UpdateInvitationMutationVariables>;
export const GetInvitationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetInvitation' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getInvitation' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'event_date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'place' } },
                { kind: 'Field', name: { kind: 'Name', value: 'comment' } },
                { kind: 'Field', name: { kind: 'Name', value: 'file_url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetInvitationQuery, GetInvitationQueryVariables>;
export const ShowInvitationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ShowInvitation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'showInvitation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'event_date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'place' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ShowInvitationQuery, ShowInvitationQueryVariables>;
export const CreateInviteeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateInvitee' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'family_kj' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'first_kj' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'family_kn' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'first_kn' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'zip_code' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'address_text' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'allergy' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'file_url' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Upload' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createInvitee' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'family_kj' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'family_kj' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'first_kj' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'first_kj' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'family_kn' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'family_kn' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'first_kn' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'first_kn' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'zip_code' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'zip_code' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'address_text' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'address_text' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'email' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'allergy' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'allergy' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'userId' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'file_url' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'file_url' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'family_kj' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_kj' } },
                { kind: 'Field', name: { kind: 'Name', value: 'family_kn' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_kn' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zip_code' } },
                { kind: 'Field', name: { kind: 'Name', value: 'address_text' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'allergy' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'file_url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateInviteeMutation, CreateInviteeMutationVariables>;
export const GetInviteeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetInvitee' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getInvitee' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'family_kj' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_kj' } },
                { kind: 'Field', name: { kind: 'Name', value: 'family_kn' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_kn' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zip_code' } },
                { kind: 'Field', name: { kind: 'Name', value: 'address_text' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'allergy' } },
                { kind: 'Field', name: { kind: 'Name', value: 'file_url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'join_flag' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetInviteeQuery, GetInviteeQueryVariables>;
export const UploadFileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UploadFile' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'comment' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'file_url' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Upload' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'uploadFile' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'comment' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'comment' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'file_url' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'file_url' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'comment' } },
                { kind: 'Field', name: { kind: 'Name', value: 'file_url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UploadFileMutation, UploadFileMutationVariables>;
export const GetImagesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetImages' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getImages' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'comment' } },
                { kind: 'Field', name: { kind: 'Name', value: 'file_url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetImagesQuery, GetImagesQueryVariables>;
export const DeleteInviteeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteInvitee' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteInvitee' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'family_kj' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_kj' } },
                { kind: 'Field', name: { kind: 'Name', value: 'family_kn' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_kn' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zip_code' } },
                { kind: 'Field', name: { kind: 'Name', value: 'address_text' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'allergy' } },
                { kind: 'Field', name: { kind: 'Name', value: 'file_url' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteInviteeMutation, DeleteInviteeMutationVariables>;
export const DeleteInvitationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteInvitation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteInvitation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'event_date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'place' } },
                { kind: 'Field', name: { kind: 'Name', value: 'file_url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteInvitationMutation, DeleteInvitationMutationVariables>;
export const UpdateInviteeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateInvitee' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'family_kj' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'first_kj' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'family_kn' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'first_kn' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'zip_code' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'address_text' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'allergy' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'file_url' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Upload' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'join_flag' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateInvitee' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'family_kj' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'family_kj' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'first_kj' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'first_kj' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'family_kn' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'family_kn' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'first_kn' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'first_kn' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'zip_code' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'zip_code' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'address_text' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'address_text' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'email' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'allergy' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'allergy' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'file_url' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'file_url' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'join_flag' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'join_flag' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'family_kj' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_kj' } },
                { kind: 'Field', name: { kind: 'Name', value: 'family_kn' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_kn' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zip_code' } },
                { kind: 'Field', name: { kind: 'Name', value: 'address_text' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'allergy' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'file_url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'join_flag' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateInviteeMutation, UpdateInviteeMutationVariables>;
