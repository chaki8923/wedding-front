import styles from './index.module.scss';
import { DELETE_INVITATION } from '@/graphql/document';
import { GetInvitationQuery } from '@/graphql/generated/graphql';
import useImagePreview from '@/hooks/useImagePreview';
import { Invitation } from '@/types/form';
import { useMutation } from '@apollo/client';
import Link from "next/link";
import { NextRouter } from 'next/router';
import { useRouter } from 'next/router';
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
  // カスタムフックを使用して画像プレビュー機能を追加
  useImagePreview('imageInput', 'imagePreview');
  const router = useRouter();
  const [delInvitation, { loading, error }] = useMutation(DELETE_INVITATION, {
    onCompleted: () => {
      router.push('/invitation');
    },
    onError: (error: any) => {
      console.error('Error posting invitation:', error);
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach(({ message, locations, path }) => {
          console.error(`GraphQL error: ${message}`);
        });
      }
      if (error.networkError) {
        console.error('Network error:', error.networkError.message);
      }
    },
  });


  const handleDelete = async (id: string) => {
    try {
      const response = await delInvitation({ variables: { id } });
      console.log('Deleted invitee:', response.data);
    } catch (err) {
      console.error('Error deleting invitee:', err);
    }
  };
  if (props.data === undefined) return <span>Loading...</span>;
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
            <input id="imageInput" type='file'  {...props.register('file_url', { required: true })} />
            <img id="imagePreview" src="" alt="Image Preview" className={styles.imagePreview} />
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
        <Link href={`invitation_detail?uuid=${invitation.uuid}`} key={invitation.id} >
          <div className={styles.contentWrapper}>
            <div className={styles.card}>
              <img src={invitation.file_url} alt="" />
              <p>タイトル:{invitation.title}</p>
              <p>開催日:{invitation.event_date}</p>
              <p>コメント:{invitation.comment}</p>
              <p>uuid:{invitation.uuid}</p>

              <button onClick={() => handleDelete(invitation.id)}>
                削除
              </button>

            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
