import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const user = await currentUser()
  const match = await prisma.user.findUnique({
    where: {
      clearkId: user?.id,
    },
  })

  if (!match) {
    await prisma.user.create({
      data: {
        email: user?.emailAddresses[0].emailAddress as string,
        clearkId: user?.id as string,
      },
    })
  }

  redirect('/journal')
}

const NewUserPage = async () => {
  await createNewUser()
  return <div>...loading</div>
}

export default NewUserPage
