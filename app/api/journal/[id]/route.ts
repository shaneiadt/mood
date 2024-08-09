import { NextResponse } from 'next/server'

import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

interface PatchParams {
  params: {
    id: string
  }
}

export const PATCH = async (req: Request, { params: { id } }: PatchParams) => {
  const { content } = await req.json()
  const user = await getUserByClerkId({})
  const updatedEntry = await prisma.journalEntry.update({
    where: { userId_id: { userId: user.id, id } },
    data: {
      content,
    },
  })

  return NextResponse.json({ data: updatedEntry })
}
