
import { SHOW_INVITATION } from '@/graphql/document';
import { useQuery } from '@apollo/client';

export const useShowInvitation = () => {
  const { loading, error, data } = useQuery(SHOW_INVITATION);  
  return { 
    loading,
    data,
    error,
  };
};
