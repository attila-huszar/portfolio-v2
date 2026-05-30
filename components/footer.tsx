import { RiCopyleftFill } from 'react-icons/ri'

export default function Footer() {
  return (
    <footer className="m-auto mb-4 max-w-212 px-18 text-xs text-gray-400">
      <div className="mb-2 flex items-center justify-center gap-1">
        <p>Attila Huszár</p>
        <RiCopyleftFill />
        <p>{new Date().getFullYear()}</p>
      </div>
      <p className="text-center text-balance">
        <span className="font-semibold">About this website:</span> built with
        React & Next.js (App Router & Server Actions), TypeScript, Tailwind CSS,
        Framer Motion & Resend
      </p>
    </footer>
  )
}
