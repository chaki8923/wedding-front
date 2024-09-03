import { useUserState } from '@/atoms/userAtom';
import { useSetCsrf } from '@/components/Login/useSetCsrf';
import { SendMail } from '@/types/form';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { toast, Zoom } from 'react-toastify';

export const useMail = () => {
  const { setUser } = useUserState();
  const { setCsrf } = useSetCsrf();
  const router = useRouter();
  const params = useMemo(() => new URLSearchParams(), []);
  const [cookies, setUseCookies] = useCookies(['_csrf']);
  
  useEffect(() => {
    setUseCookies('_csrf', cookies._csrf);
  }, [cookies._csrf, setUseCookies]);
  
  const sendMail = useCallback(
    async (Inputs: SendMail) => {
      await setCsrf();

      params.append('subject', Inputs.subject);
      params.append('to', Inputs.to);
      params.append('from', Inputs.from);
      params.append('body', Inputs.body);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/mail`, {
        headers: {
          'X-CSRF-TOKEN': cookies._csrf,
        },
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: params,
      })
        .then((response) => response.json())
        .then((data) => {
          toast.success('招待状を送信しました。', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
            });
          setUser(data);
          router.push('/timeLine');
        })
        .catch((error) => {
          console.error('メールエラー:', error);
          toast.error('招待状送信に失敗しました。', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
          });
          setUser(null);
          router.push('/');
        });
    },
    [cookies._csrf, params, router, setCsrf, setUser],
  );

  return { sendMail };
};