import { Layout } from '@/components/Layout';
import { UploadFile } from '@/components/Upload';
import type { NextPageWithLayout } from '@/pages/_app';
import React from 'react';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <UploadFile />
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
