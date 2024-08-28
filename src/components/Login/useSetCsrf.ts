import { useRouter } from 'next/router';

export const useSetCsrf = () => {
  const router = useRouter();
  const setCsrf = () =>
    // 茶木以外「http://localhost:8081/csrf-cookie」
    fetch(`https://localhost:8080/csrf-cookie`, {
      mode: 'cors',
      credentials: 'include',
    }).catch((error) => {
      console.error('NoToken!!:', error);
      router.push('/');
    });
  
  return { setCsrf };
};
