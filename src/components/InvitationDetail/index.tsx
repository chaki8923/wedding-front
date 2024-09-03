import { useShowInvitation } from './useShowInvitation';
import { useUserState } from '@/atoms/userAtom';
import { Presenter } from '@/components/InvitationDetail/presenter';
import { Invitee as InvForm } from '@/types/form';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';


export function InvitationDetail() {
  const router = useRouter();
  const { user, setUser } = useUserState();
  const { uuid } = router.query;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvForm>();
  
  
  const { loading, data, error } = useShowInvitation({uuid});

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
             userId={user.userId}
             onSubmit={onSubmit}
             register={register}
             handleSubmit={handleSubmit}
            
             />}</>;
}
