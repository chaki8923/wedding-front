import { Presenter } from '@/components/Upload/presenter';
import { useUpload } from '@/components/Upload/useUpload';
import { Upload } from '@/types/form';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';

export function UploadFile() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Upload>();
  const { fileUpload } = useUpload();
  const onSubmit: SubmitHandler<Upload> = async (data: any) => {
    
    fileUpload(data);
  }
  return (
    <>
      <Presenter
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        router={router}
      />
    </>
  );
}
