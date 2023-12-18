import { GetStaticPaths, GetStaticProps } from 'next'
import { Container, UserHeader } from './styles'
import { Avatar, Heading, Text } from '@ignite-ui/react'
import { prisma } from '@/lib/prisma'

interface ScheduleProps {
  user: {
    name: string
    bio: string
    avatarUrl: string
  }
}

export default function Schedule({ user }: ScheduleProps) {
  return (
    <Container>
      <UserHeader>
        <Avatar src={user.avatarUrl} />
        <Heading>{user.name}</Heading>
        <Text>{user.bio}</Text>
      </UserHeader>
    </Container>
  )
}

// Essa função é necessária pois o getStaticProps é dinamico (contém props) e é usada para carregar do banco quando não tiver os dados
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

// Essa função será responsável por deixar essa página estática, é executado do lado do servidor
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: { name: user.name, bio: user.bio, avatarUrl: user.avatar_url },
    },
    revalidate: 60 * 60 * 24, // Essa página vai atualizar 1 vez por dia, por conta dessa função getStaticProps e não sempre
  }
}
