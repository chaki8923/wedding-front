import { useUserState } from '@/atoms/userAtom';
import { Presenter } from '@/components/InviteeDetail/presenter';
import { useRouter } from 'next/router';
import React from 'react';
import { useShowInvitee } from './useShowInvitee';
import { useShowInvitation } from '../InvitationDetail/useShowInvitation';
import { Invitation as InvForm } from '@/types/form';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useUpdateInvitee } from './useUpdateInvitee';



export function InviteeDetail() {
  const router = useRouter();
  const { user, setUser } = useUserState();
  const { uuid, inv_id } = router.query;
  console.log("inv_id", inv_id);
  
  const { updateInvitee } = useUpdateInvitee();

  const onSubmit: SubmitHandler<InvForm> = async (data: any, id: string) => {
    console.log("update_data!!", data);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvForm>();

  const {
    loading: loadingInvitee,
    data: inviteeData,
    error: inviteeError,
  } = useShowInvitee({ uuid });

  const {
    loading: loadingInvitation,
    data: invitationData,
    error: invitationError,
  } = useShowInvitation({ uuid: inv_id });


  if (loadingInvitee || loadingInvitation) <span>Loading...</span>;
  if (inviteeError || invitationError) {
    setUser(null);
    router.push('/');
  }

  return <>{inviteeData && <Presenter
    data={inviteeData}
    inv={invitationData}
    router={router}
    userId={user.userId}
    onSubmit={onSubmit}
    register={register}
    handleSubmit={handleSubmit}

  />}</>;
}
