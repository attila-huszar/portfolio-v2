'use client'

import { motion } from 'motion/react'
import { toast } from 'react-hot-toast'
import { sendEmail } from '@/actions/sendEmail'
import SectionHeading from './section-heading'
import SubmitBtn from './submit-btn'

export default function Contact({ email }: { email: string }) {
  async function handleSubmit(formData: FormData) {
    try {
      const result = await sendEmail(formData)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      toast.success('Email sent successfully!')
    } catch {
      toast.error('Failed to send email, please try again later.')
    }
  }

  return (
    <motion.section
      id="contact"
      className="mb-20 w-[min(100%,38rem)] text-center sm:mb-28"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>Contact me</SectionHeading>

      <p className="-mt-6 text-gray-700 dark:text-white/80">
        {email ? (
          <>
            {'Please contact me directly at '}
            <a className="underline" href={`mailto:${email}`}>
              {email}
            </a>
            {' or through this form.'}
          </>
        ) : (
          'Please contact me through this form.'
        )}
      </p>

      <form
        className="mt-10 flex flex-col dark:text-black"
        action={handleSubmit}
      >
        <input
          className="borderBlack h-14 rounded-lg px-4 transition-all dark:bg-white/80 dark:outline-none dark:focus:bg-white"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
        />
        <textarea
          className="borderBlack my-3 h-52 rounded-lg p-4 transition-all dark:bg-white/80 dark:outline-none dark:focus:bg-white"
          name="message"
          placeholder="Your message"
          required
          maxLength={5000}
        />
        <div className="flex justify-end">
          <SubmitBtn />
        </div>
      </form>
    </motion.section>
  )
}
