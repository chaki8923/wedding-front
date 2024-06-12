import '@/styles/globals.scss';
import { NextPage } from 'next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { RecoilRoot } from 'recoil';
import ApolloClientProvider from '../lib/application';

const queryClient = new QueryClient();
export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);  
  return getLayout(
    <CookiesProvider>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ApolloClientProvider children={undefined}>
            <Component {...pageProps} />
          </ApolloClientProvider>
        </QueryClientProvider>
      </RecoilRoot>
      ,
    </CookiesProvider>,
  );
}
