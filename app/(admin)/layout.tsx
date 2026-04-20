import Image from 'next/image'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ── Admin header ── */}
      <header className="bg-[#2E2567] px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-5xl flex items-center gap-3">
          <Image
            src="/icons/cae logo.webp"
            alt="Career Ambition Education logo"
            width={36}
            height={36}
            className="h-9 w-9 object-contain shrink-0"
            priority
          />
          <div className="min-w-0">
            <p className="font-bold text-white text-sm sm:text-base leading-tight truncate">
              Career Ambition Education
            </p>
            <span className="inline-block bg-white/15 text-white/80 text-[10px] font-semibold px-2 py-0.5 rounded-full leading-none mt-0.5">
              Admin Panel
            </span>
          </div>
        </div>
      </header>

      {/* ── Page content ── */}
      <main className="flex-1">
        {children}
      </main>

    </div>
  )
}
