import styles from './index.module.scss';
import { DELETE_INVITATION } from '@/graphql/document';
import { GetInvitationQuery } from '@/graphql/generated/graphql';
import useImagePreview from '@/hooks/useImagePreview';
import { Invitation } from '@/types/form';
import { useMutation } from '@apollo/client';
import Link from "next/link";
import { NextRouter } from 'next/router';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

type Props = {
  handleSubmit: UseFormHandleSubmit<Invitation>;
  onSubmit: SubmitHandler<Invitation>;
  register: UseFormRegister<Invitation>;
  errors: FieldErrors<Invitation>;
  data: GetInvitationQuery;
  userId: string;
  router: NextRouter;
};

export function Presenter({
  handleSubmit,
  onSubmit,
  register,
  errors,
  data,
  userId,
  router,
}: Props) {


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
    } catch (err) {
      console.error('Error deleting invitee:', err);
    }
  };

  useImagePreview('imageInput', 'imagePreview');
  if (data === undefined) return <span>Loading...</span>;
  return (
    <div className={styles.backgroundWrapper}>
      <form className="flex flex-col items-center w-full max-w-sm mt-28" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-gray-600 text-xl pb-8">招待状作成</h2>
        <div className="w-full text-red-500 text-xs mb-4">
          {errors.title && <span>※Title is required</span>}
          {errors.event_date && <span>※開催日 is required</span>}
          {errors.place && <span>※開催場所 is required</span>}
          {errors.comment && <span>※コメント is required</span>}
          {errors.userId && <span>※Please login again</span>}
        </div>
        <div className="flex flex-col items-center w-full">
          <input
            type='text'
            placeholder='タイトル'
            className="w-full p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
            {...register('title', { required: true })}
          />
          <input
            type='date'
            placeholder='開催日'
            className="w-full p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
            {...register('event_date', { required: true })}
          />
          <input
            type='text'
            placeholder='開催場所'
            className="w-full p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
            {...register('place', { required: true })}
          />
          <input
            type='text'
            placeholder='コメント'
            className="w-full p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
            {...register('comment', { required: true })}
          />
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
                {...register('file_url', { required: true })}
              />
            </label>
            {errors.file_url && <span className="text-red-500 text-xs mb-4 w-full">ファイルは必須です</span>}
            <img id="imagePreview" src="" alt="Image Preview" className={`${styles.imagePreview} w-full max-w-xs h-auto mt-4`} />
          </div>
        </div>
        <input
          type='hidden'
          defaultValue={userId}
          {...register('userId', { required: true })}
        />
        <button className="p-2 px-12 tracking-wide mt-4 border-gray-400 border-2 bg-white text-base rounded-md cursor-pointer hover:bg-gray-300" type='submit'>
          登録
        </button>
      </form>

      <hr style={{ borderBottom: '4px solid #3b5a32' }} className="w-full my-8" />

      <div className={styles.invitationsContainer}>
        {data.getInvitation.map((invitation) => (
          <div className={styles.card}  key={invitation.id}>
            <img src={invitation.file_url} alt="" />
            <p>タイトル: {invitation.title}</p>
            <p>開催日: {invitation.event_date}</p>
            <p>コメント: {invitation.comment}</p>
            <p>uuid: {invitation.uuid}</p>
            <button onClick={() => handleDelete(invitation.id)}>
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
