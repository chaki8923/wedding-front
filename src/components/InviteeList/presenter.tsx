import styles from './index.module.scss';
import { GetInviteeQuery } from '@/graphql/generated/graphql';
import { NextRouter } from 'next/router';

type Props = {
  data: GetInviteeQuery;
  router: NextRouter;
};

export function Presenter(props: Props) {
  return (
    <>
      <div className={styles.contentWrapper}>
        {props.data.getInvitee.map((invitee) => (
          <div key={invitee.id}>
            <img src={invitee.file_url} alt="" />
          </div>
        ))}
      </div>
    </>
  );
}
