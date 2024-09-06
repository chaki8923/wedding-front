import { useUpdateInvitee } from '../InviteeDetail/useUpdateInvitee'
import { useGetInvitee } from './useGetInvitee'
import { useUserState } from '@/atoms/userAtom'
import { useGetInvitation } from '@/components/Invitation/useCreateInvitation';
import { Presenter } from '@/components/InviteeList/presenter'
import { useMail } from '@/components/Mail/useMail'
import { Invitee as InvForm, SendMail } from '@/types/form'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

export function InviteeList() {
  const { user, setUser } = useUserState()
  const router = useRouter()
  const { loading, data, error } = useGetInvitee()
  const { loading: invitationLoading, data: invitationData, error: invitationError } = useGetInvitation();
  const { updateInvitee } = useUpdateInvitee()

  const invOnSubmit: SubmitHandler<InvForm> = async (data: any) => {
    const id = data['id']

    if (!id) {
      console.error('IDが取得できませんでした')
      return
    }

    console.log("invitationData", invitationData);
    

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
      userId: data[`userId_${id}`],
    }
    updateInvitee(processedData)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendMail>()

  const {
    register: invRegister,
    handleSubmit: invHandleSubmit, // 別名にする場合は、handleSubmitの後にasを使う
    formState: { errors: invErrors },
  } = useForm<InvForm>()

  const { sendMail } = useMail()
  const onSubmit: SubmitHandler<SendMail> = async (data: any) => {
    sendMail(data)
  }

  if (loading || invitationLoading) <span>Loading...</span>
  if (error) {
    setUser(null)
    router.push('/')
  }

  if(!invitationData){
    return <>Loading</>
  }

  if (!user) {
    return <span></span>
  }

  return (
    <>
      {data && (
        <Presenter
          data={data}
          router={router}
          handleSubmit={handleSubmit}
          invitationData={invitationData}
          register={register}
          errors={errors}
          userId={user.userId}
          onSubmit={onSubmit}
          invHandleSubmit={invHandleSubmit}
          invRegister={invRegister}
          invErrors={invErrors}
          invOnSubmit={invOnSubmit}
        />
      )}
    </>
  )
}
