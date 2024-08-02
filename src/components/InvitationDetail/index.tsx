import { useUserState } from '@/atoms/userAtom';
import { Presenter } from '@/components/InvitationDetail/presenter';
import { useRouter } from 'next/router';
import React from 'react';
import { useShowInvitation } from './useShowInvitation';
import { Invitation as InvForm } from '@/types/form';
import { useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';



const onSubmit: SubmitHandler<InvForm> = async (data: any, id: string) => {    

  console.log("update_data!!",data);

}


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

  return <>{data && <Presenter
             data={data}
             router={router} 
             userId={user.userId}
             onSubmit={onSubmit}
             register={register}
             handleSubmit={handleSubmit}
            
             />}</>;
}
