'use client'

import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { JournalEntry } from '@prisma/client'

import { updateEntry } from '@/utils/api'

const Editor = ({ entry }: { entry: JournalEntry }) => {
  const [value, setValue] = useState(entry.content)
  const [isSaving, setIsSaving] = useState(false)

  useAutosave({
    data: value,
    onSave: async (_value) => {
      if (_value === entry.content) return

      setIsSaving(true)

      await updateEntry(entry.id, _value)

      setIsSaving(false)
    },
  })

  return (
    <div className="w-full h-full">
      {isSaving && <div>...saving</div>}
      <textarea
        className="w-full h-full p-8 text-xl outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
    </div>
  )
}

export default Editor
