
import { Login } from '@/types/form';
import Link from "next/link";
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

type Props = {
  handleSubmit: UseFormHandleSubmit<Login>;
  onSubmit: SubmitHandler<Login>;
  register: UseFormRegister<Login>;
  errors: FieldErrors<Login>;
  isSubmitting: boolean
}

export function Presenter(props: Props) {

  return (
    <div className="relative w-full h-screen flex flex-col justify-center font-serif	items-center bg-center  bg-no-repeat" style={{ backgroundImage: "url('/leaf19.png')" }}>

      <form className="flex flex-col items-center p-8 max-w-sm w-full mt-8 text-center" onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className={`w-full ${props.errors.email ? "" : "mb-4"}`}>
          <label htmlFor="email" className="w-full block text-left mb-1.5 text-sm font-medium text-gray-900 dark:text-white">
            メールアドレス
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input
              type="text"
              id="email"
              placeholder="test1@example.com"
              className={`bg-gray-50 py-3.5 text-lg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:bg-green-50 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 ${props.errors.email ? 'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 focus:bg-red-50' : ''}`}
              {...props.register('email', {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
          </div>
        </div>
        {props.errors.email && (
          <p className="font-medium text-left text-xs text-red-600 w-full mt-1.5 mb-2">メールアドレスの形式が正しくありません</p>
        )}

        <div className={`w-full ${props.errors.password ? "" : "mb-4"}`}>
          <label htmlFor="password" className="block mb-1.5 text-left text-sm font-medium text-gray-900 dark:text-white">
            パスワード
          </label>
          <input
            id="password"
            type="password"
            placeholder="•••••••••"
            className={`bg-gray-50 py-3.5 text-lg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:bg-green-50 block w-full ps-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 ${props.errors.password ? 'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 focus:bg-red-50' : ''}`}
            {...props.register('password', { required: true })}
          />
          {props.errors.password && (
            <p className="font-medium text-left text-xs text-red-600 w-full mt-1.5 mb-2">パスワードの形式が正しくありません</p>
          )}
        </div>

        <button disabled={props.isSubmitting} type="submit" class="w-full mt-2 py-3.5 flex justify-center align-center text-white bg-green-600 hover:bg-green-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:outline-none inline-flex items-center">
          {props.isSubmitting ?
            <svg aria-hidden="true" role="status" class="inline w-5 h-5 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>
            : "新規登録"}
        </button>

        <Link href='/' className="w-full mt-6 text-xs text-black text-center cursor-pointer underline hover:text-gray-400">
          ログインはこちら
        </Link>
      </form>
    </div>
  );
}