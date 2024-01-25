import { AxiosError } from 'axios'
import { toast } from 'sonner'

interface ApiError {
  field: string
  message: string
}

interface ShowErrorProps {
  error: unknown
  genericErrorMessage: string
}

// The backend can return errors in two ways
export function showError({ error, genericErrorMessage }: ShowErrorProps) {
  // An error message with the field where the error occour
  if (error instanceof AxiosError && error.response?.data.message) {
    const field = error.response.data.field
    const message = error.response.data.message

    if (field) {
      return { field, message }
    } else {
      toast.error(message)
    }
  } else if (error instanceof AxiosError && error.response?.data.errors) {
    // An array of error messages with the field where the error occour
    error.response?.data.errors.forEach((apiError: ApiError) => {
      const field = apiError.field
      const message = apiError.message

      if (field) {
        return { field, message }
      } else {
        toast.error(message)
      }
    })
  } else {
    toast.error(genericErrorMessage)
  }

  return null
}
