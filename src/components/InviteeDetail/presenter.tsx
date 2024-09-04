import styles from './index.module.scss';
import { DELETE_INVITEE } from '@/graphql/document';
import { ShowInviteeQuery, ShowInvitationQuery } from '@/graphql/generated/graphql';
import useImagePreview from '@/hooks/useImagePreview';
import { Invitee } from '@/types/form';
import { useMutation } from '@apollo/client';
import { NextRouter, useRouter } from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

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
    } catch (err) {
      console.error('Error deleting invitee:', err);
    }
  };
  if (!props.inv) {
    return <div>loading...</div>
  }
  return (
    <>
      <div className={styles.contentWrapper}>
        <div className={styles.card}>
          <img src={props.inv.showInvitation.file_url} alt="" />
          <div className={styles.invitationDeyail}>
            <p >タイトル:{props.inv.showInvitation.title}</p>
            <p>開催日:{props.inv.showInvitation.event_date}</p>
            <p>{props.data.showInvitee.family_kj}{props.data.showInvitee.first_kj} 様へ</p>
            <p>コメント:{props.inv.showInvitation.comment}</p>
            <form onSubmit={props.handleSubmit((data) => props.onSubmit(data))}>
              <div>
                <label>
                  出席の方はチェックを付けてください:
                </label>
                <input
                  type='checkbox'
                  {...props.register(`join_flag_${props.data.showInvitee.id}` as keyof Invitee)}
                  defaultChecked={props.data.showInvitee.join_flag}
                  className={styles.checkBox}
                />
              </div>
              <button className="p-2 px-12 tracking-wide mt-4 border-gray-400 border-2 bg-white text-base rounded-md cursor-pointer hover:bg-gray-300"
                type='submit'>
                これで更新する
              </button>
              <div className={styles.none}>
                {isEditing ? (
                  <>
                    <input
                      type='text'
                      placeholder='苗字'
                      defaultValue={props.data.showInvitee.family_kj}
                      {...props.register(`family_kj_${props.data.showInvitee.id}` as keyof Invitee, {
                        required: false
                      })}
                    />
                    <input
                      type='text'
                      placeholder='名前'
                      defaultValue={props.data.showInvitee.first_kj}
                      {...props.register(`first_kj_${props.data.showInvitee.id}` as keyof Invitee, {
                        required: false
                      })}
                    />
                  </>
                ) : (
                  <p onClick={handleEditClick}>
                    氏名 {props.data.showInvitee.family_kj} {props.data.showInvitee.first_kj}
                  </p>
                )}
                {isEditing ? (
                  <>

                    <input
                      type='text'
                      placeholder='みょうじ'
                      defaultValue={props.data.showInvitee.family_kn}
                      {...props.register(`family_kn_${props.data.showInvitee.id}` as keyof Invitee, {
                        required: false
                      })} />
                    <input type='text'
                      defaultValue={props.data.showInvitee.first_kn}
                      placeholder='なまえ'
                      {...props.register(`first_kn_${props.data.showInvitee.id}` as keyof Invitee, {
                        required: false
                      })} />

                  </>
                ) : (
                  <p onClick={handleEditClick}>
                    しめい {props.data.showInvitee.family_kn} {props.data.showInvitee.first_kn}
                  </p>
                )}
                {isEditing ? (
                  <>
                    <input type='email' placeholder='email' defaultValue={props.data.showInvitee.email} {...props.register(`email_${props.data.showInvitee.id}` as keyof Invitee, {
                      required: false
                    })} />
                  </>
                ) : (
                  <p onClick={handleEditClick}>email {props.data.showInvitee.email}</p>
                )}
                {isEditing ? (
                  <>
                    <input type='text' placeholder='郵便番号' defaultValue={props.data.showInvitee.zip_code} {...props.register(`zip_code_${props.data.showInvitee.id}` as keyof Invitee, {
                      required: false
                    })} />

                  </>
                ) : (
                  <p onClick={handleEditClick}>〒 {props.data.showInvitee.zip_code}</p>
                )}
                {isEditing ? (
                  <>
                    <input type='text' placeholder='住所' defaultValue={props.data.showInvitee.address_text} {...props.register(`address_text_${props.data.showInvitee.id}` as keyof Invitee, {
                      required: false
                    })} />
                  </>
                ) : (
                  <p onClick={handleEditClick}>住所 {props.data.showInvitee.address_text}</p>
                )}
                {isEditing ? (
                  <>
                    <input type='text' placeholder='アレルギー' defaultValue={props.data.showInvitee.allergy} {...props.register(`allergy_${props.data.showInvitee.id}` as keyof Invitee, { required: false })} />
                  </>
                ) : (
                  <p onClick={handleEditClick}>アレルギー {props.data.showInvitee.allergy}</p>
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
                <input onClick={handleEditClick} type='file' id={`imageInput_${props.data.showInvitee.id}`} {...props.register(`file_url_${props.data.showInvitee.id}` as keyof Invitee, { required: false })} />
                <img id={`imagePreview_${props.data.showInvitee.id}`} src="" alt="Image Preview" className={styles.imagePreview} />
                <input
                  type='hidden'
                  defaultValue={props.userId}
                  {...props.register(`userId_${props.data.showInvitee.id}` as keyof Invitee, { required: true })}
                />
                <input
                  type='hidden'
                  defaultValue={props.data.showInvitee.id}
                  {...props.register(`id_${props.data.showInvitee.id}` as keyof Invitee, { required: true })}
                />
                <input
                  type='hidden'
                  defaultValue={props.data.showInvitee.id}
                  {...props.register(`id`, { required: true })}
                />

              </div >
            </form>
          </div>
        </div>

      </div>
    </>
  );
}
