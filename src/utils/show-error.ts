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

// This function can recieve an error in the following ways:
// 1 -> An object with the error message, and an form field when this occur
// 2 -> An array of objects, each one with the error message and the form field
// 3 -> Null, send in e2e tests for the genericErrorMessage errors

export function showError({ error, genericErrorMessage }: ShowErrorProps) {
  try {
    if (error instanceof AxiosError && error.response?.data.message) {
      const field = error.response.data.field
      const message = error.response.data.message

      if (field) {
        return { field, message }
      } else {
        toast.error(message)
      }
    } else if (error instanceof AxiosError && error.response?.data.errors) {
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
  } catch (error) {
    toast.error(genericErrorMessage)
  }

  return null
}
