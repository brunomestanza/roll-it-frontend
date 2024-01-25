import { api } from '@/lib/axios'

export interface CreateAccountBody {
  name: string
  email: string
  password: string
}

interface CreateACcountResponse {
  accessToken: string
}

export async function createAccount({
  name,
  email,
  password,
}: CreateAccountBody) {
  const response = await api.post<CreateACcountResponse>('/players', {
    name,
    email,
    password,
  })

  const accessToken = `Bearer ${response.data.accessToken}`

  localStorage.setItem('auth', accessToken)
  api.defaults.headers.Authorization = `Bearer ${accessToken}`
}
