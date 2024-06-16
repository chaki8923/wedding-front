import styles from './index.module.scss';
import { Invitation } from '@/types/form';
import { NextRouter } from 'next/router';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

type Props = {
  handleSubmit: UseFormHandleSubmit<Invitation>;
  onSubmit: SubmitHandler<Invitation>;
  register: UseFormRegister<Invitation>;
  errors: FieldErrors<Invitation>;
  userId: string;
  router: NextRouter;
};

export function Presenter(props: Props) {
  return (
    <>
      <form className={styles.loginForm} onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className={styles.formWrapper}>
          <div>招待状作成</div>
          <div className={styles.error}>
            {props.errors.title && <span>※Title is required</span>}
            {props.errors.event_date && <span>※開催日 is required</span>}
            {props.errors.place && <span>※開催場所 is required</span>}
            {props.errors.userId && <span>※Please login again</span>}
          </div>
          <div className={styles.inputWrapper}>
            <input type='text' placeholder='タイトル' {...props.register('title', {
              required: true
            })} />
            <input type='date' placeholder='開催日' {...props.register('event_date', { required: true })} />
            <input type='text' placeholder='開催場所' {...props.register('place', { required: true })} />
            <input
              type='hidden'
              defaultValue={props.userId}
              {...props.register('userId', { required: true })}
            />
          </div>
          <button className={styles.submitBtn} type='submit'>
            登録
          </button>
        </div>
      </form>
    </>
  );
}
