import styles from './index.module.scss';
import { Invitation } from '@/types/form';
import { NextRouter } from 'next/router';
import { GetInvitationQuery } from '@/graphql/generated/graphql';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

type Props = {
  handleSubmit: UseFormHandleSubmit<Invitation>;
  onSubmit: SubmitHandler<Invitation>;
  register: UseFormRegister<Invitation>;
  errors: FieldErrors<Invitation>;
  data: GetInvitationQuery
  userId: string;
  router: NextRouter;
};



export function Presenter(props: Props) {
  console.log("props", props.data);
  if (props.data === 'undefined') <span>Loading...</span>;
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
            <input type='text' placeholder='コメント' {...props.register('comment', { required: true })} />
            <input type='file'  {...props.register('file_url', { required: true })} />
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

      {props.data.getInvitation.map((invitation) => (
        <div key={invitation.id} className={styles.contentWrapper}>
          <div className={styles.card}>
            <img src={invitation.file_url} alt="" />
            <p>タイトル:{invitation.title}</p>
            <p>開催日:{invitation.event_date}</p>
            <p>開催日:{invitation.comment}</p>

          </div>
        </div>
      ))}
    </>
  );
}
