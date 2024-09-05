import styles from './index.module.scss'
import { NextRouter, useRouter } from 'next/router'
import React, { useState, useEffect, useCallback } from 'react'
import {
  FaUsers,
  FaEnvelope,
  FaUpload,
  FaImages,
  FaThList,
  FaClock,
  FaSignOutAlt,
  FaBars,
  FaGift,
  FaTimes,
  FaHome,
  FaFileContract,
} from 'react-icons/fa'
import { GiDiamondRing } from 'react-icons/gi'

type Props = {
  logout: () => void
  router: NextRouter
}

export function Presenter(props: Props) {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    function getCookie(name: string) {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop()?.split(';').shift() ?? ''
    }
    const userId = getCookie('weddingUserId')
    const isFirstUser = userId === '1'
    setIsAdmin(isFirstUser)
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
  }, [])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(`.${styles.nav}`)) {
        closeMenu()
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [closeMenu])

  const handleToggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation()
    setMenuOpen(!menuOpen)
  }

  const handleNavigation = (path: string) => {
    closeMenu()
    props.router.push(path)
  }

  const isActive = (path: string) => router.pathname === path

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <GiDiamondRing className={styles.iconLogo} />
            <img src="/Logo3.png" alt="Wedding Gateway Logo" width={150} height={80} className={styles.logoImage} />
          </div>
          <div className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
            {menuOpen && (
              <button className={styles.closeButton} onClick={closeMenu}>
                <FaTimes />
                <span className="sr-only">メニューを閉じる</span>
              </button>
            )}
            <button onClick={() => handleNavigation('/timeLine')} className={styles.hideOnSmall}>
              <FaClock className={styles.icon} />
              <div className={styles.title}>お知らせ</div>
            </button>
            {isAdmin && (
              <button onClick={() => handleNavigation('/invitee')} className={styles.hideOnSmall}>
                <FaUsers className={styles.icon} />
                <div className={styles.title}>招待者</div>
              </button>
            )}
            {isAdmin && (
              <button onClick={() => handleNavigation('/invitee_list')} className={styles.hideOnSmall}>
                <FaThList className={styles.icon} />
                <div className={styles.title}>招待者一覧</div>
              </button>
            )}
            {isAdmin && (
              <button onClick={() => handleNavigation('/invitation')} className={styles.hideOnSmall}>
                <FaEnvelope className={styles.icon} />
                <div className={styles.title}>招待状</div>
              </button>
            )}
            <button onClick={() => handleNavigation('/images')} className={styles.hideOnSmall}>
              <FaImages className={styles.icon} />
              <div className={styles.title}>アルバム</div>
            </button>
            <button onClick={() => handleNavigation('/gift')} className={styles.hideOnSmall}>
              <FaGift className={styles.icon} />
              <div className={styles.title}>ご祝儀</div>
            </button>
            <button
              className={styles.btnLogOut}
              onClick={() => {
                closeMenu()
                props.logout()
              }}
            >
              <FaSignOutAlt className={styles.icon} />
              <div className={styles.title}>ログアウト</div>
            </button>
          </div>
          {!menuOpen && (
            <button className={styles.hamburger} onClick={handleToggleMenu}>
              <FaBars />
              <span className="sr-only">メニューを開く</span>
            </button>
          )}
        </nav>
      </header>
      <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 sm:block md:hidden">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <button
            data-tooltip-target="tooltip-home"
            type="button"
            className={`inline-flex flex-col items-center justify-center pl-2 rounded-s-full hover:bg-gray-50 group ${
              isActive('/timeLine') ? 'bg-gray-100' : ''
            }`}
            onClick={() => handleNavigation('/timeLine')}
          >
            <FaClock
              className={`w-5 h-5 mb-0.5 ${
                isActive('/timeLine') ? 'text-green-700' : 'text-gray-500 group-hover:text-green-700'
              }`}
            />
            <p
              className={`text-xs ${
                isActive('/timeLine') ? 'text-green-700' : 'text-gray-700 group-hover:text-green-700'
              }`}
            >
              お知らせ
            </p>
          </button>
          <button
            data-tooltip-target="tooltip-home"
            type="button"
            className={`inline-flex flex-col items-center justify-center px-1 hover:bg-gray-50 group ${
              isActive('/gift') ? 'bg-gray-100' : ''
            }`}
            onClick={() => handleNavigation('/gift')}
          >
            <FaGift
              className={`w-5 h-5 mb-0.5 ${
                isActive('/gift') ? 'text-green-700' : 'text-gray-500 group-hover:text-green-700'
              }`}
            />
            <p
              className={`text-xs ${isActive('/gift') ? 'text-green-700' : 'text-gray-700 group-hover:text-green-700'}`}
            >
              ご祝儀
            </p>
          </button>

          {/* プラスアイコン */}
          <div className="flex items-center justify-center">
            <button
              data-tooltip-target="tooltip-new"
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 font-medium bg-green-600 rounded-full hover:bg-green-700 group focus:ring-4 focus:ring-green-300 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => handleNavigation('/upload')}
            >
              <svg
                className="w-4 h-4 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
              <span className="sr-only">New item</span>
            </button>
          </div>

          <button
            data-tooltip-target="tooltip-home"
            type="button"
            className={`inline-flex flex-col items-center justify-center px-1 hover:bg-gray-50 dark:hover:bg-gray-800 group ${
              isActive('/images') ? 'bg-gray-100' : ''
            }`}
            onClick={() => handleNavigation('/images')}
          >
            <FaImages
              className={`w-5 h-5 mb-0.5 ${
                isActive('/images') ? 'text-green-700' : 'text-gray-500 group-hover:text-green-700'
              }`}
            />
            <p
              className={`text-xs ${
                isActive('/images') ? 'text-green-700' : 'text-gray-700 group-hover:text-green-700'
              }`}
            >
              アルバム
            </p>
          </button>
          <button
            data-tooltip-target="tooltip-home"
            type="button"
            className={`inline-flex flex-col items-center justify-center pr-2 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group ${
              isActive('/terms_of_service') ? 'bg-gray-100' : ''
            }`}
            onClick={() => handleNavigation('/terms_of_service')}
          >
            <FaFileContract
              className={`w-5 h-5 mb-0.5 ${
                isActive('/terms_of_service') ? 'text-green-700' : 'text-gray-500 group-hover:text-green-700'
              }`}
            />
            <p
              className={`text-xs ${
                isActive('/terms_of_service') ? 'text-green-700' : 'text-gray-700 group-hover:text-green-700'
              }`}
            >
              利用規約
            </p>
          </button>
        </div>
      </div>
    </>
  )
}
