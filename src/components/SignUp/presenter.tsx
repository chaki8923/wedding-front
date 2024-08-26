import { Login } from '@/types/form';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister, UseFormWatch } from 'react-hook-form';

type Props = {
    handleSubmit: UseFormHandleSubmit<Login>;
    onSubmit: SubmitHandler<Login>;
    register: UseFormRegister<Login>;
    errors: FieldErrors<Login>;
    watch: UseFormWatch<Login>;
};

export function Presenter(props: Props) {
    const password = props.watch('password');

    return (
        <div className="relative w-full h-screen flex flex-col justify-center font-serif items-center bg-center bg-no-repeat" style={{ backgroundImage: "url('/leaf19.png')" }}>
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-2xl text-black text-center">
                <img src="/Logo3.png" alt="Wedding Gate Title" className="w-auto h-auto" />
            </div>
            <form className="flex flex-col items-center p-8 max-w-sm w-full mt-16 text-center" onSubmit={props.handleSubmit(props.onSubmit)}>
                <div className="w-full mb-4">
                    <input
                        id="email"
                        type="text"
                        className="w-full p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
                        placeholder="メール"
                        {...props.register('email', {
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        })}
                    />
                    {props.errors.email && <span className="text-red-500 text-xs">※メールアドレスの形式が正しくありません。※</span>}
                </div>
                <div className="w-full mb-4">
                    <input
                        id="password"
                        type="password"
                        className="w-full p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
                        placeholder="パスワード"
                        {...props.register('password', { required: true })}
                    />
                    {props.errors.password && <span className="text-red-500 text-xs">※パスワードを入力してください。※</span>}
                </div>
                <button type="submit" className="p-3 px-12 tracking-wide mt-4 border-gray-400 border-2 bg-white text-base rounded-md cursor-pointer hover:bg-gray-300">
                    新規登録
                </button>
            </form>
        </div>
    );
}