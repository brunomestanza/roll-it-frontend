import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { createAccount } from '@/api/players/create-account'
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

const signUpForm = z.object({
  name: z
    .string({
      required_error: 'Obrigatório.',
    })
    .min(6, 'Nome deve ter no mínimo 6 caracteres'),
  email: z
    .string({ required_error: 'Obrigatório.' })
    .email('Formato de email inválido.'),
  password: z
    .string({
      required_error: 'Obrigatório.',
    })
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()
  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
    defaultValues: { name: '', email: '', password: '' },
  })

  const { mutateAsync: createAccountFn } = useMutation({
    mutationFn: createAccount,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      await createAccountFn({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      toast.success('Jogador cadastrado com sucesso.')
      navigate('/')
    } catch (error) {
      const formattedError = showError({
        error,
        genericErrorMessage: 'Erro ao cadastrar jogador',
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
      <Helmet title="Cadastro" />
      <div className="md:p-8 flex flex-col mb-8 md:mb-0">
        <Button
          variant="ghost"
          asChild
          className="my-4 md:my-0 md:absolute md:right-8 md:top-8"
        >
          <Link to="/sign-in" className="flex gap-2">
            <p>Já possui cadastro?</p>
            <span className="text-primary">Fazer login</span>
          </Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold -tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um jogador e crie suas histórias!
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignUp)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome de jogador</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Insira seu nome dentro de jogo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="just.example@mail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sua senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Insira sua senha"
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
                Finalizar cadastro
              </Button>

              <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                Ao continuar. você concorda com nossos{' '}
                <a href="" className="underline underline-offset-4">
                  Termos de serviço
                </a>{' '}
                e{' '}
                <a href="" className="underline underline-offset-4">
                  Políticas de privacidade
                </a>
                .
              </p>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}
