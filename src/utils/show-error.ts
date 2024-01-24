import { AxiosError } from 'axios'
import { toast } from 'sonner'

interface ShowErrorProps {
  error: unknown
  genericErrorMessage: string
}

export function showError({ error, genericErrorMessage }: ShowErrorProps) {
  if (
    error instanceof AxiosError &&
    error.response?.data.field &&
    error.response?.data.message
  ) {
    const field = error.response.data.field
    const message = error.response.data.message

    if (field) {
      return { field, message }
    } else {
      toast.error(message)
    }
  } else {
    toast.error(genericErrorMessage)
  }

  return null
}
