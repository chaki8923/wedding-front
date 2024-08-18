import styles from './index.module.scss';
import { Invitee } from '@/types/form';
import { NextRouter } from 'next/router';
import { GetAllergyQuery } from '@/graphql/generated/graphql';
import useImagePreview from '@/hooks/useImagePreview';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

type Props = {
  data: GetAllergyQuery;
  handleSubmit: UseFormHandleSubmit<Invitee>;
  onSubmit: SubmitHandler<Invitee>;
  register: UseFormRegister<Invitee>;
  errors: FieldErrors<Invitee>;
  userId: string;
  router: NextRouter;
};

export function Presenter(props: Props) {
  useImagePreview('imageInput', 'imagePreview');

  return (
    <div className={styles.backgroundWrapper}>
      <form className={styles.inviteForm} onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className={styles.formWrapper}>
          <h2 className={styles.title}>招待者登録</h2>
          <div className={styles.error}>
            {props.errors.family_kj && <span>苗字 is required</span>}
            {props.errors.first_kj && <span>名前 is required</span>}
            {props.errors.family_kn && <span>みょうじ is required</span>}
            {props.errors.first_kn && <span>なまえ is required</span>}
          </div>
          <div className={styles.inputWrapper}>
            <input type='text' placeholder='苗字' {...props.register('family_kj', { required: true })} />
            <input type='text' placeholder='名前' {...props.register('first_kj', { required: true })} />
            <input type='text' placeholder='みょうじ' {...props.register('family_kn', { required: true })} />
            <input type='text' placeholder='なまえ' {...props.register('first_kn', { required: true })} />
            <input type='text' placeholder='郵便番号' {...props.register('zip_code', { required: true })} />
            <input type='text' placeholder='住所' {...props.register('address_text', { required: true })} />
            <input type='email' placeholder='email' {...props.register('email', { required: true })} />
            <input type='text' placeholder='アレルギー' {...props.register('allergy', { required: true })} />
            <input type='file' id="imageInput"  {...props.register('file_url', { required: true })} />
            <img id="imagePreview" src="" alt="Image Preview" className={styles.imagePreview}/>
          </div>
          <input
            type='hidden'
            defaultValue={props.userId}
            {...props.register('userId', { required: true })}
          />
          <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full cursor-pointer" type='submit'>
            登録
          </button>
        </div>
      </form>
    </div>
  );
}
