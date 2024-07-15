
import { GET_INVITEE } from '@/graphql/document';
import { useQuery } from '@apollo/client';

export const useGetInvitee = () => {
  const { loading, error, data } = useQuery(GET_INVITEE);  
  return { 
    loading,
    data,
    error,
  };
};
