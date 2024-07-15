import { useUserState } from '@/atoms/userAtom';
import { Presenter } from '@/components/Invitation/presenter';
import { useCreateInvitation, useGetInvitation } from '@/components/Invitation/useCreateInvitation';
import { Invitation as InvForm } from '@/types/form';
import React from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';

export function Invitation() {
  const router = useRouter();
  const { user, setUser } = useUserState();
  const { createInvitation } = useCreateInvitation();
  const { loading, data, error } = useGetInvitation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvForm>();

  const onSubmit: SubmitHandler<InvForm> = async (data: any) => { 
      createInvitation(data);
  }

  if (!user) {
    return <span>UserId is not set...</span>;
  }

  if (loading) <span>Adding Messages...</span>;
  if (error) {
    console.error('Errorだよ: 招待状登録', error);
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
        data={data}
        userId={user.userId}
        router={router}
      />
    </>
  );
}
