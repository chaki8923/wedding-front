import { GetMessagesQuery } from '@/graphql/generated/graphql';
import { NextRouter } from 'next/router';
import { FaClock } from 'react-icons/fa';

type Props = {
  data: GetMessagesQuery;
  router: NextRouter;
};

const avatars = [
  '/peep-11.png',
  '/peep-13.png',
  '/peep-17.png',
  '/peep-19.png',
  '/peep-23.png',
  '/peep-32.png',
  '/peep-34.png',
  '/peep-37.png',
  '/peep-46.png',
  '/peep-51.png',
  '/peep-61.png',
  '/peep-76.png',
  '/peep-78.png',
  '/peep-87.png',
  '/peep-92.png',
  '/peep-94.png',
  '/peep-99.png',
  '/peep-103.png',
];

const getRandomAvatar = () => {
  const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
  return (
    <img
      src={randomAvatar}
      alt="User Icon"
      className="w-24 h-24 rounded-full object-cover" 
    />
  );
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}年${month}月${day}日 ${hours}時${minutes}分`;
};

export function Presenter(props: Props) {
  return (
    <>
      <div className="flex items-center justify-between px-5 md:px-8 mt-28 mb-6">
        <div className="flex items-center">
          <FaClock className="text-2xl text-green-800 mr-2" />
          <h2 className="text-2xl font-bold text-green-800">お知らせ</h2>
        </div>
        <div>
          <button
            onClick={() => props.router.push('/post')}
            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition duration-300"
          >
            投稿する
          </button>
        </div>
      </div>
      <div className="px-5 md:px-8 mb-6 flex flex-col space-y-6 items-center"> {/* Center align the rectangles */}
        {props.data.getMessages.map((message, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-300 w-full max-w-6xl"
          >
            <div className="flex items-start space-x-6">
              {getRandomAvatar()}
              <div className="flex flex-col flex-grow">
                <div className="flex flex-col mb-2">
                  <h3 className="font-semibold text-gray-800 text-lg">{message.user.name}</h3>
                  <p className="text-xs text-gray-500 font-mono">{formatDate(message.created_at)}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg shadow-inner overflow-hidden">
                  <p className="text-gray-700 whitespace-pre-wrap break-words">{message.text}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
