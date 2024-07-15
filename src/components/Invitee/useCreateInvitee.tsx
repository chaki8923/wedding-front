// hooks/useCreateMessages.js

import { CREATE_INVITEE, GET_INVITEE } from '@/graphql/document';
import { Invitee } from '@/types/form';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

export const useCreateInvitee = () => {
  const router = useRouter();
  const [postInvitee, { loading, error }] = useMutation(CREATE_INVITEE, {
    onCompleted: () => {
      router.push('/timeLine');
    },
    onError: (error: any) => {
      console.error('Error posting invitation:', error);
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach(({ message, locations, path }) => {
          console.error(`GraphQL error: ${message}`);
        });
      }
      if (error.networkError) {
        console.error('Network error:', error.networkError.message);
      }
    },
  });

  const createInvitee = (input: Invitee) => {
    postInvitee({
      variables: {
        first_kj: input.first_kj,
        family_kj: input.family_kj,
        family_kn: input.family_kn,
        first_kn: input.first_kn,
        email: input.email,
        zip_code: input.zip_code,
        address_text: input.address_text,
        allergy: input.allergy,
        file_url: input.file_url[0],
        userId: input.userId
      },
    });
  };

  return { createInvitee, loading, error };
};
