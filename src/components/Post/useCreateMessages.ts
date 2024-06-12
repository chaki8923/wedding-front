// hooks/useCreateMessages.js
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { POST_MESSAGE } from '@/graphql/document';
import { Create } from '@/types/form';

export const useCreateMessages = () => {
  const router = useRouter();

  const [postMessage, { loading, error }] = useMutation(POST_MESSAGE, {
    onCompleted: () => {
      // client.refetchQueries({ include: [GET_MESSAGES] });
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
