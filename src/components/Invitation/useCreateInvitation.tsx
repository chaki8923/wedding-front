// hooks/useCreateMessages.js

import { CREATE_INVITATION, GET_INVITATION } from '@/graphql/document';
import { Invitation } from '@/types/form';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

export const useGetInvitation = () => {
  const { loading, error, data } = useQuery(GET_INVITATION);
  
  return { 
    loading,
    error,
    data,
  };
};


export const useCreateInvitation = () => {
  const router = useRouter();

  const [postInvitation, { loading, error }] = useMutation(CREATE_INVITATION, {
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

  const createInvitation = (input: Invitation) => {
    postInvitation({
      variables: {
        userId: input.userId,
        title: input.title,
        event_date: input.event_date,
        place: input.place,
        comment: input.comment,
        file_url: input.file_url[0],
      },
    });
  };

  return { createInvitation, loading, error };
};
