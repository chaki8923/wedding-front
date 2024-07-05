import styles from './index.module.scss';
import { Invitee } from '@/types/form';
import { NextRouter } from 'next/router';
import { GetInvitationQuery } from '@/graphql/generated/graphql';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

type Props = {
  handleSubmit: UseFormHandleSubmit<Invitee>;
  onSubmit: SubmitHandler<Invitation>;
  register: UseFormRegister<Invitee>;
  errors: FieldErrors<Invitee>;
  userId: string;
  router: NextRouter;
};



export function Presenter(props: Props) {
  return (
    <>
      <form className={styles.loginForm} onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className={styles.formWrapper}>
          <div>招待者登録</div>
          <div className={styles.error}>
            {props.errors.family_kj && <span>苗字 is required</span>}
            {props.errors.first_kj && <span>名前 is required</span>}
            {props.errors.family_kn && <span>みょうじ is required</span>}
            {props.errors.first_kn && <span>なまえ is required</span>}
          </div>
          <div className={styles.inputWrapper}>
            <input type='text' placeholder='苗字' {...props.register('family_kj', {
              required: true
            })} />
            <input type='text' placeholder='名前' {...props.register('first_kj', {
              required: true
            })} />
            <input type='text' placeholder='みょうじ' {...props.register('family_kn', {
              required: true
            })} />
            <input type='text' placeholder='なまえ' {...props.register('first_kn', {
              required: true
            })} />
            <input type='text' placeholder='郵便番号' {...props.register('zip_code', {
              required: true
            })} />
            <input type='text' placeholder='住所' {...props.register('address_text', {
              required: true
            })} />
            <input type='email' placeholder='email' {...props.register('email', {
              required: true
            })} />
            <input type='text' placeholder='アレルギー' {...props.register('allergy', { required: true })} />
            <input type='file'  {...props.register('file_url', { required: true })} />
          </div>
          <input
              type='hidden'
              defaultValue={props.userId}
              {...props.register('userId', { required: true })}
            />
          <button className={styles.submitBtn} type='submit'>
            登録
          </button>
        </div>
      </form>

    </>
  );
}
