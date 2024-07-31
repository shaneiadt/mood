import { UserButton } from '@clerk/nextjs'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen relative flex">
      <aside className="bg-gray-800 text-white w-64 h-full">
        <span className="border-black/20 border-b-2 text-2xl p-4 block text-center">
          Mood
        </span>
      </aside>
      <div className="w-screen bg-slate-50">
        <header className="bg-gray-800 text-white w-full h-16 flex items-center justify-between px-4">
          HEADER STUFF
          <div>
            <UserButton />
          </div>
        </header>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
