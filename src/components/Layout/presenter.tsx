import styles from './index.module.scss';
import { NextRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react';
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
  FaHome
} from 'react-icons/fa';
import { GiDiamondRing } from 'react-icons/gi';

type Props = {
  logout: () => void;
  router: NextRouter;
};

export function Presenter(props: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    function getCookie(name: string) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() ?? '';
    }
    const userId = getCookie('weddingUserId');
    const isFirstUser = userId === '1';
    setIsAdmin(isFirstUser);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles.nav}`)) {
        closeMenu();
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [closeMenu]);

  const handleToggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (path: string) => {
    closeMenu();
    props.router.push(path);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <GiDiamondRing className={styles.iconLogo} />
          <img
            src="/Logo3.png"
            alt="Wedding Gateway Logo"
            width={150}
            height={80}
            className={styles.logoImage}
          />
        </div>
        <div className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
          {menuOpen && (
            <button className={styles.closeButton} onClick={closeMenu}>
              <FaTimes />
              <span className="sr-only">メニューを閉じる</span>
            </button>
          )}
          <button onClick={() => handleNavigation('/timeLine')}>
            <FaClock className={styles.icon} />
            <div className={styles.title}>お知らせ</div>
          </button>
          {isAdmin && (
            <button onClick={() => handleNavigation('/invitee')}>
              <FaUsers className={styles.icon} />
              <div className={styles.title}>招待者</div>
            </button>
          )}
          {isAdmin && (
            <button onClick={() => handleNavigation('/invitee_list')}>
              <FaThList className={styles.icon} />
              <div className={styles.title}>招待者一覧</div>
            </button>
          )}
          {isAdmin && (
            <button onClick={() => handleNavigation('/invitation')}>
              <FaEnvelope className={styles.icon} />
              <div className={styles.title}>招待状</div>
            </button>
          )}
          <button onClick={() => handleNavigation('/images')}>
            <FaImages className={styles.icon} />
            <div className={styles.title}>アルバム</div>
          </button>
          {isAdmin && (
            <button onClick={() => handleNavigation('/gift')}>
              <FaGift className={styles.icon} />
              <div className={styles.title}>ご祝儀</div>
            </button>
          )}
          <button className={styles.btnLogOut} onClick={() => {
            closeMenu();
            props.logout();
          }}>
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
  );
}