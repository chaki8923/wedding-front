import { GetImagesQuery } from '@/graphql/generated/graphql';
import { GET_IMAGES } from '@/graphql/document';
import { useQuery } from '@apollo/client';

export const useGetImages = () => {
  const { data, loading, error } = useQuery(GET_IMAGES);

  return {
    data,
    loading,
    error,
  };
};
