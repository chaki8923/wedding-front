import styles from './index.module.scss';
import { ShowInvitationQuery } from '@/graphql/generated/graphql';
import useImagePreview from '@/hooks/useImagePreview';
import { Invitee, Invitation } from '@/types/form';
import { NextRouter } from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

type Props = {
  data: ShowInvitationQuery;
  userId: string;
  router: NextRouter;
  handleSubmit: UseFormHandleSubmit<Invitee>;
  register: UseFormRegister<Invitee>;
  onSubmit: SubmitHandler<Invitee>;
};

export function Presenter(props: Props) {
  console.log("招待状詳細！！", props.data.showInvitation.id);
  return (
    <>
      <div className={styles.contentWrapper}>
        <h1>招待状詳細画面です</h1>
        <form onSubmit={props.handleSubmit((data) => props.onSubmit(data))}>
          <p>
            <label>
              出席:
              <input type='checkbox' {...props.register(`join_flag`)} />
            </label>
          </p>
          <input
            type='hidden'
            defaultValue={props.userId}
            {...props.register(`id`, { required: true })}
          />
          <button className={styles.submitBtn} type='submit'>
            更新
          </button>
        </form>
      </div>
    </>
  );
}
