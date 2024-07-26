import styles from './index.module.scss';
import { GetInviteeQuery } from '@/graphql/generated/graphql';
import React, { useState } from 'react';
import { NextRouter } from 'next/router';
import useImagePreview from '@/hooks/useImagePreview';
import { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
import { Invitee } from '@/types/form';

type Props = {
  data: GetInviteeQuery;
  userId: string;
  router: NextRouter;
  handleSubmit: UseFormHandleSubmit<Invitee>;
  onSubmit: SubmitHandler<Invitee>;
};

export function Presenter(props: Props) {
  useImagePreview('imageInput', 'imagePreview');

  console.log("招待状詳細！！", props.data);
  return (
    <>
     あゝあああ
      

    </>
  );
}
