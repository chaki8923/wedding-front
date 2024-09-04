import { useUserState } from '@/atoms/userAtom'
import { useSetCsrf } from '@/components/Login/useSetCsrf'
import { Login } from '@/types/form'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'

export const useLogin = () => {
  const { setUser } = useUserState()
  const { setCsrf } = useSetCsrf()
  const router = useRouter()
  const params = useMemo(() => new URLSearchParams(), [])
  const [cookies, setUseCookies] = useCookies(['_csrf'])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setUseCookies('_csrf', cookies._csrf)
  }, [cookies._csrf, setUseCookies])

  const login = useCallback(
    async (Inputs: Login) => {
      setIsSubmitting(true)
      await setCsrf()
      params.append('email', Inputs.email)
      params.append('password', Inputs.password)
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        headers: {
          'X-CSRF-TOKEN': cookies._csrf,
        },
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: params
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data)
          setIsSubmitting(false)
          document.cookie = `weddingUserId=${data.userId}; path=/; max-age=2592000; SameSite=Strict; Secure`
          router.push('/timeLine')
        })
        .catch((error) => {
          setUser(null)
          setIsSubmitting(false)
          router.push('/')
        })
    },
    [cookies._csrf, params, router, setCsrf, setUser]
  )

  return { login, isSubmitting }
}
