import { RiCopyleftFill } from 'react-icons/ri'

export default function Footer() {
  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <small className="mb-2 flex items-center justify-center gap-1 text-xs">
        {'Attila Huszár'}
        <RiCopyleftFill />
        {new Date().getFullYear()}
      </small>
      <p className="text-xs">
        <span className="font-semibold">About this website:</span> built with
        React & Next.js (App Router & Server Actions), TypeScript, Tailwind CSS,
        Framer Motion, React Email & Resend
      </p>
    </footer>
  )
}
