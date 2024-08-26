import { useRouter } from 'next/router';

export const useSetCsrf = () => {
    const router = useRouter();
    const setCsrf = () =>
        fetch(`http://localhost:8081/csrf-cookie`, {
            mode: 'cors',
            credentials: 'include',
        }).catch((error) => {
            console.error('NoToken!!:', error);
            router.push('/');
        });

    return { setCsrf };
};