import { Create } from '@/types/form';
import { NextRouter } from 'next/router';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

type Props = {
  handleSubmit: UseFormHandleSubmit<Create>;
  onSubmit: SubmitHandler<Create>;
  register: UseFormRegister<Create>;
  errors: FieldErrors<Create>;
  userId: string;
  router: NextRouter;
};

export function Presenter(props: Props) {
  return (
    <div className="flex flex-col items-center mt-28">
      <label
        htmlFor="comment"
        className="block text-sm font-medium leading-6 text-gray-900"
      ></label>
      <div className="mt-2">
        <input
          type="hidden"
          defaultValue={props.userId}
          {...props.register('userId', { required: true })}
        />
        <textarea
          rows="4"
          name="comment"
          id="comment"
          placeholder="ご結婚おめでとうございます！！"
          className="p-3 block w-[600px] h-[200px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none"
          {...props.register('text', { required: true })}
        ></textarea>
        {props.errors.text && (
          <span className="text-red-600">※お祝いのコメントを書きましょう！</span>
        )}
      </div>
      <div className="mt-4">
        <button
          className="p-2 px-12 tracking-wide mt-4 border-gray-400 border-2 bg-white text-base rounded-md cursor-pointer hover:bg-gray-300"
          type="button"
          onClick={() => props.router.push('/timeLine')}
        >
          戻る
        </button>
        <button
          className="p-2 px-12 tracking-wide mt-4 ml-4 border-gray-400 border-2 bg-white text-base rounded-md cursor-pointer hover:bg-gray-300"
          type="button"
          onClick={props.handleSubmit(props.onSubmit)}
        >
          投稿する
        </button>
      </div>
    </div>
  );
}
