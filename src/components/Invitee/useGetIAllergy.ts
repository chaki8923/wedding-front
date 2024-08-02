
import { GET_ALLERGY } from '@/graphql/document';
import { useQuery } from '@apollo/client';

export const useGetAllergy = () => {
  const { loading, error, data } = useQuery(GET_ALLERGY);  
  return { 
    loading,
    data,
    error,
  };
};
