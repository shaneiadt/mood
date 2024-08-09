import { NextResponse } from 'next/server'

import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'

export const POST = async (_req: Request) => {
  const user = await getUserByClerkId({})

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day!',
    },
  })

  revalidatePath('/journal')

  return NextResponse.json({ data: entry })
}
