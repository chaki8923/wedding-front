import { useUserState } from '@/atoms/userAtom';
import { Presenter } from '@/components/List/presenter';
import { useGetMessages } from '@/components/List/useGetMessages';
import { useRouter } from 'next/router';
import React from 'react';

export function List() {
  const { setUser } = useUserState();
  const router = useRouter();
  const { loading, data, error } = useGetMessages();

  if (loading) <span>Loading...</span>;
  if (error) {
    console.error('メッセージ取得エラー: useGetMessages', error);
    setUser(null);
    router.push('/timeline');
  }

  return <>{data && <Presenter data={data} router={router} />}</>;
}
