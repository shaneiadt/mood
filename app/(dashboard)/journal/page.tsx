import Link from 'next/link'

import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'

const getData = async () => {
  const { id } = await getUserByClerkId({})

  return await prisma.journalEntry.findMany({
    where: { userId: id },
    orderBy: { createdAt: 'desc' },
  })
}

const JournalPage = async () => {
  const entries = await getData()

  return (
    <div className="p-10">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
