import styles from './index.module.scss';
import { SendMail } from '@/types/form';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

type Props = {
  handleSubmit: UseFormHandleSubmit<SendMail>;
  onSubmit: SubmitHandler<SendMail>;
  register: UseFormRegister<SendMail>;
  errors: FieldErrors<SendMail>;
};


export function Presenter(props: Props) {

  return (
    <>
      <form className={styles.loginForm} onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className={styles.formWrapper}>
          <div>メール送信</div>
          <div className={styles.error}>
            {props.errors.subject && <span>subject is required</span>}
            {props.errors.to && <span>to is required</span>}
            {props.errors.from && <span>from is required</span>}
            {props.errors.body && <span>body is required</span>}
          </div>
          <div className={styles.inputWrapper}>
            <input
              type='text'
              placeholder='to'
              {...props.register('to', {
                required: false
              })}
            />
            <input
              type='text'
              placeholder='from'
              {...props.register('from', {
                required: false,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
            <input
              type='text'
              placeholder='subject'
              {...props.register('subject', {
                required: true
              })}
            />
            <input
              type='text'
              placeholder='招待状uuid'
              {...props.register('body', {
                required: true
              })}
            />
            
          </div>
          <button className={styles.submitBtn} type='submit'>
            送信
          </button>
        </div>
      </form>
    </>
  );
}
