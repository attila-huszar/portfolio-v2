'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { BsChevronCompactRight } from 'react-icons/bs'
import { FaFileArrowDown, FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { useSectionInView } from '@/lib/hooks'
import { useActiveSectionContext } from '@/context/active-section-context'

export default function Intro() {
  const { ref } = useSectionInView('Home', 0.5)
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext()

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] scroll-mt-[100rem] text-center sm:mb-0">
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'tween',
              duration: 0.2,
            }}>
            <Image
              src="/Attila_Huszar_pic_sq.webp"
              alt="Developer portrait"
              width={128}
              height={128}
              priority
              className="h-32 w-32 rounded-full border-[0.25rem] border-white object-cover shadow-xl"
            />
          </motion.div>

          <motion.span
            className="absolute bottom-0 right-0 text-4xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 125,
              delay: 0.1,
              duration: 0.7,
            }}>
            👋
          </motion.span>
        </div>
      </div>

      <motion.h1
        className="my-10 text-balance px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}>
        <span className="font-bold">Greetings! I&apos;m Attila, </span>
        enthusiastic <span className="font-bold">front-end developer </span>
        specializing in crafting engaging and performant websites & apps,
        primarily with <span className="font-bold">React </span>(Next.js).
      </motion.h1>

      <motion.div
        className="flex flex-col items-center justify-center gap-4 px-4 text-lg font-medium sm:flex-row"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}>
        <Link
          href="#contact"
          className="group flex items-center gap-1 rounded-full bg-gray-900 px-7 py-3 text-white outline-none transition hover:scale-110 hover:bg-gray-950 focus:scale-110 active:scale-105"
          onClick={() => {
            setActiveSection('Contact')
            setTimeOfLastClick(Date.now())
          }}>
          Contact me here{' '}
          <BsChevronCompactRight className="opacity-70 transition group-hover:translate-x-2" />
        </Link>
        <a
          className="borderBlack group flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3 outline-none transition hover:scale-110 focus:scale-110 active:scale-105 dark:bg-white/10"
          href="/Attila_Huszar_CV.pdf"
          download>
          Download CV{' '}
          <FaFileArrowDown className="opacity-60 transition group-hover:translate-y-1" />
        </a>
        <a
          className="borderBlack cursor-pointer rounded-full bg-white p-3 text-[1.65rem] text-gray-700 transition hover:scale-[1.15] hover:text-gray-950 focus:scale-[1.15] active:scale-105 dark:bg-white/10 dark:text-white/60"
          href="https://www.linkedin.com/in/attilahuszar/"
          target="_blank"
          rel="noopener noreferrer">
          <FaLinkedinIn />
        </a>
        <a
          className="borderBlack cursor-pointer rounded-full bg-white  p-3 text-[1.65rem] text-gray-700 transition hover:scale-[1.15] hover:text-gray-950 focus:scale-[1.15] active:scale-105 dark:bg-white/10 dark:text-white/60"
          href="https://github.com/attila-huszar/"
          target="_blank"
          rel="noopener noreferrer">
          <FaGithub />
        </a>
      </motion.div>
    </section>
  )
}
