import styles from './index.module.scss';
import { Upload} from '@/types/form';
import { NextRouter } from 'next/router';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

type Props = {
  handleSubmit: UseFormHandleSubmit<Upload>;
  onSubmit: SubmitHandler<Upload>;
  register: UseFormRegister<Upload>;
  errors: FieldErrors<Upload>;
  router: NextRouter;
};



export function Presenter(props: Props) {
  console.log("index");
  
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
            <input type='file'  {...props.register('file_url', { required: true })} />
          </div>
          <button className={styles.submitBtn} type='submit'>
            アップロード
          </button>
        </div>
      </form>

    </>
  );
}
