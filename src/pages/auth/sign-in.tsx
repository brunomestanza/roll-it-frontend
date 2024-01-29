import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/auth/sign-in'
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

const signInForm = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const navigate = useNavigate()
  const { mutateAsync: signInFn } = useMutation({ mutationFn: signIn })

  const form = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
    defaultValues: { email: '', password: '' },
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await signInFn({ email: data.email, password: data.password })

      toast.success('Jogador autenticado com sucesso.')
      navigate('/')
    } catch (error) {
      toast.error('Credenciais inválidas.')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="mb-8 flex flex-col md:mb-0 md:p-8">
        <Button
          variant="ghost"
          asChild
          className="my-4 md:absolute md:right-8 md:top-8 md:my-0"
        >
          <Link to="/sign-up" className="flex gap-2">
            <p>É novo conosco?</p>
            <span className="text-primary">Crie sua conta</span>
          </Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold -tracking-tight">
              Acessar campanhas
            </h1>
            <p className="text-sm text-muted-foreground">
              Continue e crie novas aventuras!
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignIn)}
              className="space-y-4"
            >
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
                Entrar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}
