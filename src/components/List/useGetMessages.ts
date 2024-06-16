
import { GET_MESSAGES } from '@/graphql/document';
import { useQuery } from '@apollo/client';

export const useGetMessages = () => {
  const { loading, error, data } = useQuery(GET_MESSAGES);  
  return { 
    loading,
    data,
    error,
  };
};
