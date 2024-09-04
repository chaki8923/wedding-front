import { GetMessagesQuery } from '@/graphql/generated/graphql'
import { NextRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { FaClock } from 'react-icons/fa'

type Props = {
  data: GetMessagesQuery
  router: NextRouter
}

const avatars = [
  '/peep-76.png',
  '/peep-78.png',
]

const getRandomAvatar = () => {
  const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)]
  return (
    <img
      src={randomAvatar}
      alt="User Icon"
      className="w-16 h-16 rounded-full object-cover sm:w-20 sm:h-20 md:w-24 md:h-24"
    />
  )
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}年${month}月${day}日 ${hours}時${minutes}分`
}

export function Presenter({ data, router }: Props) {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
  function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift() ?? ''
  }
  const userId = getCookie('weddingUserId')
  const isFirstUser = userId === '1'
  setIsAdmin(isFirstUser)
  }, [])
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-row items-center justify-between mt-20 sm:mt-24 md:mt-28 mb-6">
        <div className="flex items-center sm:mb-0">
          <FaClock className="text-xl sm:text-2xl text-green-800 mr-2" />
          <h2 className="text-xl sm:text-2xl font-bold text-green-800">新郎新婦からのお知らせ</h2>
        </div>
        {isAdmin&&<div>
          <button
            onClick={() => router.push('/post')}
            className="bg-green-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg hover:bg-green-800 transition duration-300"
          >
            投稿する
          </button>
        </div>}
      </div>
      <div className="flex flex-col space-y-6 items-center">
        {data.getMessages.map((message, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-300 w-full max-w-6xl"
          >
            <div className="flex flex-row items-center space-x-4">
              <div className="flex-shrink-0 self-center">
                {getRandomAvatar()}
              </div>
              <div className="flex flex-col flex-grow min-w-0">
                <div className="flex flex-col mb-2">
                  <p className="text-xs text-gray-500 font-mono">{formatDate(message.created_at)}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg shadow-inner overflow-hidden">
                  <p className="text-sm sm:text-base text-gray-700 whitespace-pre-wrap break-words">{message.text}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}