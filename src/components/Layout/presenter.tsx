import styles from './index.module.scss';
import { NextRouter } from 'next/router';
import { FaUsers, FaEnvelope, FaUpload, FaImages, FaThList, FaClock, FaSignOutAlt } from 'react-icons/fa';
import { GiDiamondRing } from 'react-icons/gi';

type Props = {
  logout: () => void;
  router: NextRouter;
};

export function Presenter(props: Props) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <GiDiamondRing className={styles.iconLogo} />
          Wedding Net
        </div>
        <div className={styles.navLinks}>
          <button onClick={() => props.router.push('/invitee')}>
            <FaUsers className={styles.icon} />
            <div className={styles.title}>招待者</div>
          </button>
          <button onClick={() => props.router.push('/invitation')}>
            <FaEnvelope className={styles.icon} />
            <div className={styles.title}>招待状</div>
          </button>
          <button onClick={() => props.router.push('/timeLine')}>
            <FaClock className={styles.icon} />
            <div className={styles.title}>投稿</div>
          </button>
          <button onClick={() => props.router.push('/send_mail')}>
            <FaEnvelope className={styles.icon} />
            <div className={styles.title}>メール送信</div>
          </button>
          <button onClick={() => props.router.push('/upload')}>
            <FaUpload className={styles.icon} />
            <div className={styles.title}>画像アップロード</div>
          </button>
          <button onClick={() => props.router.push('/images')}>
            <FaImages className={styles.icon} />
            <div className={styles.title}>ギャラリー</div>
          </button>
          <button onClick={() => props.router.push('/invitee_list')}>
            <FaThList className={styles.icon} />
            <div className={styles.title}>招待者一覧</div>
          </button>
        </div>
        <button className={styles.btnLogOut} onClick={() => props.logout()}>
          <FaSignOutAlt className={styles.icon} />
          <div className={styles.title}>ログアウト</div>
        </button>
      </nav>
    </header>
  );
}
