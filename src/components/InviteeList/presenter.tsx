import { DELETE_INVITEE } from '@/graphql/document'
import { GetInviteeQuery } from '@/graphql/generated/graphql'
import { SendMail } from '@/types/form'
import { Invitee } from '@/types/form'
import { useMutation } from '@apollo/client'
import { NextRouter, useRouter } from 'next/router'
import React, { useState } from 'react'
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, SubmitHandler, useForm } from 'react-hook-form'
import { FaEnvelope, FaTrash, FaLightbulb } from 'react-icons/fa'

type Props = {
  data: GetInviteeQuery
  handleSubmit: UseFormHandleSubmit<SendMail>
  register: UseFormRegister<SendMail>
  errors: FieldErrors<SendMail>
  userId: string
  router: NextRouter
  onSubmit: SubmitHandler<SendMail>
  invOnSubmit: SubmitHandler<Invitee>
  invHandleSubmit: UseFormHandleSubmit<Invitee>
  invRegister: UseFormRegister<Invitee>
  invErrors: FieldErrors<Invitee>
}

export function Presenter(props: Props) {
  const [emails, setEmails] = useState<string[]>([]) // メールアドレスの状態
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }
  // メールアドレスの追加・削除を行う関数
  const handleEmailClick = (email: string) => {
    setEmails((prevEmails) => {
      if (prevEmails.includes(email)) {
        // 既に存在する場合は削除
        return prevEmails.filter((e) => e !== email)
      } else {
        // 存在しない場合は追加
        return [...prevEmails, email]
      }
    })
  }

  const [delInvitee] = useMutation(DELETE_INVITEE, {
    onCompleted: () => {
      router.push('/invitee_list')
    },
    onError: (error: any) => {
      console.error('Error posting invitation:', error)
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach(({ message, locations, path }) => {
          console.error(`GraphQL error: ${message}`)
        })
      }
      if (error.networkError) {
        console.error('Network error:', error.networkError.message)
      }
    },
  })

  const handleDelete = async (id: string) => {
    try {
      const response = await delInvitee({ variables: { id } })
      console.log('Deleted invitee:', response.data)
    } catch (err) {
      console.error('Error deleting invitee:', err)
    }
  }
  // 各 form に独立した useForm フックを使用
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Invitee>()

  const onSubmit = (data: Invitee) => {
    const processedData = {
      ...data,
      id: data.id,
    }
    props.invOnSubmit(processedData)
  }
  return (
    <div className="flex flex-row h-screen">
      <div className="flex-1 overflow-hidden bg-[url('/leaf53.png')] bg-cover bg-center">
        <div className="flex justify-center h-full overflow-y-auto pt-28 px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 justify-items-start mb-12">
            {props.data.getInvitee.map((invitee) => (
              <div key={invitee.id} className="w-80 pb-5">
                <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                  <input
                    type="hidden"
                    defaultValue={invitee.id}
                    {...props.invRegister(`id` as keyof Invitee, { required: true })}
                  />

                  <div className="w-full h-fit p-4 border border-gray-300 rounded-lg shadow-md bg-[#f2ecdb] flex flex-col text-sm">
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
                        <p className="w-24 mr-2 text-center bg-gray-300 border p-2 rounded-md font-semibold">出席</p>{' '}
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
                        <p className="w-24 mr-2 text-center bg-gray-300 border p-2 rounded-md font-semibold">氏名</p>
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
                        <p className="w-24 mr-2 text-center bg-gray-300 border p-2 rounded-md font-semibold">しめい</p>
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
                        <p className="w-24 mr-2 text-center bg-gray-300 border p-2 rounded-md font-semibold">Email</p>
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
                        <p className="w-24 mr-2 text-center bg-gray-300 border p-2 rounded-md font-semibold">〒</p>{' '}
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
                        <p className="w-24 mr-2 text-center bg-gray-300 border p-2 rounded-md font-semibold">住所</p>{' '}
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
                        <p className="w-24 mr-2 text-center bg-gray-300 border p-2 rounded-md font-semibold">
                          アレルギー
                        </p>{' '}
                        {invitee.allergy}
                      </p>
                    )}
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
                        src="/leaf24.png"
                        alt=""
                        className="mt-2 w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                      />
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
                          <button
                            className="px-4 py-1 tracking-wide border-gray-400 border-2 bg-white text-base rounded-md cursor-pointer hover:bg-gray-300"
                            onClick={handleEditClick}
                          >
                            編集
                          </button>
                          <button
                            onClick={() => handleDelete(invitee.id)}
                            className="flex items-center px-4 py-2 text-red-600 hover:text-red-800"
                          >
                            <FaTrash className="mr-2" />
                            <span>削除</span>
                          </button>
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
            ))}
          </div>
        </div>
      </div>

      {/* メール送信フォーム */}
      <div className="w-1/4 overflow-y-auto border-4 border-slate-500">
        <form className="mt-28" onSubmit={props.handleSubmit(props.onSubmit)}>
          <div className="flex flex-col items-center">
            <div className="text-gray-600 text-xl pb-5 flex items-center">
              <FaEnvelope className="mr-2" />
              招待状送信
            </div>
            <div className="text-gray-500 text-sm pb-3 flex items-center px-5">
              <FaLightbulb className="w-6 h-6 mr-2" />
              招待者のメールアドレスをクリックして、宛先に追加してください。
            </div>
            <div className="flex flex-col items-center w-full max-w-sm">
              <input
                type="text"
                placeholder="宛先メールアドレス"
                value={emails.join(', ')}
                className="w-full p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
                {...props.register('to', {
                  required: false,
                })}
              />
              {props.errors.to && <span className="text-red-500 text-xs mb-4 w-full">宛先メールアドレスは必須です</span>}

              <input
                type="text"
                placeholder="差出人メールアドレス"
                className="w-full p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
                {...props.register('from', {
                  required: false,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
              {props.errors.from && <span className="text-red-500 text-xs mb-4 w-full">差出人メールアドレスは必須です</span>}

              <input
                type="text"
                placeholder="タイトル"
                className="w-full p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
                {...props.register('subject', {
                  required: true,
                })}
              />
              {props.errors.subject && <span className="text-red-500 text-xs mb-4 w-full">タイトルは必須です</span>}

              <input
                type="text"
                placeholder="招待状ID"
                className="w-full p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
                {...props.register('body', {
                  required: true,
                })}
              />
              {props.errors.body && <span className="text-red-500 text-xs mb-4 w-full">招待状IDは必須です</span>}
            </div>
            <button
              className="p-2 px-12 tracking-wide mt-4 border-gray-400 border-2 bg-white text-base rounded-md cursor-pointer hover:bg-gray-300"
              type="submit"
            >
              送信
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
