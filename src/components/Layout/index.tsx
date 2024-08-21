import { Presenter } from '@/components/Layout/presenter';
import useLogout from '@/components/Layout/useLogout';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
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
