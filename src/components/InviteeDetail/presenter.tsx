import styles from './index.module.scss';
import { ShowInviteeQuery, ShowInvitationQuery } from '@/graphql/generated/graphql';
import React, { useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import useImagePreview from '@/hooks/useImagePreview';
import { DELETE_INVITEE } from '@/graphql/document';
import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { Invitee } from '@/types/form';

type Props = {
  data: ShowInviteeQuery;
  inv: ShowInvitationQuery;
  userId: string;
  router: NextRouter;
  handleSubmit: UseFormHandleSubmit<Invitee>;
  register: UseFormRegister<Invitee>;
  onSubmit: SubmitHandler<Invitee>;
};

export function Presenter(props: Props) {
  console.log("招待状詳細！！", props.data.showInvitee.id);
  useImagePreview('imageInput', 'imagePreview');
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const [delInvitee, { loading, error }] = useMutation(DELETE_INVITEE, {
    onCompleted: () => {
      router.push('/invitee_list');
    },
    onError: (error: any) => {
      console.error('Error posting invitation:', error);
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach(({ message, locations, path }) => {
          console.error(`GraphQL error: ${message}`);
        });
      }
      if (error.networkError) {
        console.error('Network error:', error.networkError.message);
      }
    },
  });

  const handleDelete = async (id: string) => {
    try {
      const response = await delInvitee({ variables: { id } });
      console.log('Deleted invitee:', response.data);
    } catch (err) {
      console.error('Error deleting invitee:', err);
    }
  };
  return (
    <>
      <div className={styles.contentWrapper}>
        <h1>招待者詳細画面です</h1>
        <div  className={styles.card}>
          <img src={props.inv.showInvitation.file_url} alt="" />
          <p>タイトル:{props.inv.showInvitation.title}</p>
          <p>開催日:{props.inv.showInvitation.event_date}</p>
          <p>コメント:{props.inv.showInvitation.comment}</p>
        </div>

        <form onSubmit={props.handleSubmit((data) => props.onSubmit(data, props.data.showInvitee.id))}>
          <div className={styles.card}>
            {isEditing ? (
              <p>
                <label>
                  出席:
                  <input
                    type='checkbox'
                    {...props.register(`join_flag_${props.data.showInvitee.id}`)}
                    defaultChecked={props.data.showInvitee.join_flag}
                  />
                </label>
              </p>
            ) : (
              <p onClick={handleEditClick}>出席　{props.data.showInvitee.join_flag ? '出席' : '欠席'}</p>
            )}
            {isEditing ? (
              <>
                <input
                  type='text'
                  placeholder='苗字'
                  defaultValue={props.data.showInvitee.family_kj}
                  {...props.register(`family_kj_${props.data.showInvitee.id}`, {
                    required: false
                  })}
                />
                <input
                  type='text'
                  placeholder='名前'
                  defaultValue={props.data.showInvitee.first_kj}
                  {...props.register(`first_kj_${props.data.showInvitee.id}`, {
                    required: false
                  })}
                />
              </>
            ) : (
              <p onClick={handleEditClick}>
                氏名　{props.data.showInvitee.family_kj} {props.data.showInvitee.first_kj}
              </p>
            )}
            {isEditing ? (
              <>

                <input
                  type='text'
                  placeholder='みょうじ'
                  defaultValue={props.data.showInvitee.family_kn}
                  {...props.register(`family_kn_${props.data.showInvitee.id}`, {
                    required: false
                  })} />
                <input type='text'
                  defaultValue={props.data.showInvitee.first_kn}
                  placeholder='なまえ'
                  {...props.register(`first_kn_${props.data.showInvitee.id}`, {
                    required: false
                  })} />

              </>
            ) : (
              <p onClick={handleEditClick}>
                しめい　{props.data.showInvitee.family_kn} {props.data.showInvitee.first_kn}
              </p>
            )}
            {isEditing ? (
              <>
                <input type='email' placeholder='email' defaultValue={props.data.showInvitee.email} {...props.register(`email_${props.data.showInvitee.id}`, {
                  required: false
                })} />
              </>
            ) : (
              <p onClick={handleEditClick}>email {props.data.showInvitee.email}</p>
            )}
            {isEditing ? (
              <>
                <input type='text' placeholder='郵便番号' defaultValue={props.data.showInvitee.zip_code} {...props.register(`zip_code_${props.data.showInvitee.id}`, {
                  required: false
                })} />

              </>
            ) : (
              <p onClick={handleEditClick}>〒　{props.data.showInvitee.zip_code}</p>
            )}
            {isEditing ? (
              <>
                <input type='text' placeholder='住所' defaultValue={props.data.showInvitee.address_text} {...props.register(`address_text_${props.data.showInvitee.id}`, {
                  required: false
                })} />
              </>
            ) : (
              <p onClick={handleEditClick}>住所　{props.data.showInvitee.address_text}</p>
            )}
            {isEditing ? (
              <>
                <input type='text' placeholder='アレルギー' defaultValue={props.data.showInvitee.allergy} {...props.register(`allergy_${props.data.showInvitee.id}`, { required: false })} />
              </>
            ) : (
              <p onClick={handleEditClick}>アレルギー　{props.data.showInvitee.allergy}</p>
            )}
            <img src={props.data.showInvitee.file_url} alt="" />
            {isEditing ? (
              <>
                <span onClick={handleCancel}>キャンセル</span>
              </>
            ) :
              <button onClick={() => handleDelete(props.data.showInvitee.id)}>
                削除
              </button>
            }
            <input onClick={handleEditClick} type='file' id={`imageInput_${props.data.showInvitee.id}`} {...props.register(`file_url_${props.data.showInvitee.id}`, { required: false })} />
            <img id={`imagePreview_${props.data.showInvitee.id}`} src="" alt="Image Preview" className={styles.imagePreview} />
            <input
              type='hidden'
              defaultValue={props.userId}
              {...props.register(`userId_${props.data.showInvitee.id}`, { required: true })}
            />
            <input
              type='hidden'
              defaultValue={props.data.showInvitee.id}
              {...props.register(`id_${props.data.showInvitee.id}`, { required: true })}
            />
            <button className={styles.submitBtn} type='submit'>
              更新
            </button>

          </div >
        </form>
      </div>
    </>
  );
}
