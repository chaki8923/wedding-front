import React, { useState, useEffect } from 'react';
import styles from './Slideshow.module.scss';
import { GetImagesQuery } from '@/graphql/generated/graphql';

type SlideshowProps = {
  images: GetImagesQuery['getImages'];
  autoPlay?: boolean;
  autoPlayInterval?: number;
};

export const Slideshow: React.FC<SlideshowProps> = ({
  images,
  autoPlay = true,
  autoPlayInterval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(nextImage, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval]);

  return (
    <div className={styles.slideshowContainer}>
      <div className={styles.mainImageWrapper}>
        <img
          src={images[currentIndex].file_url}
          alt={images[currentIndex].comment}
          className={styles.mainImage}
        />
      </div>

      <div className={styles.thumbnailContainer}>
        <button className={styles.prevButton} onClick={prevImage}>
          &#10094;
        </button>
        <div className={styles.thumbnails}>
          {images.map((image, index) => (
            <img
              key={image.id}
              src={image.file_url}
              alt={image.comment}
              className={`${styles.thumbnail} ${
                index === currentIndex ? styles.activeThumbnail : ''
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
        <button className={styles.nextButton} onClick={nextImage}>
          &#10095;
        </button>
      </div>
    </div>
  );
};
