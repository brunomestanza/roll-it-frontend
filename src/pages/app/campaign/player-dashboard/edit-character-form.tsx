import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Pencil } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { editCharacter } from '@/api/characters/edit-character'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
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

const editCharacterSchema = z.object({
  name: z.string().min(6, 'Nome deve ter no mínimo 6 caracteres.'),
  difficultToHit: z
    .number()
    .min(1, 'Dificuldade de acerto deve ser no mínimo 1'),
  initiativeBonus: z.number(),
  actualLifePoints: z.number(),
  maxLifePoints: z.number(),
})

type EditCharacterForm = z.infer<typeof editCharacterSchema>

interface EditCharacterFormProps {
  name: string
  campaignId: string
  characterId: string
  difficultToHit: number
  initiativeBonus: number
  actualLifePoints: number
  maxLifePoints: number
}

export function EditCharacterForm({
  name,
  difficultToHit,
  initiativeBonus,
  actualLifePoints,
  maxLifePoints,
  campaignId,
  characterId,
}: EditCharacterFormProps) {
  const queryClient = useQueryClient()
  const { mutateAsync: editCharacterFn } = useMutation({
    mutationFn: editCharacter,
    onSuccess(
      _,
      {
        campaignId: cachedCampaignId,
        actualLifePoints: cachedActualLifePoints,
        maxLifePoints: cachedMaxLifePoints,
        initiativeBonus: cachedInitiativeBonus,
        difficultToHit: cachedDificultToHit,
        name: cachedName,
      },
    ) {
      // TODO: Type cache
      queryClient.setQueryData(['character', cachedCampaignId], {
        campaignId: cachedCampaignId,
        difficultToHit: cachedDificultToHit,
        initiativeBonus: cachedInitiativeBonus,
        maxLifePoints: cachedMaxLifePoints,
        actualLifePoints: cachedActualLifePoints,
        name: cachedName,
        id: characterId,
      })
    },
  })

  const form = useForm<EditCharacterForm>({
    resolver: zodResolver(editCharacterSchema),
    defaultValues: {
      difficultToHit,
      initiativeBonus,
      actualLifePoints,
      maxLifePoints,
      name,
    },
  })

  async function handleEditCharacter(data: EditCharacterForm) {
    try {
      await editCharacterFn({
        campaignId,
        difficultToHit: data.difficultToHit,
        initiativeBonus: data.initiativeBonus,
        actualLifePoints: data.actualLifePoints,
        maxLifePoints: data.maxLifePoints,
        name: data.name,
        characterId,
      })

      toast.success('Personagem editado com sucesso.')
    } catch (error) {
      const formattedError = showError({
        error,
        genericErrorMessage: 'Erro ao editar personagem.',
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
    <Drawer>
      <div className="ml-auto">
        <DrawerTrigger asChild>
          <Button className="flex gap-3">
            Editar <Pencil className="h-4 w-4" />
          </Button>
        </DrawerTrigger>
      </div>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edição de personagem</DrawerTitle>
          <DrawerDescription>
            Todas as informações do seu personagem podem ser editadas aqui.
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEditCharacter)}
            className="space-y-4 p-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira o nome do personagem"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxLifePoints"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pontos de vida máximos</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Insira o valor dos pontos de vida máximos"
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
              name="actualLifePoints"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pontos de vida atuais</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Insira o valor dos pontos de vida atuais"
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
                  <FormLabel>Bônus de iniciativa</FormLabel>
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
            <DrawerFooter>
              <Button type="submit">Confirmar alterações</Button>
              <DrawerClose asChild>
                <Button variant="destructive">Cancelar alterações</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}
