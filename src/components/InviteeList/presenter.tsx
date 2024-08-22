import styles from './index.module.scss';
import { GetInviteeQuery } from '@/graphql/generated/graphql';
import { Invitee } from '@/types/form';
import Link from "next/link";
import { NextRouter } from 'next/router';
import React from 'react';
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

type Props = {
  data: GetInviteeQuery;
  handleSubmit: UseFormHandleSubmit<Invitee>;
  register: UseFormRegister<Invitee>;
  errors: FieldErrors<Invitee>;
  userId: string;
  router: NextRouter;
};

export function Presenter(props: Props) {
  return (
    <div className={styles.contentWrapper}>
      {props.data.getInvitee.map((invitee) => (
        <Link href={`invitee_detail?uuid=${invitee.uuid}`} key={invitee.id} >
          <div className={styles.card}>
            <div className={styles.profilePicWrapper}>
              <img src={invitee.file_url} alt="Profile Picture" className={styles.profilePic} />
            </div>
            <div className={styles.infoWrapper}>
              <p><strong>出席:</strong> {invitee.join_flag ? '出席' : '欠席'}</p>
              <p><strong>氏名:</strong> {invitee.family_kj} {invitee.first_kj}</p>
              <p><strong>しめい:</strong> {invitee.family_kn} {invitee.first_kn}</p>
              <p><strong>email:</strong> {invitee.email}</p>
              <p><strong>住所:</strong> {invitee.address_text}</p>
              <p><strong>アレルギー:</strong> {invitee.allergy}</p>
              <input
                type='hidden'
                defaultValue={props.userId}
                {...props.register(`userId_${invitee.id}` as keyof Invitee, { required: true })}
              />
              <input
                type='hidden'
                defaultValue={invitee.id}
                {...props.register(`id_${invitee.id}` as keyof Invitee, { required: true })}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
