import { useUserState } from '@/atoms/userAtom';
import { Presenter } from '@/components/Images/presenter';
import { useRouter } from 'next/router';
import React from 'react';
import { useGetImages } from './useGetImages';

export function ImageList() {
  const { setUser } = useUserState();
  const router = useRouter();
  const { loading, data, error } = useGetImages();


  if (loading) <span>Loading...</span>;
  if (error) {
    setUser(null);
    router.push('/');
  }

  return <>{data && <Presenter data={data} router={router} />}</>;
}
