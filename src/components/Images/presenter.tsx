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
    <div className="relative flex flex-col justify-center items-center pt-24 p-4">
      <div className="grid grid-cols-[repeat(2,_minmax(200px,_1fr))] gap-2 auto-rows-[1px] sm:grid-cols-[repeat(2,_minmax(200px,_1fr))] xl:grid-cols-[repeat(3,_minmax(400px,_1fr))]">
        {props.data.map(({ id, file_url, comment }, index) => (
          <div
            key={id}
            className="relative"
            style={{ gridRowEnd: `span ${randomHeights[index]}` }}
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
