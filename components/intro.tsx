'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { BsChevronCompactRight } from 'react-icons/bs'
import { FaFileArrowDown, FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { useSectionInView } from '@/hooks/useSectionInView'
import { useActiveSectionContext } from '@/context/active-section-context'
import Markdown from 'markdown-to-jsx'
import info from '@/assets/info.json'

const CV_URL = process.env.NEXT_PUBLIC_CV_URL ?? ''

export default function Intro() {
  const { ref } = useSectionInView('#home', 0.5)
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext()

  return (
    <section
      id="home"
      ref={ref}
      className="mb-28 max-w-[50rem] scroll-mt-[100rem] text-center sm:mb-0"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'tween',
              duration: 0.2,
            }}
          >
            <Image
              src="/images/Attila_Huszar_pic_sq.webp"
              alt="Developer portrait"
              width={128}
              height={128}
              priority
              className="size-32 rounded-full border-[0.25rem] border-white object-cover shadow-xl"
            />
          </motion.div>

          <motion.span
            className="absolute right-0 bottom-0 text-4xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 125,
              delay: 0.1,
              duration: 0.7,
            }}
          >
            👋
          </motion.span>
        </div>
      </div>

      <motion.h1
        className="my-10 px-4 text-2xl !leading-normal font-medium text-balance sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Markdown>{info.intro}</Markdown>
      </motion.h1>

      <motion.div
        className="flex flex-col items-center justify-center gap-5 text-lg font-medium sm:flex-row"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <Link
          href="#contact"
          className="group flex h-12 items-center gap-1 rounded-full bg-slate-600 px-6 text-white transition outline-none hover:scale-110 hover:bg-slate-900 focus:scale-110 active:scale-105 dark:bg-gray-950/50 hover:dark:bg-gray-950"
          onClick={() => {
            setActiveSection('#contact')
            setTimeOfLastClick(Date.now())
          }}
        >
          Contact me here
          <BsChevronCompactRight className="opacity-70 transition group-hover:translate-x-2" />
        </Link>
        <a
          className="borderBlack group flex h-12 cursor-pointer items-center gap-2 rounded-full bg-white px-6 transition outline-none hover:scale-110 focus:scale-110 active:scale-105 dark:bg-white/10"
          href={CV_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download CV
          <FaFileArrowDown className="opacity-60 transition group-hover:translate-y-1" />
        </a>
        <div className="flex gap-5">
          <a
            className="borderBlack flex size-12 cursor-pointer items-center justify-center rounded-full bg-white text-xl text-gray-700 transition hover:scale-[1.15] hover:text-gray-950 focus:scale-[1.15] active:scale-105 dark:bg-white/10 dark:text-white/60 hover:dark:text-white/80"
            href="https://www.linkedin.com/in/attilahuszar/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            className="borderBlack flex size-12 cursor-pointer items-center justify-center rounded-full bg-white text-2xl text-gray-700 transition hover:scale-[1.15] hover:text-gray-950 focus:scale-[1.15] active:scale-105 dark:bg-white/10 dark:text-white/60 hover:dark:text-white/80"
            href="https://github.com/attila-huszar/"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </motion.div>
    </section>
  )
}
