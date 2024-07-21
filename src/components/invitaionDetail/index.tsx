import { useUserState } from '@/atoms/userAtom';
import { Presenter } from '@/components/InviteeList/presenter';
import { useRouter } from 'next/router';
import React from 'react';
import { useGetInvitee } from './useShowInvitation';
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


  const onSubmit: SubmitHandler<InvForm> = async (data: any, id: string) => {    
    console.log("update_data!!",data);
    const processedData = {
      id: id,
      family_kj: data[`family_kj_${id}`],
      first_kj: data[`first_kj_${id}`],
      family_kn: data[`family_kn_${id}`],
      first_kn: data[`first_kn_${id}`],
      zip_code: data[`zip_code_${id}`],
      address_text: data[`address_text_${id}`],
      email: data[`email_${id}`],
      file_url: data[`file_url_${id}`],
      allergy: data[`allergy_${id}`],
      join_flag: data[`join_flag_${id}`], 
      userId: data[`userId_${id}`]
    };
  
    
    updateInvitee(processedData);
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
