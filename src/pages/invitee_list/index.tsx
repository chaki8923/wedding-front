import { InviteeList } from '@/components/InviteeList';
import { Layout } from '@/components/Layout';
import type { NextPageWithLayout } from '@/pages/_app';
import React from 'react';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <InviteeList />
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
