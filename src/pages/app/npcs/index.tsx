import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { createNpc } from '@/api/npcs/create-npc'
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

const createNpcSchema = z.object({
  name: z.string().min(6, 'Nome deve ter no mínimo 6 caracteres.'),
  difficultToHit: z
    .number()
    .min(1, 'Dificuldade de acerto deve ser no mínimo 1'),
  initiativeBonus: z.number(),
  lifePoints: z.number(),
})

type CreateNpcForm = z.infer<typeof createNpcSchema>

export function Npcs() {
  const { campaignId } = useParams()
  // const queryClient = useQueryClient()
  const { mutateAsync: createNpcFn } = useMutation({
    mutationFn: createNpc,
  })

  const form = useForm<CreateNpcForm>({
    resolver: zodResolver(createNpcSchema),
    defaultValues: {
      difficultToHit: 10,
      initiativeBonus: 0,
      lifePoints: 0,
      name: '',
    },
  })

  async function handleCreateNpc(data: CreateNpcForm) {
    try {
      await createNpcFn({
        campaignId,
        difficultToHit: data.difficultToHit,
        initiativeBonus: data.initiativeBonus,
        lifePoints: data.lifePoints,
        name: data.name,
      })

      toast.success('NPC criado com sucesso.')
      form.reset({
        difficultToHit: 10,
        initiativeBonus: 0,
        lifePoints: 0,
        name: '',
      })
    } catch (error) {
      const formattedError = showError({
        error,
        genericErrorMessage: 'Erro ao criar NPC.',
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
      <Helmet title="NPCs" />
      <div className="flex flex-col gap-10">
        <h3 className="mb-4 font-bold text-primary">Adicionar novo NPC</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateNpc)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o nome do NPC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lifePoints"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pontos de vida</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Insira o valor dos pontos de vida"
                      {...field}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="initiativeBonus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bônus de iniciative</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Insira o valor númerico do bônus de iniciativa"
                      {...field}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="difficultToHit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dificuldade de acerto</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Insira o valor da dificuldade de acerto"
                      {...field}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
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
              Criar Novo NPC
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
