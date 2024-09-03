import ApolloClientProvider from '../lib/application';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { RecoilRoot } from 'recoil';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.scss';
import 'flowbite/dist/flowbite.css';


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
        <ApolloClientProvider>
          <ToastContainer/>
          <Component {...pageProps} />
        </ApolloClientProvider>
      </RecoilRoot>
    </CookiesProvider>,
  );
}
