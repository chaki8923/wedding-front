
import { SHOW_INVITEE } from '@/graphql/document';
import { useQuery } from '@apollo/client';

export const useShowInvitee = ({uuid}: {uuid: string}) => {
  const { loading, error, data } = useQuery(SHOW_INVITEE, {
    variables: {uuid}
  });  
  return { 
    loading,
    data,
    error,
  };
};
