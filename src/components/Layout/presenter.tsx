import styles from './index.module.scss';
import { NextRouter } from 'next/router';

type Props = {
  logout: () => void;
  router: NextRouter
};

export function Presenter(props: Props) {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <button className={styles.btnLogOut} onClick={() => props.logout()}>
            Logout
          </button>
          <button onClick={() => props.router.push('/invitee')}>招待者</button>
          <button onClick={() => props.router.push('/invitation')}>招待状</button>
          <button onClick={() => props.router.push('/timeLine')}>投稿</button>
          <button onClick={() => props.router.push('/send_mail')}>メール送信</button>
          <button onClick={() => props.router.push('/upload')}>画像アップロード</button>
        </nav>
      </header>
    </>
  );
}
