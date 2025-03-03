import { useFormStatus } from 'react-dom'
import { FaPaperPlane } from 'react-icons/fa6'

export default function SubmitBtn() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className="group flex h-12 w-32 items-center justify-center gap-2 rounded-full bg-slate-600 text-white transition-all outline-none hover:scale-110 hover:bg-slate-900 focus:scale-110 active:scale-105 disabled:scale-100 disabled:bg-gray-900/65 dark:bg-white/10"
      disabled={pending}
    >
      {pending ? (
        <div className="size-5 animate-spin rounded-full border-b-2 border-white"></div>
      ) : (
        <>
          Submit
          <FaPaperPlane className="text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
        </>
      )}
    </button>
  )
}
