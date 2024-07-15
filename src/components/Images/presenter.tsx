import styles from './index.module.scss';
import { GetImagesQuery } from '@/graphql/generated/graphql';
import { NextRouter } from 'next/router';

type Props = {
  data: GetImagesQuery;
  router: NextRouter;
};

export function Presenter(props: Props) {
  return (
    <>
      <div className={styles.contentWrapper}>
        {props.data.getImages.map((image) => (
          <div key={image.id}>
            <img src={image.file_url} alt="" />
          </div>
        ))}
      </div>
    </>
  );
}
