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
          <div className="flex w-full space-x-4">
            <input
              type='text'
              placeholder='苗字'
              className="w-1/2 p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
              {...props.register('family_kj', { required: true })}
            />
            <input
              type='text'
              placeholder='名前'
              className="w-1/2 p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
              {...props.register('first_kj', { required: true })}
            />
          </div>
          <div className="flex w-full space-x-4">
            <input
              type='text'
              placeholder='みょうじ'
              className="w-1/2 p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
              {...props.register('family_kn', { required: true })}
            />
            <input
              type='text'
              placeholder='なまえ'
              className="w-1/2 p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
              {...props.register('first_kn', { required: true })}
            />
          </div>
          <div className="flex w-full space-x-4">
            <input
              type='text'
              placeholder='郵便番号'
              className="w-1/2 p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
              {...props.register('zip_code', { required: true })}
            />
            <input
              type='text'
              placeholder='住所'
              className="w-1/2 p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
              {...props.register('address_text', { required: true })}
            />
          </div>
          <div className="flex w-full space-x-4">
            <input
              type='email'
              placeholder='メール'
              className="w-1/2 p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
              {...props.register('email', { required: true })}
            />
            <input
              type='text'
              placeholder='アレルギー'
              className="w-1/2 p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
              {...props.register('allergy', { required: true })}
            />
          </div>
          <div className={`${styles.imageWrap} w-full`}>
            <label
              htmlFor="imageInput"
              className={`${styles.imageWrap}image-wrap flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100`}
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
        <button className="p-2 px-12 tracking-wide mt-4 border-gray-400 border-2 bg-white text-base rounded-md cursor-pointer hover:bg-gray-300" type='submit'>
          登録
        </button>
      </form>
    </div>
  );
}
