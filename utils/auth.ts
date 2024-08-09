import { Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { prisma } from './db'

export interface getUserByClerkIdOptions {
  select?: Prisma.UserSelect<DefaultArgs>
  include?: Prisma.UserInclude<DefaultArgs>
}

export const getUserByClerkId = async ({
  select = {},
  include = {},
}: getUserByClerkIdOptions) => {
  const { userId } = await auth()

  if (!userId) {
    redirect('/login')
  }

  const options: getUserByClerkIdOptions = {}

  if (Object.keys(select).length > 0) {
    options['select'] = select
  } else if (Object.keys(include).length > 0) {
    options['include'] = include
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { clearkId: userId },
    ...options,
  })

  return user
}
