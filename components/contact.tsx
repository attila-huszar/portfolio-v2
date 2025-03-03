'use client'

import { motion } from 'motion/react'
import { toast } from 'react-hot-toast'
import { useSectionInView } from '@/hooks/useSectionInView'
import { sendEmail } from '@/actions/sendEmail'
import SectionHeading from './section-heading'
import SubmitBtn from './submit-btn'

export default function Contact() {
  const { ref } = useSectionInView('#contact')

  return (
    <motion.section
      id="contact"
      ref={ref}
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
        {'Please contact me directly at '}
        <a className="underline" href="mailto:attila.huszar@outlook.com">
          attila.huszar@outlook.com
        </a>
        {' or through this form.'}
      </p>

      <form
        className="mt-10 flex flex-col dark:text-black"
        action={(formData) => {
          sendEmail(formData)
            .then(() => {
              toast.success('Email sent successfully!')
            })
            .catch((error: unknown) => {
              toast.error(
                error instanceof Error
                  ? error.message
                  : 'Unknown error occurred.',
              )
            })
        }}
      >
        <input
          className="borderBlack h-14 rounded-lg px-4 transition-all dark:bg-white/80 dark:outline-none dark:focus:bg-white/100"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
        />
        <textarea
          className="borderBlack my-3 h-52 rounded-lg p-4 transition-all dark:bg-white/80 dark:outline-none dark:focus:bg-white/100"
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
