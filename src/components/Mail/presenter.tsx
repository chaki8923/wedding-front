import { SendMail } from '@/types/form'
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import { FaEnvelope } from 'react-icons/fa'

type Props = {
  handleSubmit: UseFormHandleSubmit<SendMail>
  onSubmit: SubmitHandler<SendMail>
  register: UseFormRegister<SendMail>
  errors: FieldErrors<SendMail>
}

export function Presenter(props: Props) {
  return (
    <><div className="relative w-full h-screen flex flex-col justify-center items-center bg-center  bg-no-repeat" style={{ backgroundImage: "url('/leaf24.png')" }}>
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
      </div>
    </>
  )
}
