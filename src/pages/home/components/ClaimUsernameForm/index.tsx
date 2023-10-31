import { Button, TextInput, Text } from '@ignite-ui/react'
import { Form, FormAnnotation } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

// Para instalar -> npm i react-hook-form @hookform/resolvers zod

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    }) // Para aceitar só letras e hifen
    .transform((username) => username.toLowerCase()),
}) // Schema do zod para fazer as validações

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema> // Transformando o tipo

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema), // Inserção para validação do schema
  }) // importação do react useForm

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data

    await router.push(`/register?username=${username}`) // Direcionando para a página /register,
    // Importante lembrar que o await serve porque pode demorar a request e o isSubmitting desabilita o botão enquanto isso
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuario"
          {...register('username')} // Campo criado no schema
          crossOrigin
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </Form>

      {/* FormAnnotation -> Componente para mostar o erro na tela */}
      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Digite o nome do usuário desejado.'}
        </Text>
      </FormAnnotation>
      {/* ****************************************************** */}
    </>
  )
}
