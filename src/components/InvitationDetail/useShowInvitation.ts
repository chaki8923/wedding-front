
import { SHOW_INVITATION } from '@/graphql/document';
import { useQuery } from '@apollo/client';

export const useShowInvitation = ({uuid}) => {
  const { loadings, errors, datas } = useQuery(SHOW_INVITATION, {
    variables: {uuid}
  });  
  return { 
    loadings,
    datas,
    errors,
  };
};
