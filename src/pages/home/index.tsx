import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './styles'
import Image from 'next/image'

import previewImage from '../../assets/ap-preview.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'

// Os componentes Heading e Text vem do UI System
// Os componentes Container, Hero e Preview vem do Stitches, arquivo styles.ts

export default function Home() {
  return (
    <>
      <Container>
        <Hero>
          <Heading size="4xl">Agendamento descomplicado</Heading>
          <Text size="xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>

          <ClaimUsernameForm />
        </Hero>

        <Preview>
          <Image
            src={previewImage}
            height={400}
            quality={100}
            priority
            alt="Imagem de preview"
          />
        </Preview>
      </Container>
    </>
  )
}
