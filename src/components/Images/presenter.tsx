import React, { useState } from 'react';
import styles from './index.module.scss';
import { GetImagesQuery } from '@/graphql/generated/graphql';
import { NextRouter } from 'next/router';
import { Slideshow } from './Slideshow';

type Props = {
  data: GetImagesQuery;
  router: NextRouter;
};

export function Presenter(props: Props) {
  const [isSlideshow, setIsSlideshow] = useState(true);

  return (
    <div className={styles.fullPageWrapper}>
      <div className={styles.viewToggle}>
        <button onClick={() => setIsSlideshow(!isSlideshow)}>
          {isSlideshow ? 'Show Grid' : 'Show Slideshow'}
        </button>
      </div>

      {isSlideshow ? (
        <Slideshow images={props.data.getImages} autoPlay={true} autoPlayInterval={5000} />
      ) : (
        <div className={styles.contentWrapper}>
          {props.data.getImages.map((image) => (
            <div key={image.id} className={styles.imageWrapper}>
              <img src={image.file_url} alt={image.comment} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
