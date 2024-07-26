import { useUserState } from '@/atoms/userAtom';
import { Presenter } from '@/components/InvitationDetail/presenter';
import { useRouter } from 'next/router';
import React from 'react';
import { useShowInvitation } from './useShowInvitation';
import { Invitation as InvForm } from '@/types/form';
import { useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useUpdateInvitee } from '../InviteeList/useUpdateInvitee';



const onSubmit: SubmitHandler<InvForm> = async (data: any, id: string) => {    
  const {updateInvitee} = useUpdateInvitee();
  console.log("update_data!!",data);
  const processedData = {
    id: id,
    family_kj: "",
    first_kj: "",
    family_kn: "",
    first_kn: "",
    zip_code: "",
    address_text: "",
    email: "",
    file_url: "",
    allergy: "",
    join_flag: data[`join_flag`], 
    userId: data[`userId`]
  };
  
  updateInvitee(processedData);
}


export function InvitationDetail() {
  const router = useRouter();
  const { user, setUser } = useUserState();
  const { uuid } = router.query;
  
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
            
             />}</>;
}
