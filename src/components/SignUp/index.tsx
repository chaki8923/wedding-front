import { Presenter } from './presenter';
import { SignUp as SignUpForm } from '@/types/form';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSignUp } from './useSignUp';

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<SignUpForm>();
  const { signUp } = useSignUp();
  const onSubmit: SubmitHandler<SignUpForm> = async (data: any) => {
    
    signUp(data);
  }
  return (
    <>
      <Presenter
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        watch={watch}
      />
    </>
  );
}
