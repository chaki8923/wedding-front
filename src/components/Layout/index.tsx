import { Presenter } from '@/components/Layout/presenter';
import useLogout from '@/components/Layout/useLogout';
import type { ReactNode } from 'react';
import { useRouter } from 'next/router';
type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const { logout } = useLogout();
  const router = useRouter();

  return (
    <>
      <Presenter logout={logout} router={router}/>
      {children}
    </>
  );
}
