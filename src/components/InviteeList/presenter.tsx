import styles from './index.module.scss';
import { DELETE_INVITEE } from '@/graphql/document';
import { GetInviteeQuery } from '@/graphql/generated/graphql';
import { SendMail } from '@/types/form'
import { Invitee } from '@/types/form';
import { useMutation } from '@apollo/client';
import { NextRouter, useRouter } from 'next/router';
import React, { useState } from 'react';
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, SubmitHandler, useForm } from 'react-hook-form';
import { FaEnvelope } from 'react-icons/fa'

type Props = {
  data: GetInviteeQuery;
  handleSubmit: UseFormHandleSubmit<SendMail>;
  register: UseFormRegister<SendMail>;
  errors: FieldErrors<SendMail>;
  userId: string;
  router: NextRouter;
  onSubmit: SubmitHandler<SendMail>;
  invOnSubmit: SubmitHandler<Invitee>;
  invHandleSubmit: UseFormHandleSubmit<Invitee>;
  invRegister: UseFormRegister<Invitee>;
  invErrors: FieldErrors<Invitee>;
};

export function Presenter(props: Props) {
  const [emails, setEmails] = useState<string[]>([]); // メールアドレスの状態
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };
  // メールアドレスの追加・削除を行う関数
  const handleEmailClick = (email: string) => {
    setEmails((prevEmails) => {
      if (prevEmails.includes(email)) {
        // 既に存在する場合は削除
        return prevEmails.filter((e) => e !== email);
      } else {
        // 存在しない場合は追加
        return [...prevEmails, email];
      }
    });
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
  // 各 form に独立した useForm フックを使用
  const { register, handleSubmit, formState: { errors } } = useForm<Invitee>();

  const onSubmit = (data: Invitee) => {        
    const processedData = {
      ...data,
      id: data.id,
    };
    props.invOnSubmit(processedData);
  };
  return (
    <>
      <div className={styles.contentWrapper}>
        {props.data.getInvitee.map((invitee) => {

          return (
            <div key={invitee.id} className={styles.infoWrapper} onClick={() => handleEmailClick(invitee.email)}>
              <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <input
                  type='hidden'
                  defaultValue={invitee.id}
                  {...props.invRegister(`id` as keyof Invitee, { required: true })}
                />

              <div className={styles.card}>
                {isEditing ? (
                  <p>
                    <label>
                      出席:
                      <input
                        type='checkbox'
                        {...register(`join_flag_${invitee.id}` as keyof Invitee)}
                        defaultChecked={invitee.join_flag}
                      />
                    </label>
                  </p>
                ) : (
                  <p onClick={handleEditClick}>出席 {invitee.join_flag ? '出席' : '欠席'}</p>
                )}
                {isEditing ? (
                  <>
                    <input
                      type='text'
                      placeholder='苗字'
                      defaultValue={invitee.family_kj}
                      {...register(`family_kj_${invitee.id}` as keyof Invitee, {
                        required: false
                      })}
                    />
                    <input
                      type='text'
                      placeholder='名前'
                      defaultValue={invitee.first_kj}
                      {...register(`first_kj_${invitee.id}` as keyof Invitee, {
                        required: false
                      })}
                    />
                  </>
                ) : (
                  <p onClick={handleEditClick}>
                    氏名 {invitee.family_kj} {invitee.first_kj}
                  </p>
                )}
                {isEditing ? (
                  <>

                    <input
                      type='text'
                      placeholder='みょうじ'
                      defaultValue={invitee.family_kn}
                      {...register(`family_kn_${invitee.id}` as keyof Invitee, {
                        required: false
                      })} />
                    <input type='text'
                      defaultValue={invitee.first_kn}
                      placeholder='なまえ'
                      {...register(`first_kn_${invitee.id}` as keyof Invitee, {
                        required: false
                      })} />

                  </>
                ) : (
                  <p onClick={handleEditClick}>
                    しめい {invitee.family_kn} {invitee.first_kn}
                  </p>
                )}
                {isEditing ? (
                  <>
                    <input type='email' placeholder='email' defaultValue={invitee.email} {...register(`email_${invitee.id}` as keyof Invitee, {
                      required: false
                    })} />
                  </>
                ) : (
                  <p onClick={handleEditClick}>email {invitee.email}</p>
                )}
                {isEditing ? (
                  <>
                    <input type='text' placeholder='郵便番号' defaultValue={invitee.zip_code} {...register(`zip_code_${invitee.id}` as keyof Invitee, {
                      required: false
                    })} />

                  </>
                ) : (
                  <p onClick={handleEditClick}>〒 {invitee.zip_code}</p>
                )}
                {isEditing ? (
                  <>
                    <input type='text' placeholder='住所' defaultValue={invitee.address_text} {...register(`address_text_${invitee.id}` as keyof Invitee, {
                      required: false
                    })} />
                  </>
                ) : (
                  <p onClick={handleEditClick}>住所 {invitee.address_text}</p>
                )}
                {isEditing ? (
                  <>
                    <input type='text' placeholder='アレルギー' defaultValue={invitee.allergy} {...register(`allergy_${invitee.id}` as keyof Invitee, { required: false })} />
                  </>
                ) : (
                  <p onClick={handleEditClick}>アレルギー {invitee.allergy}</p>
                )}
                <img src={invitee.file_url} alt="" />
                <input onClick={handleEditClick} type='file' id={`imageInput_${invitee.id}`} {...register(`file_url_${invitee.id}` as keyof Invitee, { required: false })} />
                <img id={`imagePreview_${invitee.id}`} src="" alt="Image Preview" className={styles.imagePreview} />
                {isEditing ? (
                  <>
                    <span onClick={handleCancel}>キャンセル</span>
                  </>
                ) :
                  <button onClick={() => handleDelete(invitee.id)}>
                    削除
                  </button>
                }
                <input
                  type='hidden'
                  defaultValue={props.userId}
                  {...register(`userId_${invitee.id}` as keyof Invitee, { required: true })}
                />
                <input
                  type='hidden'
                  defaultValue={invitee.id}
                  {...register(`id_${invitee.id}` as keyof Invitee, { required: true })}
                />
           
                <button className={styles.submitBtn} type='submit'>
                  更新!!
                </button>

              </div >
            </form>
            </div>
          );
        })}
      </div>

      {/* メール送信フォーム */}
      <form className="mt-28" onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className="flex flex-col items-center">
          <div className="text-gray-600 text-xl pb-8 flex items-center">
            <FaEnvelope className="mr-2" />
            メール送信
          </div>
          <div className="flex flex-col items-center w-full max-w-sm">
            <input
              type="text"
              placeholder="To"
              value={emails.join(", ")}
              className="w-full p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
              {...props.register('to', {
                required: false,
              })}
             
            />
            {props.errors.to && (
              <span className="text-red-500 text-xs mb-4 w-full">
                Toは必須です
              </span>
            )}

            <input
              type="text"
              placeholder="From"
              className="w-full p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
              {...props.register('from', {
                required: false,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
            {props.errors.from && (
              <span className="text-red-500 text-xs mb-4 w-full">
                Fromは必須です
              </span>
            )}

            <input
              type="text"
              placeholder="Subject"
              className="w-full p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
              {...props.register('subject', {
                required: true,
              })}
            />
            {props.errors.subject && (
              <span className="text-red-500 text-xs mb-4 w-full">
                Subjectは必須です
              </span>
            )}

            <input
              type="text"
              placeholder="招待状ID"
              className="w-full p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
              {...props.register('body', {
                required: true,
              })}
            />
            {props.errors.body && (
              <span className="text-red-500 text-xs mb-4 w-full">
                招待状IDは必須です
              </span>
            )}
          </div>
          <button
            className="p-2 px-12 tracking-wide mt-4 border-gray-400 border-2 bg-white text-base rounded-md cursor-pointer hover:bg-gray-300"
            type="submit"
          >
            送信
          </button>
        </div>
      </form>
    </>
  );
}
