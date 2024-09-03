import styles from './index.module.scss';
import useImagePreview from '@/hooks/useImagePreview';
import { Upload } from '@/types/form';
import { NextRouter } from 'next/router';
import React from 'react';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { FaUpload } from 'react-icons/fa';

type Props = {
  handleSubmit: UseFormHandleSubmit<Upload>;
  onSubmit: SubmitHandler<Upload>;
  register: UseFormRegister<Upload>;
  errors: FieldErrors<Upload>;
  router: NextRouter;
};

export function Presenter(props: Props) {
  // カスタムフックを使用して画像プレビュー機能を追加
  useImagePreview('dropzone-file', 'imagePreview');

  return (
    <div className={styles.contentWrapper}>
      <form className="mt-28" onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className="flex flex-col items-center">
          <div className="text-gray-600 text-xl pb-8 flex items-center">
            <FaUpload className="mr-2" />
            画像アップロード
          </div>
          <div className="flex flex-col items-center w-full max-w-sm">
            <input
              type="text"
              placeholder="コメントを入力してください"
              className="w-full p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
              {...props.register('comment', {
                required: true,
              })}
            />
            {props.errors.comment && <span className="text-red-500 text-xs mb-4 w-full">コメントは必須です</span>}

            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
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
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  {...props.register('file_url', {
                    required: true,
                  })}
                />
              </label>
            </div>
            {props.errors.file_url && <span className="text-red-500 text-xs mb-4 w-full">ファイルは必須です</span>}

            <img id="imagePreview" src="" alt="Image Preview" className={`${styles.imagePreview} w-full max-w-xs h-auto mt-4`} />
          </div>
          <button
            className="p-2 px-12 tracking-wide mt-4 border-gray-400 border-2 bg-white text-base rounded-md cursor-pointer hover:bg-gray-300"
            type="submit"
          >
            アップロード
          </button>
        </div>
      </form>
    </div>
  );
}
