import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { BookMarked } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { createAnCampaign } from '@/api/campaigns/create-an-campaign'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { showError } from '@/utils/show-error'

const createNewCampaignFormSchema = z.object({
  name: z.string().min(6, 'O nome deve ter no mínimo 6 caracteres.'),
  description: z
    .string()
    .min(6, 'Se informada, descrição deve ter no mínimo 6 caracteres.')
    .optional(),
  tags: z.array(z.object({ name: z.string() })),
})

type CreateNewCampaignForm = z.infer<typeof createNewCampaignFormSchema>

export function NewCampaign() {
  const [newTag, setNewTag] = useState('')
  const navigate = useNavigate()
  const { mutateAsync: createAnCampaignFn } = useMutation({
    mutationFn: createAnCampaign,
  })
  const form = useForm<CreateNewCampaignForm>({
    resolver: zodResolver(createNewCampaignFormSchema),
    defaultValues: { name: '', tags: [] },
  })
  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'tags',
  })

  function createNewCampaign() {
    navigate('/')
  }

  function handleAddNewTag() {
    if (newTag !== '') {
      append({ name: newTag }, { shouldFocus: false })
    }
    setNewTag('')
  }

  async function handleSignIn(data: CreateNewCampaignForm) {
    try {
      const formattedTags = data.tags.map((tag) => tag.name)

      const { slug } = await createAnCampaignFn({
        name: data.name,
        description: data.description,
        tags: formattedTags,
      })

      toast.success('Campanha criada com sucesso.')
      navigate(`/campaign/${slug}`)
    } catch (error) {
      const formattedError = showError({
        error,
        genericErrorMessage: 'Erro ao criar a campanha.',
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insira a descrição da sua campanha</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Sugerimos um pequeno resumo para situar os jogadores"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A descrição da campanha não é obrigatória
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Insira as tags da campanha</FormLabel>
              <FormControl>
                <div className="flex gap-4">
                  <Input
                    type="text"
                    value={newTag}
                    placeholder="Sistema de jogo, tópicos abordados e afins são boas pedidas"
                    onChange={(e) => setNewTag(e.target.value)}
                  />
                  <Button
                    type="button"
                    onClick={handleAddNewTag}
                    variant="secondary"
                  >
                    Adicionar
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                Não é obrigatório que haja nenhuma tag
              </FormDescription>
              <FormMessage />
            </FormItem>

            {fields.map((field, index) => (
              <Input key={field.id} {...form.register(`tags.${index}.name`)} />
            ))}

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
