import { useFormStatus } from 'react-dom'
import { FaPaperPlane } from 'react-icons/fa6'

export default function SubmitBtn() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className="group flex h-12 w-32 cursor-pointer items-center justify-center gap-2 rounded-full bg-slate-600 text-white transition-all outline-none hover:scale-110 hover:bg-slate-700 focus:scale-110 active:scale-105 disabled:bg-slate-700 dark:bg-slate-800 hover:dark:bg-slate-700 disabled:dark:bg-slate-700"
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
