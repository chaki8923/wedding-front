// hooks/useCreateMessages.js

import { CREATE_INVITATION } from '@/graphql/document';
import { Invitation } from '@/types/form';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

export const useCreateInvitation = () => {
  const router = useRouter();

  const [createInvitation, { loading, error }] = useMutation(CREATE_INVITATION, {
    onCompleted: () => {
      // client.refetchQueries({ include: [GET_MESSAGES] });
      router.push('/timeline');
    },
    onError: (error: Error) => console.error(`error!!: ${error.message}`),
  });

  const postInvitation = (input: Invitation) => {
    createInvitation({
      variables: {
        userId: input.userId,
        text: input.title,
        event_date: input.event_date,
        place: input.place,
      },
    });
  };

  return { postInvitation, loading, error };
};
