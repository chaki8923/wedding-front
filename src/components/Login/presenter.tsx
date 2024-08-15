
import { Login } from '@/types/form';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

type Props = {
  handleSubmit: UseFormHandleSubmit<Login>;
  onSubmit: SubmitHandler<Login>;
  register: UseFormRegister<Login>;
  errors: FieldErrors<Login>;
};

;

export function Presenter(props: Props) {
  return (
    <div className="relative w-full h-screen flex flex-col justify-center font-serif	items-center bg-center  bg-no-repeat" style={{ backgroundImage: "url('/leaf1.png')" }}>
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-2xl text-black text-center">
        WEDDING GATE
      </div>
      <form className="flex flex-col items-center p-8 max-w-sm w-full mt-16 text-center" onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className="w-full mb-4">
          <input
            id="email"
            type="text"
            className="w-full p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
            placeholder="Email"
            {...props.register('email', {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
          />
          {props.errors.email && <span className="text-red-500 text-xs">※メールアドレスが正しくありません。※</span>}
        </div>
        <div className="w-full mb-4 border-bottom border-red-100">
          <input
            id="password"
            type="password"
            className="w-full p-3 mb-4 bg-transparent text-base border-b border-gray-400 outline-none"
            placeholder="Password"
            {...props.register('password', { required: true })}
          />
          {props.errors.password && <span className="text-red-500 text-xs">※パスワードが正しくありません。※</span>}
        </div>
        <button type="submit" className="p-3 px-12 tracking-wide mt-4 border-gray-400 border-2 bg-white text-base rounded-md cursor-pointe hover:bg-gray-300">
          L O G I N
        </button>
        <div className="mt-4 text-xs text-black cursor-pointer hover:underline">FORGOT PASSWORD?</div>
      </form>
    </div>
  );
}