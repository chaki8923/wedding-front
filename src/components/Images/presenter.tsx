import { GetImagesQuery } from '@/graphql/generated/graphql';
import { NextRouter } from 'next/router';
import React from 'react';

type Props = {
  data: GetImagesQuery["getImages"];
  router: NextRouter;
};

export function Presenter(props: Props) {

  return (
    <div className="relative p-2 w-full flex flex-col justify-center font-serif items-center bg-center pt-24 pb-5">
      <div className="w-5/12">
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-2 auto-rows-[1px]">
          {props.data.map(({ id, file_url, comment }) => (
            <div
              key={id}
              className="relative"
              style={{ gridRowEnd: `span ${Math.floor(Math.random() * 50) + 20}` }}
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
    </div>
  );
}
