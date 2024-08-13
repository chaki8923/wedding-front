import React from 'react';
import { Upload} from '@/types/form';
import { NextRouter } from 'next/router';
import useImagePreview from '@/hooks/useImagePreview';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

type Props = {
  handleSubmit: UseFormHandleSubmit<Upload>;
  onSubmit: SubmitHandler<Upload>;
  register: UseFormRegister<Upload>;
  errors: FieldErrors<Upload>;
  router: NextRouter;
};



export function Presenter(props: Props) {
  // カスタムフックを使用して画像プレビュー機能を追加
  useImagePreview('imageInput', 'imagePreview');

 return (
    <>
      <form className="mt-36 font-serif" onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className="flex flex-col items-center">
          <div className="text-gray-600 text-xl pb-12">画像アップロード</div>
          <div className="flex flex-col items-center w-full max-w-sm">
            <input
              type="text"
              placeholder="コメント"
              className="w-full p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
              {...props.register('comment', {
                required: true,
              })}
            />
            {props.errors.comment && <span className="text-red-500 text-xs mb-4 w-full">コメントは必須です</span>}

            <input
              id="imageInput"
              type="file"
              className="w-full p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
              {...props.register('file_url', {
                required: true,
              })}
            />
            {props.errors.file_url && <span className="text-red-500 text-xs mb-4 w-full">ファイルは必須です</span>}

            <img id="imagePreview" src="" alt="Image Preview" className="w-full max-w-xs h-auto mt-4" />
          </div>
          <button
            className="p-3 px-12 tracking-wide mt-4 border-gray-400 border-2 bg-white text-base rounded-md cursor-pointer hover:bg-gray-300"
            type="submit"
          >
            アップロード
          </button>
        </div>
      </form>
    </>
  );
}