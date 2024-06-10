
import { GET_MESSAGES } from '@/graphql/document';
import { useQuery } from '@apollo/client';
import { useCookies } from 'react-cookie';

export const useGetMessages = () => {
  const [cookies] = useCookies(['_csrf']);
  const { isLoading, error, data } = useQuery(GET_MESSAGES);
  
  return { 
    isLoading,
    // isError,
    data,
    error,
  };
};
