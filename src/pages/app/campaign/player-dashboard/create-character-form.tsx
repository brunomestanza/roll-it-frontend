import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createCharacter } from '@/api/characters/create-character'
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

interface CreateCharacterFormProps {
  campaignId: string
}

const createCharacterSchema = z.object({
  name: z.string().min(6, 'Nome deve ter no mínimo 6 caracteres.'),
  difficultToHit: z
    .number()
    .min(1, 'Dificuldade de acerto deve ser no mínimo 1'),
  initiativeBonus: z.number(),
  lifePoints: z.number(),
})

type CreateCharacterForm = z.infer<typeof createCharacterSchema>

export function CreateCharacterForm({ campaignId }: CreateCharacterFormProps) {
  const queryClient = useQueryClient()
  const { mutateAsync: createCharacterFn } = useMutation({
    mutationFn: createCharacter,
    onSuccess(
      _,
      { campaignId, difficultToHit, initiativeBonus, lifePoints, name },
    ) {
      // TODO: Type cache
      queryClient.setQueryData(['character', campaignId], {
        campaignId,
        difficultToHit,
        initiativeBonus,
        lifePoints,
        name,
      })
    },
  })

  const form = useForm<CreateCharacterForm>({
    resolver: zodResolver(createCharacterSchema),
    defaultValues: {
      difficultToHit: 10,
      initiativeBonus: 0,
      lifePoints: 0,
      name: '',
    },
  })

  async function handleCreateCharacter(data: CreateCharacterForm) {
    try {
      await createCharacterFn({
        campaignId,
        difficultToHit: data.difficultToHit,
        initiativeBonus: data.initiativeBonus,
        lifePoints: data.lifePoints,
        name: data.name,
      })

      toast.success('Personagem criado com sucesso.')
    } catch (error) {
      const formattedError = showError({
        error,
        genericErrorMessage: 'Erro ao criar personagem',
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
        <form
          onSubmit={form.handleSubmit(handleCreateCharacter)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Insira o nome do personagem" {...field} />
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
            Criar personagem
          </Button>
        </form>
      </Form>
    </>
  )
}
