// hooks/useCreateMessages.js

import { UPDATE_INVITEE } from '@/graphql/document';
import { Invitee } from '@/types/form';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

export const useUpdateInvitee = () => {
  const [updInvitee, { loading, error }] = useMutation(UPDATE_INVITEE, {
    onCompleted: () => {
      const router = useRouter();
      router.push('/invitee_list');
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

  const updateInvitee = (input: Invitee) => {
    updInvitee({
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
        id: input.id,
        join_flag: input.join_flag
      },
    });
  };

  return { updateInvitee, loading, error };
};
