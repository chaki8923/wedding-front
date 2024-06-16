import { useUserState } from '@/atoms/userAtom';
import { Presenter } from '@/components/Invitation/presenter';
import { useCreateInvitation } from '@/components/Invitation/useCreateInvitation';
import { Invitation as InvForm } from '@/types/form';
import React from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';

export function Invitation() {
  const router = useRouter();
  const { user, setUser } = useUserState();
  const { postInvitation, loading, error } = useCreateInvitation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvForm>();

  const onSubmit: SubmitHandler<InvForm> = async (data: any) => {    
    console.log("送信data", data);
    
    postInvitation(data);
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
        userId={user.userId}
        router={router}
      />
    </>
  );
}
