import { redirect } from 'next/navigation'

import { prisma } from '@/utils/db'
import { getUserByClerkId } from '@/utils/auth'
import Editor from '@/components/Editor'

const getData = async (id: string) => {
  const { id: userId } = await getUserByClerkId({})

  const entry = await prisma.journalEntry.findUnique({
    where: { userId_id: { userId, id } },
  })

  if (!entry) {
    redirect('/journal')
  }

  return entry
}

const JournalPage = async ({ params: { id } }: { params: { id: string } }) => {
  const entry = await getData(id)

  const analysisData = [
    {
      name: 'Summary',
      value: '',
    },
    {
      name: 'Subject',
      value: '',
    },
    {
      name: 'Mood',
      value: '',
    },
    {
      name: 'Negative',
      value: 'false',
    },
  ]

  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/10">
        <div className="bg-blue-300 px-6 py-10">
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map(({ name, value }) => (
              <li
                key={name}
                className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10"
              >
                <span className="text-lg font-semibold">{name}</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default JournalPage
