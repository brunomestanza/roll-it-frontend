import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { addPlayerToCampaign } from '@/api/players/add-player-to-campaign'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { showError } from '@/utils/show-error'

interface AddPlayerToCampaignFormProps {
  campaignId: string
}

const addPlayerToCampaignSchema = z.object({
  email: z.string().email(),
})

type AddPlayerToCampaignForm = z.infer<typeof addPlayerToCampaignSchema>

export function AddPlayerToCampaignForm({
  campaignId,
}: AddPlayerToCampaignFormProps) {
  const { mutateAsync: addPlayerToCampaignFn } = useMutation({
    mutationFn: addPlayerToCampaign,
  })

  const form = useForm<AddPlayerToCampaignForm>({
    resolver: zodResolver(addPlayerToCampaignSchema),
    defaultValues: { email: '' },
  })

  async function handleSignUp(data: AddPlayerToCampaignForm) {
    try {
      await addPlayerToCampaignFn({
        playerEmail: data.email,
        campaignId,
      })

      toast.success('Jogador adicionado com sucesso.')
    } catch (error) {
      console.log(error)
      const formattedError = showError({
        error,
        genericErrorMessage: 'Erro ao adicionar jogador',
      })

      if (formattedError) {
        form.setError(formattedError.field, {
          type: 'custom',
          message: formattedError.message,
        })
      }
    }
  }

  return (
    <>
      <h3 className="mb-4 font-bold text-primary">Adicionar novo jogador</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira o email do novo jogador"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="w-full"
            type="submit"
          >
            Adicionar jogador
          </Button>
        </form>
      </Form>
    </>
  )
}
