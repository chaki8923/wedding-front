import { ImageList } from '@/components/InviteeList';
import { Layout } from '@/components/Layout';
import type { NextPageWithLayout } from '@/pages/_app';
import React from 'react';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <ImageList />
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
