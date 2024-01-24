import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { BookMarked } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { createAnCampaign } from '@/api/campaigns/create-an-campaign'
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

const createNewCampaignFormSchema = z.object({
  name: z.string().min(6),
  dungeonMasterDisplayName: z.string().min(6),
})

type CreateNewCampaignForm = z.infer<typeof createNewCampaignFormSchema>

export function NewCampaign() {
  const navigate = useNavigate()
  const { mutateAsync: createAnCampaignFn } = useMutation({
    mutationFn: createAnCampaign,
  })
  const form = useForm<CreateNewCampaignForm>({
    resolver: zodResolver(createNewCampaignFormSchema),
    defaultValues: { name: '', dungeonMasterDisplayName: 'Mestre' },
  })

  function createNewCampaign() {
    navigate('/')
  }

  async function handleSignIn(data: CreateNewCampaignForm) {
    try {
      await createAnCampaignFn({
        name: data.name,
        dungeonMasterDisplayName: data.dungeonMasterDisplayName,
      })

      toast.success('Campanha criada com sucesso.')
      // navigate('/')
    } catch (error) {
      toast.error('Erro ao criar a campanha.')
    }
  }

  return (
    <>
      <Helmet title="Nova campanha" />
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <h1 className="text-2xl font-bold tracking-tight">
            Criar nova campanha
          </h1>
          <p className="text-center text-xs md:hidden">
            Para uma melhor experiência como mestre, recomendamos o uso de um
            computador, tablet ou similares.
          </p>
          <Button className="w-fit gap-3" onClick={createNewCampaign}>
            <BookMarked />
            Listar campanhas
          </Button>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignIn)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da campanha</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="O massacre dos gnomos de jardim"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dungeonMasterDisplayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu nome de mestre</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Como vai aparecer seu nome na campanha?"
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
              Criar campanha
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
