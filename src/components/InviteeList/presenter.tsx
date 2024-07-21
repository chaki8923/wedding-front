import styles from './index.module.scss';
import { GetInviteeQuery } from '@/graphql/generated/graphql';
import { DELETE_INVITEE } from '@/graphql/document';
import React, { useState } from 'react';
import { NextRouter } from 'next/router';
import { useMutation } from '@apollo/client';
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
  console.log(props.data);


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
        {props.data.getInvitee.map((invitee) => (
          <form key={invitee.id} onSubmit={props.handleSubmit((data) => props.onSubmit(data, invitee.id))}>
            <div className={styles.card}>
              {isEditing ? (
                <p>
                  <label>
                    出席:
                    <input type='checkbox' {...props.register(`join_flag_${invitee.id}`)} />
                  </label>
                </p>
              ) : (
                <p onClick={handleEditClick}>出席　{invitee.join_flag ? '出席' : '欠席'}</p>
              )}
              {isEditing ? (
                <>
                  <input
                    type='text'
                    placeholder='苗字'
                    defaultValue={invitee.family_kj}
                    {...props.register(`family_kj_${invitee.id}`, {
                      required: false
                    })}
                  />
                  <input
                    type='text'
                    placeholder='名前'
                    defaultValue={invitee.first_kj}
                    {...props.register(`first_kj_${invitee.id}`, {
                      required: false
                    })}
                  />
                </>
              ) : (
                <p onClick={handleEditClick}>
                  氏名　{invitee.family_kj} {invitee.first_kj}
                </p>
              )}
              {isEditing ? (
                <>

                  <input
                    type='text'
                    placeholder='みょうじ'
                    defaultValue={invitee.family_kn}
                    {...props.register(`family_kn_${invitee.id}`, {
                      required: false
                    })} />
                  <input type='text'
                    defaultValue={invitee.first_kn}
                    placeholder='なまえ'
                    {...props.register(`first_kn_${invitee.id}`, {
                    required: false
                    })} />

                </>
              ) : (
                <p onClick={handleEditClick}>
                  しめい　{invitee.family_kn} {invitee.first_kn}
                </p>
              )}
              {isEditing ? (
                <>
                  <input type='email' placeholder='email' defaultValue={invitee.email} {...props.register(`email_${invitee.id}`, {
                    required: false
                  })} />
                </>
              ) : (
                <p onClick={handleEditClick}>email {invitee.email}</p>
              )}
              {isEditing ? (
                <>
                  <input type='text' placeholder='郵便番号' defaultValue={invitee.zip_code} {...props.register(`zip_code_${invitee.id}`, {
                    required: false
                  })} />

                </>
              ) : (
                <p onClick={handleEditClick}>〒　{invitee.zip_code}</p>
              )}
              {isEditing ? (
                <>
                  <input type='text' placeholder='住所' defaultValue={invitee.address_text} {...props.register(`address_text_${invitee.id}`, {
                    required: false
                  })} />
                </>
              ) : (
                <p onClick={handleEditClick}>住所　{invitee.address_text}</p>
              )}
              {isEditing ? (
                <>
                  <input type='text' placeholder='アレルギー' defaultValue={invitee.allergy} {...props.register(`allergy_${invitee.id}`, { required: false })} />
                </>
              ) : (
                <p onClick={handleEditClick}>アレルギー　{invitee.allergy}</p>
              )}
              <img src={invitee.file_url} alt="" />
              {isEditing ? (
                <>
                  <span onClick={handleCancel}>キャンセル</span>
                </>
              ) :
                <button onClick={() => handleDelete(invitee.id)}>
                  削除
                </button>
              }
              <input onClick={handleEditClick} type='file' id={`imageInput_${invitee.id}`} {...props.register(`file_url_${invitee.id}`, { required: false })} />
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
              <button className={styles.submitBtn} type='submit'>
                更新
              </button>

            </div >
          </form>
        ))
        }
      </div >
    </>
  );
}
