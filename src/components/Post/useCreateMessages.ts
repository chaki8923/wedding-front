// hooks/useCreateMessages.js
import { useMutation, useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { POST_MESSAGE, GET_MESSAGES } from '@/graphql/document';
import { Create } from '@/types/form';

export const useCreateMessages = () => {
  const router = useRouter();
  const [cookies] = useCookies(['_csrf']);
  const client = useApolloClient();

  const [postMessage, { loading, error }] = useMutation(POST_MESSAGE, {
    onCompleted: () => {
      client.refetchQueries({ include: [GET_MESSAGES] });
      router.push('/timeLine');
    },
    onError: (error: Error) => console.error(`error!!: ${error.message}`),
  });

  const createMessage = (input: Create) => {
    postMessage({
      variables: {
        userId: input.userId,
        text: input.text
      },
    });
  };

  return { createMessage, loading, error };
};
