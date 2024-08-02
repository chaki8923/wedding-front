
import { SHOW_INVITATION } from '@/graphql/document';
import { useQuery } from '@apollo/client';

export const useShowInvitation = ({uuid}) => {
  const { loading, error, data } = useQuery(SHOW_INVITATION, {
    variables: {uuid}
  });  
  return { 
    loading,
    data,
    error,
  };
};
