import { Button, TextInput } from '@ignite-ui/react'
import { Form } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Para instalar -> npm i react-hook-form @hookform/resolvers zod

const claimUsernameFormSchema = z.object({
  username: z.string(),
}) // Schema do zod para fazer as validações

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema> // Transformando o tipo

export function ClaimUsernameForm() {
  const { register, handleSubmit } = useForm<ClaimUsernameFormData>() // importação do react useForm

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data)
  }

  return (
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        size="sm"
        prefix="ignite.com/"
        placeholder="seu-usuario"
        {...register('username')} // Para que de fato retorne o campo
        crossOrigin
      />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </Form>
  )
}
