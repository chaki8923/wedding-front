import { Login } from '@/types/form';
import { useRouter } from 'next/router';
import { useMutation, useApolloClient } from '@apollo/client';
import { USER_LOGIN } from '@/graphql/document';
import { useUserState } from '@/atoms/userAtom';
import { useSetCsrf } from '@/components/Login/useSetCsrf';
import { useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const useLogin = () => {
  const { setUser } = useUserState();
  const { setCsrf } = useSetCsrf();
  const router = useRouter();
  const [cookies, setUseCookies] = useCookies(['_csrf']);

  useEffect(() => {
    setUseCookies('_csrf', cookies._csrf);
  }, [cookies._csrf, setUseCookies]);
  
  const [loginMulation, { loading, error }] = useMutation(USER_LOGIN, {
    context: {
      fetchOptions: {
        credentials: 'include', // クッキーを含めるための設定
      },
    },
    onCompleted: (data: any) => {
      setUser(data.login);
      router.push('/timeLine');
    },
    onError: (error: Error) =>{
      console.error(`error: ${error.message}`)
      setUser(null);
      router.push('/');

    } 
  });

  const userLogin = useCallback(
    async (inputs: Login) => {
      await setCsrf();

      loginMulation({
        variables: {
          email: inputs.email,
          password: inputs.password,
          token: cookies._csrf,
        },
         // クッキーを含むようにcredentialsオプションを設定
         context: {
          credentials: 'include',
          headers: {
            'X-CSRF-TOKEN': cookies._csrf,
          },
        },
      });
    },
    [cookies._csrf, loginMulation, setCsrf],
  );
  return { userLogin, loading, error };
 
};


// import { useUserState } from '@/atoms/userAtom';
// import { useSetCsrf } from '@/components/Login/useSetCsrf';
// import { Login } from '@/types/form';
// import { useRouter } from 'next/router';
// import { useCallback, useEffect, useMemo } from 'react';
// import { useCookies } from 'react-cookie';

// export const useLogin = () => {
//   const { setUser } = useUserState();
//   const { setCsrf } = useSetCsrf();
//   const router = useRouter();
//   const params = useMemo(() => new URLSearchParams(), []);
//   const [cookies, setUseCookies] = useCookies(['_csrf']);

//   useEffect(() => {
//     setUseCookies('_csrf', cookies._csrf);
//   }, [cookies._csrf, setUseCookies]);

//   const login = useCallback(
//     async (Inputs: Login) => {
//       await setCsrf();

//       params.append('email', Inputs.email);
//       params.append('password', Inputs.password);
//       fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
//         headers: {
//           'X-CSRF-TOKEN': cookies._csrf,
//         },
//         method: 'POST',
//         mode: 'cors',
//         credentials: 'include',
//         body: params,
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setUser(data);
//           router.push('/timeLine');
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//           setUser(null);
//           router.push('/');
//         });
//     },
//     [cookies._csrf, params, router, setCsrf, setUser],
//   );

//   return { login };
// };