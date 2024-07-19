import styles from './index.module.scss';
import { GetInviteeQuery } from '@/graphql/generated/graphql';
import { DELETE_INVITEE, UPDATE_INVITEE } from '@/graphql/document';
import { NextRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { Invitee } from '@/types/form';
import useImagePreview from '@/hooks/useImagePreview';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

type Props = {
  data: GetInviteeQuery;
  handleSubmit: UseFormHandleSubmit<Invitee>;
  onSubmit: SubmitHandler<Invitee>;
  register: UseFormRegister<Invitee>;
  errors: FieldErrors<Invitee>;
  userId: string;
  router: NextRouter;
};

export function Presenter(props: Props) {
  useImagePreview('imageInput', 'imagePreview');
  const router = useRouter();
  const [delInvitee, { loading, error }] = useMutation(DELETE_INVITEE, {
    onCompleted: () => {
      router.push('/invitee_list');
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
  console.log(props.data);
  

  const handleDelete = async (id: string) => {
    try {
      const response = await delInvitee({ variables: { id } });
      console.log('Deleted invitee:', response.data);
    } catch (err) {
      console.error('Error deleting invitee:', err);
    }
  };
  return (
    <>
      <div className={styles.contentWrapper}>
        {props.data.getInvitee.map((invitee) => (
          <div key={invitee.id} className={styles.card}>
            <p>出席　{invitee.join_flag ? '出席' : '欠席'}</p>
            <p>氏名　{invitee.family_kj}{invitee.first_kj}</p>
            <p>email {invitee.email}</p>
            <p>〒　{invitee.zip_code}</p>
            <p>住所　{invitee.address_text}</p>
            <p>アレルギー　{invitee.allergy}</p>
            <img src={invitee.file_url} alt="" />
            <button onClick={() => handleDelete(invitee.id)}>
              削除
            </button>
            <form onSubmit={props.handleSubmit(props.onSubmit)}>
              {props.errors.family_kj && <span>苗字 is required</span>}
              {props.errors.first_kj && <span>名前 is required</span>}
              {props.errors.family_kn && <span>みょうじ is required</span>}
              {props.errors.first_kn && <span>なまえ is required</span>}
              <input type='text' placeholder='苗字' {...props.register('family_kj', {
                required: false
              })} />
              <input type='text' placeholder='名前' {...props.register('first_kj', {
                required: false
              })} />
              <input type='text' placeholder='みょうじ' {...props.register('family_kn', {
                required: false
              })} />
              <input type='text' placeholder='なまえ' {...props.register('first_kn', {
                required: false
              })} />
              <input type='text' placeholder='郵便番号' {...props.register('zip_code', {
                required: false
              })} />
              <input type='text' placeholder='住所' {...props.register('address_text', {
                required: false
              })} />
              <input type='email' placeholder='email' {...props.register('email', {
                required: false
              })} />
              <input type='file' id="imageInput"  {...props.register('file_url', { required: false })} />
              <img id="imagePreview" src="" alt="Image Preview" className={styles.imagePreview}/>
              <input type='text' placeholder='アレルギー' {...props.register('allergy', { required: false })} />
              <label>
                出席:
                <input type='checkbox' {...props.register('join_flag')} />
              </label>
              <input
                type='hidden'
                defaultValue={props.userId}
                {...props.register('userId', { required: true })}
              />
              <input
                type='hidden'
                defaultValue={invitee.id}
                {...props.register('id', { required: true })}
              />
              <button className={styles.submitBtn} type='submit'>
                更新
              </button>

            </form>
          </div >
        ))
        }
      </div >
    </>
  );
}
