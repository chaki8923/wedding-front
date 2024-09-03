import { useCreateInvitee } from './useCreateInvitee';
import { useGetAllergy } from './useGetIAllergy';
import { useUserState } from '@/atoms/userAtom';
import { Presenter } from '@/components/Invitee/presenter';
import { Invitee as InvForm } from '@/types/form';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

export function Invitee() {
  const router = useRouter();
  const { user, setUser } = useUserState();
  const { createInvitee } = useCreateInvitee();
  const { loading, data, error } = useGetAllergy();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvForm>();

  const onSubmit: SubmitHandler<InvForm> = async (data: any) => {    
    createInvitee(data);
  }

  if (!user) {
    return <span>UserId is not set...</span>;
  }

  return (
    <>
      <Presenter
        data={data}
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
