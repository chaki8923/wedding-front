// hooks/useCreateMessages.js

import { UPLOAD_FILE } from '@/graphql/document';
import { Upload } from '@/types/form';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';


export const useUpload = () => {
  const router = useRouter();

  const [postFile, { loading, error }] = useMutation(UPLOAD_FILE, {
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

  const fileUpload = (input: Upload) => {
    postFile({
      variables: {
        comment: input.comment,
        file_url: input.file_url[0],
      },
    });
  };

  return { fileUpload, loading, error };
};
