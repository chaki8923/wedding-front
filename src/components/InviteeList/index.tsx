import { useGetInvitee } from './useGetInvitee';
import { useUserState } from '@/atoms/userAtom';
import { Presenter } from '@/components/InviteeList/presenter';
import { Invitee as InvForm } from '@/types/form';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';


export function InviteeList() {
  const { user, setUser } = useUserState();
  const router = useRouter();
  const { loading, data, error } = useGetInvitee();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvForm>();



  if (loading) <span>Loading...</span>;
  if (error) {
    setUser(null);
    router.push('/');
  }

  if (!user) {
    return <span>UserId is not set...</span>;
  }


  return <>{data && <Presenter
             data={data}
             router={router} 
             handleSubmit={handleSubmit}
             register={register}
             errors={errors}
             userId={user.userId}
             
             />}</>;
}
