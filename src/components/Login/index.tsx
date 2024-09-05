import { Presenter } from '@/components/Login/presenter';
import { useLogin } from '@/components/Login/useLogin';
import { Login as LoginForm } from '@/types/form';
import { useForm, SubmitHandler } from 'react-hook-form';

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const { login, isSubmitting } = useLogin();
  const onSubmit: SubmitHandler<LoginForm> = (data: any) => {
    login(data);
  }
  return (
    <>
      <Presenter
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
