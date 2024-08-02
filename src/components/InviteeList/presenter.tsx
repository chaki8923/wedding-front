import styles from './index.module.scss';
import { GetInviteeQuery } from '@/graphql/generated/graphql';
import React, { useState } from 'react';
import { NextRouter } from 'next/router';
import { Invitee } from '@/types/form';
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import Link from "next/link";

type Props = {
  data: GetInviteeQuery;
  handleSubmit: UseFormHandleSubmit<Invitee>;
  register: UseFormRegister<Invitee>;
  errors: FieldErrors<Invitee>;
  userId: string;
  router: NextRouter;
};

export function Presenter(props: Props) {
  console.log("招待者一覧", props.data.getInvitee);

  return (
    <>
      <div className={styles.contentWrapper}>
        {props.data.getInvitee.map((invitee) => (
          <Link href={`invitee_detail?uuid=${invitee.uuid}`} key={invitee.id}  >
            <div className={styles.card}>
              <p>出席　{invitee.join_flag ? '出席' : '欠席'}</p>
              <p>氏名　{invitee.family_kj} {invitee.first_kj}</p>
              <p>しめい　{invitee.family_kn} {invitee.first_kn}</p>
              <p>email {invitee.email}</p>
              <p>住所　{invitee.address_text}</p>
              <p>アレルギー　{invitee.allergy}</p>
              <img src={invitee.file_url} alt="" />
              <input type='file' id={`imageInput_${invitee.id}`} {...props.register(`file_url_${invitee.id}`, { required: false })} />
              <img id={`imagePreview_${invitee.id}`} src="" alt="Image Preview" className={styles.imagePreview} />
              <input
                type='hidden'
                defaultValue={props.userId}
                {...props.register(`userId_${invitee.id}`, { required: true })}
              />
              <input
                type='hidden'
                defaultValue={invitee.id}
                {...props.register(`id_${invitee.id}`, { required: true })}
              />
            </div >
          </Link>
        ))
        }
      </div >
    </>
  );
}
