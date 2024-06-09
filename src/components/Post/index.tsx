import { useUserState } from '@/atoms/userAtom';
import { Presenter } from '@/components/Post/presenter';
import { useCreateMessages } from '@/components/Post/useCreateMessages';
import { Create } from '@/types/form';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

export function Post() {
  const router = useRouter();
  const { user, setUser } = useUserState();
  // const { mutation } = useCreateMessages();
  const { createMessage, loading, error } = useCreateMessages();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Create>();

  const onSubmit: SubmitHandler<Create> = async (data: any) => {
    createMessage(data);
  }

  if (!user) {
    return <span>UserId is not set...</span>;
  }

  if (loading) <span>Adding Messages...</span>;
  if (error) {
    console.error('Errorだよ: useCreateMessages', error);
    // setUser(null);
    router.push('/timeLine');
  }

  return (
    <>
      <Presenter
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        userId={user.userId}
        router={router}
      />
    </>
  );
}
