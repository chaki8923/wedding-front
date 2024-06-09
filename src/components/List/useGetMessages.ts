
import { GET_MESSAGES } from '@/graphql/document';
import { useQuery } from '@apollo/client';

export const useGetMessages = () => {
  const { isLoading, error, data } = useQuery(GET_MESSAGES);
  
  return { 
    isLoading,
    // isError,
    data,
    error,
  };
};
