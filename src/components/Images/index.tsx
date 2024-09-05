import { Loading } from './Loading';
import { useGetImages } from './useGetImages';
import { useUserState } from '@/atoms/userAtom';
import { Presenter } from '@/components/Images/presenter';
import { useRouter } from 'next/router';
import React from 'react';
import { toast, Zoom } from 'react-toastify';

export function ImageList() {
  const { setUser } = useUserState();
  const router = useRouter();
  const { data, loading, error } = useGetImages();

  if (loading || data === undefined) return (
    <Loading />
  )

  if (data.getImages.length === 0) {
    return (
      <div className="relative p-2 w-full flex flex-col justify-center font-serif items-center bg-center pt-24 pb-5">
        <div className="w-5/12 text-center">
          画像をアップロードしてください。
        </div>
      </div>
    )
  }

  if (error) {
    toast.error('データの取得に失敗しました', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });
    setUser(null);
  }

  return <Presenter data={data.getImages} router={router} />
}
