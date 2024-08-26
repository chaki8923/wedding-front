import { Presenter } from './presenter';
import { useSignUp } from './useSignUp';
import { SignUp as SignUpForm } from '@/types/form';
import { useForm, SubmitHandler } from 'react-hook-form';

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