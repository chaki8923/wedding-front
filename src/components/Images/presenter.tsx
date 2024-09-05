import { GetImagesQuery } from '@/graphql/generated/graphql';
import { NextRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type Props = {
  data: GetImagesQuery["getImages"];
  router: NextRouter;
};

export function Presenter(props: Props) {

  const [randomHeights, setRandomHeights] = useState<number[]>([]);

  useEffect(() => {
    // クライアントサイドでランダムな高さを生成
    const heights = props.data.map(() => Math.floor(Math.random() * 30) + 20);
    setRandomHeights(heights);
  }, [props.data]);

  return (
    <div className="relative flex flex-col justify-center items-center sm:gap-4 pt-24 p-4">
      <div className="gap-2 sm:grid sm:grid-cols-[repeat(1,_minmax(400px,_1fr))] sm:gap-4 xl:auto-rows-[1px] xl:grid xl:grid-cols-[repeat(3,_minmax(400px,_1fr))]">
        {props.data.map(({ id, file_url, comment }, index) => (
          <div
            key={id}
            className="relative"
            style={{ gridRowEnd: `span ${randomHeights[index]}`, paddingBottom: 8 }}
          >
            <img
              className="h-full w-full object-cover rounded-lg"
              src={file_url}
              alt={comment}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
