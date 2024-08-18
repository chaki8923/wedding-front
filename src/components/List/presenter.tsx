import { GetMessagesQuery } from '@/graphql/generated/graphql'
import { NextRouter } from 'next/router'
import { FiGift } from 'react-icons/fi'

type Props = {
  data: GetMessagesQuery
  router: NextRouter
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}年${month}月${day}日 ${hours}時${minutes}分に投稿`
}

export function Presenter(props: Props) {
  return (
    <>
      <div className="flex items-center justify-between px-5 md:px-8 mt-28 mb-4">
        <div className="flex items-center">
          <FiGift className="text-2xl text-red-500 mr-2" />
          <h2 className="text-2xl font-bold">お祝いのコメント</h2>
        </div>
        <div>
          <button
            onClick={() => props.router.push('/post')}
            className="bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            投稿する
          </button>
        </div>
      </div>
      <div className="px-5 md:px-8 space-y-4">
        {props.data.getMessages.map((message, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow border border-gray-300 box-shadow-sm"
          >
            <div className="flex items-center mb-2">
              <img
                src="/user_icon.png"
                alt="User Icon"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h3 className="font-semibold">{message.user.name}</h3>
                <p className="text-sm text-gray-500">
                  {formatDate(message.created_at)}
                </p>
              </div>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap break-words">
              {message.text}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}
