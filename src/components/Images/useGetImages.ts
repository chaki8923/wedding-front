
import { GET_IMAGES } from '@/graphql/document';
import { useQuery } from '@apollo/client';

export const useGetImages = () => {
  const { loading, error, data } = useQuery(GET_IMAGES);  
  return { 
    loading,
    data,
    error,
  };
};
