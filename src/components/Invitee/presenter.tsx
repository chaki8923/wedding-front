import styles from './index.module.scss';
import { GetAllergyQuery } from '@/graphql/generated/graphql';
import useImagePreview from '@/hooks/useImagePreview';
import { Invitee } from '@/types/form';
import { NextRouter } from 'next/router';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

type Props = {
  data: GetAllergyQuery;
  handleSubmit: UseFormHandleSubmit<Invitee>;
  onSubmit: SubmitHandler<Invitee>;
  register: UseFormRegister<Invitee>;
  errors: FieldErrors<Invitee>;
  userId: string;
  router: NextRouter;
};

export function Presenter(props: Props) {
  useImagePreview('imageInput', 'imagePreview');

  return (
    <div className={styles.backgroundWrapper}>
      <form className="flex flex-col items-center w-full max-w-sm mt-28" onSubmit={props.handleSubmit(props.onSubmit)}>
        <h2 className="text-gray-600 text-xl pb-8">招待者登録</h2>
        <div className="w-full text-red-500 text-xs mb-4">
          {props.errors.family_kj && <span>苗字 is required</span>}
          {props.errors.first_kj && <span>名前 is required</span>}
          {props.errors.family_kn && <span>みょうじ is required</span>}
          {props.errors.first_kn && <span>なまえ is required</span>}
        </div>
        <div className="flex flex-col items-center w-full">
          <div className="flex mb-4 flex-col w-full space-y-4">
            <div className="flex w-full space-x-4">
              <div className="relative w-1/2">
                <input
                  type='text'
                  id="family_kj"
                  className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-green-800 bg-green-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-800 peer"
                  placeholder=" "
                  {...props.register('family_kj', { required: true })}
                />
                <label
                  htmlFor="family_kj"
                  className="absolute text-sm text-green-800 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-green-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  苗字
                </label>
              </div>
              <div className="relative w-1/2">
                <input
                  type='text'
                  id="first_kj"
                  className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-green-800 bg-green-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-800 peer"
                  placeholder=" "
                  {...props.register('first_kj', { required: true })}
                />
                <label
                  htmlFor="first_kj"
                  className="absolute text-sm text-green-800 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-green-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  名前
                </label>
              </div>
            </div>
            <div className="flex w-full space-x-4">
              <div className="relative w-1/2">
                <input
                  type='text'
                  id="family_kn"
                  className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-green-800 bg-green-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-800 peer"
                  placeholder=" "
                  {...props.register('family_kn', { required: true })}
                />
                <label
                  htmlFor="family_kn"
                  className="absolute text-sm text-green-800 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-green-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  みょうじ
                </label>
              </div>
              <div className="relative w-1/2">
                <input
                  type='text'
                  id="first_kn"
                  className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-green-800 bg-green-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-800 peer"
                  placeholder=" "
                  {...props.register('first_kn', { required: true })}
                />
                <label
                  htmlFor="first_kn"
                  className="absolute text-sm text-green-800 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-green-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  なまえ
                </label>
              </div>
            </div>
            <div className="flex w-full space-x-4">
              <div className="relative w-1/2">
                <input
                  type='text'
                  id="zip_code"
                  className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-green-800 bg-green-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-800 peer"
                  placeholder=" "
                  {...props.register('zip_code', { required: true })}
                />
                <label
                  htmlFor="zip_code"
                  className="absolute text-sm text-green-800 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-green-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  郵便番号
                </label>
              </div>
              <div className="relative w-1/2">
                <input
                  type='text'
                  id="address_text"
                  className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-green-800 bg-green-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-800 peer"
                  placeholder=" "
                  {...props.register('address_text', { required: true })}
                />
                <label
                  htmlFor="address_text"
                  className="absolute text-sm text-green-800 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-green-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  住所
                </label>
              </div>
            </div>
            <div className="flex w-full space-x-4">
              <div className="relative w-1/2">
                <input
                  type='email'
                  id="email"
                  className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-green-800 bg-green-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-800 peer"
                  placeholder=" "
                  {...props.register('email', { required: true })}
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-green-800 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-green-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  メール
                </label>
              </div>
              <div className="relative w-1/2">
                <input
                  type='text'
                  id="allergy"
                  className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-green-800 bg-green-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-800 peer"
                  placeholder=" "
                  {...props.register('allergy', { required: true })}
                />
                <label
                  htmlFor="allergy"
                  className="absolute text-sm text-green-800 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-green-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  アレルギー
                </label>
              </div>
            </div>
          </div>
          <div className={`${styles.imageWrap} w-full`}>
            <label
              htmlFor="imageInput"
              className={`${styles.imageWrap}image-wrap flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-green-100 hover:bg-green-200`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
              </div>
              <input
                id="imageInput"
                type="file"
                className="hidden"
                {...props.register('file_url', { required: true })}
              />
            </label>
            {props.errors.file_url && <span className="text-red-500 text-xs mb-4 w-full">ファイルは必須です</span>}
            <img id="imagePreview" src="" alt="Image Preview"   className={`${styles.imagePreview} w-full max-w-xs h-auto mt-4`} />
          </div>
        </div>
        <input
          type='hidden'
          defaultValue={props.userId}
          {...props.register('userId', { required: true })}
        />
        <button className="p-2 px-12 tracking-wide mt-4 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition duration-300" type='submit'>
          登録
        </button>
      </form>
    </div>
  );
}
