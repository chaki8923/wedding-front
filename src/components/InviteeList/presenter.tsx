/* eslint-disable react-hooks/rules-of-hooks */
import styles from './index.module.scss';
import { DELETE_INVITEE } from '@/graphql/document'
import { GetInviteeQuery } from '@/graphql/generated/graphql'
import { GetInvitationQuery } from '@/graphql/generated/graphql';
import { SendMail } from '@/types/form'
import { Invitee } from '@/types/form'
import { useMutation } from '@apollo/client'
import { NextRouter, useRouter } from 'next/router'
import React, { useState } from 'react'
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, SubmitHandler, useForm } from 'react-hook-form'
import { FaEnvelope, FaTrash, FaLightbulb, FaEdit } from 'react-icons/fa'


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
  invitationData: GetInvitationQuery
};



export function Presenter(props: Props) {
  const [emails, setEmails] = useState<string[]>([]);
  const [invitationId, setInvitationId] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEmailClick = (email: string) => {
    setEmails((prevEmails) => {
      if (prevEmails.includes(email)) {
        return prevEmails.filter((e) => e !== email);
      } else {
        return [...prevEmails, email];
      }
    });
  };

  const handleInvitationIdlClick = (id: string) => {
    setInvitationId(id);
  };

  const [delInvitee] = useMutation(DELETE_INVITEE, {
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

  


  return (
    <>
      <div className="flex flex-row bg-[url('/leaf53.png')]">
        <div className="flex-1 overflow-hidden  bg-cover bg-center">
          <div className="flex justify-center h-full overflow-y-auto pt-28 px-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 justify-items-start mb-12">
              {props.data.getInvitee.map((invitee) => {
                const { register, handleSubmit } = useForm<Invitee>({
                  defaultValues: {
                    id: invitee.id,
                    join_flag: invitee.join_flag,
                  },
                });

                const onSubmit = (data: Invitee) => {

                  const processedData = {
                    ...data,
                    id: invitee.id,
                  };
                  props.invOnSubmit(processedData);
                };

                return (
                  <div key={invitee.id} className="w-80 pb-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <input
                        type="hidden"
                        defaultValue={invitee.id}
                        {...props.invRegister(`id` as keyof Invitee, { required: true })}
                      />

                      <div className="w-full h-fit p-4 border border-gray-300 rounded-lg shadow-md bg-[#d1fae5] flex flex-col text-sm break-all">
                        <div className="flex mb-4 justify-center items-center">
                        {isEditing ? (
                            <>
                              <input
                                onClick={handleEditClick}
                                type="file"
                                id={`imageInput_${invitee.id}`}
                                {...register(`file_url_${invitee.id}` as keyof Invitee, { required: false })}
                                className="mt-2"
                              />
                              <img id={`imagePreview_${invitee.id}`} src="" alt="Image Preview" />
                            </>
                          ) : (
                            <img
                              src={invitee.file_url}
                              alt=""
                              className="mt-2 w-24 h-24 rounded-full object-cover border-2 border-green-300"
                            />
                        )}
                        </div>
                        {isEditing ? (
                          <p>
                            <label className="flex items-center">
                              出席:
                              <input
                                type="checkbox"
                                {...register(`join_flag_${invitee.id}` as keyof Invitee)}
                                defaultChecked={invitee.join_flag}
                                className="ml-2"
                              />
                            </label>
                          </p>
                        ) : (
                          <p className="flex flex-row items-center">
                            <p className="w-24 mr-2 text-center bg-green-300 p-2 rounded-md font-semibold">出席</p>{' '}
                            {invitee.join_flag ? '出席' : '欠席'}
                          </p>
                        )}
                        {isEditing ? (
                          <>
                            <input
                              type="text"
                              placeholder="苗字"
                              defaultValue={invitee.family_kj}
                              {...register(`family_kj_${invitee.id}` as keyof Invitee, {
                                required: false,
                              })}
                              className="mt-2 p-2 border rounded"
                            />
                            <input
                              type="text"
                              placeholder="名前"
                              defaultValue={invitee.first_kj}
                              {...register(`first_kj_${invitee.id}` as keyof Invitee, {
                                required: false,
                              })}
                              className="mt-2 p-2 border rounded"
                            />
                          </>
                        ) : (
                          <p className="flex flex-row items-center mt-1.5">
                            <p className="w-24 mr-2 text-center bg-green-300 p-2 rounded-md font-semibold">氏名</p>
                            {invitee.family_kj} {invitee.first_kj}
                          </p>
                        )}
                        {isEditing ? (
                          <>
                            <input
                              type="text"
                              placeholder="みょうじ"
                              defaultValue={invitee.family_kn}
                              {...register(`family_kn_${invitee.id}` as keyof Invitee, {
                                required: false,
                              })}
                              className="mt-2 p-2 border rounded"
                            />
                            <input
                              type="text"
                              defaultValue={invitee.first_kn}
                              placeholder="なまえ"
                              {...register(`first_kn_${invitee.id}` as keyof Invitee, {
                                required: false,
                              })}
                              className="mt-2 p-2 border rounded"
                            />
                          </>
                        ) : (
                          <p className="flex flex-row items-center mt-1.5">
                            <p className="w-24 mr-2 text-center bg-green-300 p-2 rounded-md font-semibold">しめい</p>
                            {invitee.family_kn} {invitee.first_kn}
                          </p>
                        )}
                        {isEditing ? (
                          <input
                            type="email"
                            placeholder="email"
                            defaultValue={invitee.email}
                            {...register(`email_${invitee.id}` as keyof Invitee, {
                              required: false,
                            })}
                            className="mt-2 p-2 border rounded"
                          />
                        ) : (
                          <p
                            className="flex flex-row items-center mt-1.5 cursor-copy"
                            onClick={() => handleEmailClick(invitee.email)}
                          >
                            <p className="w-24 mr-2 text-center bg-green-300 p-2 rounded-md font-semibold">Email</p>
                            <p className="cursor-copy">{invitee.email}</p>
                          </p>
                        )}
                        {isEditing ? (
                          <input
                            type="text"
                            placeholder="郵便番号"
                            defaultValue={invitee.zip_code}
                            {...register(`zip_code_${invitee.id}` as keyof Invitee, {
                              required: false,
                            })}
                            className="mt-2 p-2 border rounded"
                          />
                        ) : (
                          <p className="flex flex-row items-center mt-1.5">
                            <p className="w-24 mr-2 text-center bg-green-300 p-2 rounded-md font-semibold">〒</p>{' '}
                            {invitee.zip_code}
                          </p>
                        )}
                        {isEditing ? (
                          <input
                            type="text"
                            placeholder="住所"
                            defaultValue={invitee.address_text}
                            {...register(`address_text_${invitee.id}` as keyof Invitee, {
                              required: false,
                            })}
                            className="mt-2 p-2 border rounded"
                          />
                        ) : (
                          <p className="flex flex-row items-center mt-1.5">
                            <p className="w-24 mr-2 text-center bg-green-300 p-2 rounded-md font-semibold">住所</p>{' '}
                            {invitee.address_text}
                          </p>
                        )}
                        {isEditing ? (
                          <input
                            type="text"
                            placeholder="アレルギー"
                            defaultValue={invitee.allergy}
                            {...register(`allergy_${invitee.id}` as keyof Invitee, { required: false })}
                            className="mt-2 p-2 border rounded"
                          />
                        ) : (
                          <p className="flex flex-row items-center mt-1.5">
                            <p className="w-24 mr-2 text-center bg-green-300 p-2 rounded-md font-semibold">
                              アレルギー
                            </p>{' '}
                            {invitee.allergy}
                          </p>
                        )}
                        <div className="mt-2">
                          {isEditing ? (
                            <div className="flex items-center">
                              <button
                                className="mr-1 px-4 py-1 tracking-wide border-gray-400 border-2 bg-white text-base rounded-md cursor-pointer hover:bg-gray-300"
                                type="submit"
                              >
                                更新
                              </button>
                              <span onClick={handleCancel} className="cursor-pointer text-blue-500">
                                キャンセル
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <span
                                className="flex items-center px-4 py-1 tracking-wide border-gray-400 border-2 bg-yellow-100 text-base rounded-md cursor-pointer hover:bg-yellow-300 text-yellow-600 hover:text-yellow-800"
                                onClick={handleEditClick}
                              >
                                <FaEdit className="mr-2" />
                                編集
                              </span>
                              <span
                                onClick={() => handleDelete(invitee.id)}
                                className="flex items-center px-4 py-1 ml-2 tracking-wide border-gray-400 border-2 bg-red-100 text-base rounded-md cursor-pointer hover:bg-red-300 text-red-600 hover:text-red-800"
                              >
                                <FaTrash className="mr-2" />
                                <span>削除</span>
                              </span>
                            </div>
                          )}
                          <input
                            type="hidden"
                            defaultValue={props.userId}
                            {...register(`userId_${invitee.id}` as keyof Invitee, { required: true })}
                          />
                          <input
                            type="hidden"
                            defaultValue={invitee.id}
                            {...register(`id_${invitee.id}` as keyof Invitee, { required: true })}
                          />
                        </div>
                      </div>


                    </form>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* メール送信フォーム */}
        <div className={`${styles.mailForm } flex items-center justify-center min-h-screen bg-center bg-no-repeat`} style={{ backgroundImage: "url('/gift5.png')" }}>
          <div className="w-full max-w-md p-6 bg-white bg-opacity-80 border-4 border-slate-500 rounded-lg shadow-lg">
            <form onSubmit={props.handleSubmit(props.onSubmit)}>
              <div className="flex flex-col items-center">
                <div className="text-gray-600 text-2xl pb-4 flex items-center">
                  <FaEnvelope className="mr-2 text-3xl text-green-800" />
                  招待状送信
                </div>
                <div className="text-yellow-500 text-sm pb-4 flex items-center px-4">
                  <FaLightbulb className="w-12 h-12 mr-3 text-yellow-500" />
                  招待者のメールアドレスをクリックして、宛先に追加してください。（再度クリックすることで、宛先から消去できます。）
                </div>
                <div className="flex flex-col items-center w-full max-w-md space-y-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="to"
                      placeholder=" "
                      value={emails.join(', ')}
                      className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-green-800 bg-green-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-800 peer"
                      {...props.register('to', {
                        required: false,
                      })}
                    />
                    <label
                      htmlFor="to"
                      className="absolute text-sm text-green-800 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-green-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      宛先メールアドレス
                    </label>
                  </div>
                  {props.errors.to && <span className="text-red-500 text-xs">宛先メールアドレスは必須です</span>}

                  <div className="relative w-full">
                    <input
                      type="text"
                      id="from"
                      placeholder=" "
                      className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-green-800 bg-green-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-800 peer"
                      {...props.register('from', {
                        required: false,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      })}
                    />
                    <label
                      htmlFor="from"
                      className="absolute text-sm text-green-800 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-green-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      差出人メールアドレス
                    </label>
                  </div>
                  {props.errors.from && <span className="text-red-500 text-xs">差出人メールアドレスは必須です</span>}

                  <div className="relative w-full">
                    <input
                      type="text"
                      id="subject"
                      placeholder=" "
                      className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-green-800 bg-green-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-800 peer"
                      {...props.register('subject', {
                        required: true,
                      })}
                    />
                    <label
                      htmlFor="subject"
                      className="absolute text-sm text-green-800 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-green-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      タイトル
                    </label>
                  </div>
                  {props.errors.subject && <span className="text-red-500 text-xs">タイトルは必須です</span>}

                  <div className="relative w-full">
                    <input
                      type="text"
                      id="invitationId"
                      placeholder=" "
                      value={invitationId}
                      className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-green-800 bg-green-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-800 peer"
                      {...props.register('body', {
                        required: true,
                      })}
                    />
                    <label
                      htmlFor="invitationId"
                      className="absolute text-sm text-green-800 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-green-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      招待状ID
                    </label>
                  </div>
                  {props.errors.body && <span className="text-red-500 text-xs">招待状IDは必須です</span>}
                </div>
                <button
                  className="p-2 px-12 tracking-wide mt-4 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition duration-300"
                  type="submit"
                >
                  送信
                </button>
              </div>
            </form>
            <div className={styles.invitationsContainer}>
              {props.invitationData.getInvitation.map((invitation) => (
                <div onClick={() => handleInvitationIdlClick(invitation.uuid)}
                className={`${styles.card}`}
                 key={invitation.id}>
                  <img src={invitation.file_url} alt="" />
                  <img className={`${styles.check} ${invitationId === invitation.uuid ? styles.selected : ''}`} src="./check.png" alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}