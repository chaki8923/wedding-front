import React, { useEffect } from 'react';
import styles from './index.module.scss';
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
      <form className={styles.loginForm} onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className={styles.formWrapper}>
          <div>画像アップロード</div>
          <div className={styles.error}>
            {props.errors.comment && <span>苗字 is required</span>}
            {props.errors.file_url && <span>名前 is required</span>}
          </div>
          <div className={styles.inputWrapper}>
            <input type='text' placeholder='コメント' {...props.register('comment', {
              required: true
            })} />
            <input id="imageInput" type='file'  {...props.register('file_url', { required: true })} />
            <img id="imagePreview" src="" alt="Image Preview" className={styles.imagePreview}/>
          </div>
          <button className={styles.submitBtn} type='submit'>
            アップロード
          </button>
        </div>
      </form>

    </>
  );
}
