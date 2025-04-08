'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { FaChrome, FaCode } from 'react-icons/fa6'
import { type ProjectProps } from '@/types/ProjectProps'

export default function Project({
  title,
  siteUrl,
  codeUrl,
  imageUrl,
  tags,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.33 1'],
  })
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1])

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className="group mb-3 last:mb-0 sm:mb-8"
    >
      <section className="relative max-w-2xl overflow-hidden rounded-lg border border-black/5 bg-gray-400/10 text-gray-900 transition hover:bg-gray-400/20 sm:h-[17rem] sm:pr-8 sm:group-even:pl-8 dark:bg-white/15 dark:text-gray-100 dark:hover:bg-white/20">
        <div className="flex h-full flex-col px-5 pt-4 pb-7 sm:max-w-[50%] sm:pt-10 sm:pr-2 sm:pl-10 sm:group-even:ml-72">
          <h3 className="text-2xl font-semibold select-none text-shadow-md sm:text-shadow-[initial]">
            {title}
          </h3>
          <div className="my-4 flex gap-4">
            {siteUrl && (
              <a href={siteUrl} target="_blank" rel="noopener noreferrer">
                <button
                  className="flex w-24 cursor-pointer items-center justify-center gap-2 rounded-full bg-slate-700 py-2 text-sm tracking-wider text-white uppercase shadow-md transition outline-none hover:scale-110 hover:bg-slate-800 focus:scale-110 dark:bg-gray-900 dark:text-gray-100 hover:dark:bg-gray-950"
                  type="button"
                >
                  <FaChrome className="text-lg" />
                  Site
                </button>
              </a>
            )}
            {codeUrl && (
              <a href={codeUrl} target="_blank" rel="noopener noreferrer">
                <button
                  className="flex w-24 cursor-pointer items-center justify-center gap-2 rounded-full bg-slate-700 py-2 text-sm tracking-wider text-white uppercase shadow-md transition outline-none hover:scale-110 hover:bg-slate-800 focus:scale-110 dark:bg-gray-900 dark:text-gray-100 hover:dark:bg-gray-950"
                  type="button"
                >
                  <FaCode className="text-lg" />
                  Code
                </button>
              </a>
            )}
          </div>
          <ul className="mt-4 flex flex-wrap gap-2 sm:mt-auto">
            {tags.map((tag, index) => (
              <li
                className="rounded-full bg-slate-500 px-3 py-1 text-[0.75rem] tracking-wider text-white uppercase shadow-md select-none dark:bg-gray-800 dark:text-gray-100"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <a
          href={siteUrl || codeUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="View project"
          className="pointer-events-none absolute inset-0 sm:pointer-events-auto sm:inset-[initial] sm:top-8 sm:-right-36 sm:h-full sm:w-[28.5rem] sm:transition sm:group-even:right-[initial] sm:group-even:-left-36 sm:group-hover:-translate-x-3 sm:group-hover:translate-y-3 sm:group-hover:scale-[1.04] sm:group-hover:-rotate-2 sm:group-even:group-hover:translate-x-3 sm:group-even:group-hover:translate-y-3 sm:group-even:group-hover:rotate-2"
        >
          <Image
            src={imageUrl}
            alt={`Screenshot of ${title}`}
            fill
            className="-z-10 rounded-t-lg object-cover object-top opacity-30 shadow-2xl sm:opacity-100"
          />
        </a>
      </section>
    </motion.div>
  )
}
