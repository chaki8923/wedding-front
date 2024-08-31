import { Presenter } from '@/components/Mail/presenter';
import { useMail } from '@/components/Mail/useMail';
import { SendMail } from '@/types/form';
import { useForm, SubmitHandler } from 'react-hook-form';

export function Mail() {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendMail>();
  const { sendMail } = useMail();
  const onSubmit: SubmitHandler<SendMail> = async (data: any) => {    
    sendMail(data);
  }
  return (
    <>
      <Presenter
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
      />
    </>
  );
}
