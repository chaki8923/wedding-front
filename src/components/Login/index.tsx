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
  const { userLogin, loading, error } = useLogin();
  // const { login } = useLogin();
  const onSubmit: SubmitHandler<LoginForm> = async (data: any) => {

    
    userLogin(data);
    // login(data);
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
