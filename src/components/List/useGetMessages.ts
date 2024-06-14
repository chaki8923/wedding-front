
import { GET_MESSAGES } from '@/graphql/document';
import { useQuery } from '@apollo/client';

export const useGetMessages = () => {
  const { loading, error, data } = useQuery(GET_MESSAGES);
  console.error("エラー発生", error);
  console.error("data", data);
  
  return { 
    loading,
    data,
    error,
  };
};
