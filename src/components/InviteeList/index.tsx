import { useUserState } from '@/atoms/userAtom';
import { Presenter } from '@/components/InviteeList/presenter';
import { useRouter } from 'next/router';
import React from 'react';
import { useGetInvitee } from './useGetInvitee';
import { Invitation as InvForm } from '@/types/form';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useUpdateInvitee } from './useUpdateInvitee';

export function ImageList() {
  const { user, setUser } = useUserState();
  const router = useRouter();
  const { loading, data, error } = useGetInvitee();
  const {updateInvitee} = useUpdateInvitee();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvForm>();


  const onSubmit: SubmitHandler<InvForm> = async (data: any) => {    
    console.log("update_data!!",data);
    
    updateInvitee(data);
}


  if (loading) <span>Loading...</span>;
  if (error) {
    setUser(null);
    router.push('/');
  }

  return <>{data && <Presenter
             data={data}
             router={router} 
             handleSubmit={handleSubmit}
             onSubmit={onSubmit}
             register={register}
             errors={errors}
             userId={user.userId}
             
             />}</>;
}
