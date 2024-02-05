import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
  password: string
}

export interface SignInResponse {
  accessToken: string
}

export async function signIn({ email, password }: SignInBody) {
  const response = await api.post<SignInResponse>('/sessions', {
    email,
    password,
  })

  const accessToken = `Bearer ${response.data.accessToken}`

  localStorage.setItem('auth', accessToken)
  api.defaults.headers.Authorization = `Bearer ${accessToken}`
}
