import styles from './index.module.scss';
import { GetInviteeQuery } from '@/graphql/generated/graphql';
import React, { useState } from 'react';
import { NextRouter } from 'next/router';
import { useRouter } from 'next/router';
import { Invitee } from '@/types/form';
import useImagePreview from '@/hooks/useImagePreview';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

type Props = {
  data: GetInviteeQuery;
  handleSubmit: UseFormHandleSubmit<Invitee>;
  onSubmit: SubmitHandler<Invitee>;
  register: UseFormRegister<Invitee>;
  errors: FieldErrors<Invitee>;
  userId: string;
  router: NextRouter;
};

export function Presenter(props: Props) {
  useImagePreview('imageInput', 'imagePreview');
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const handleCancel = () => {
    setIsEditing(false);
  };


  const handleEditClick = () => {
    setIsEditing(true);
  };

  console.log(props.data);
  return (
    <>
      
    </>
  );
}
