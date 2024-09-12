'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
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
      className="group mb-3 last:mb-0 sm:mb-8">
      <section className="relative max-w-2xl overflow-hidden rounded-lg border border-black/5 bg-gray-200 transition hover:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 sm:h-[17rem] sm:pr-8 sm:group-even:pl-8">
        <div className="flex h-full flex-col px-5 pb-7 pt-4 sm:max-w-[50%] sm:pl-10 sm:pr-2 sm:pt-10 sm:group-even:ml-72">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <div className="my-4 flex gap-4">
            {siteUrl && (
              <a href={siteUrl} target="_blank" rel="noopener noreferrer">
                <button
                  className="flex w-24 items-center justify-center gap-2 rounded-full bg-slate-600 py-2 text-sm uppercase tracking-wider text-white outline-none transition hover:scale-110 hover:bg-slate-900 focus:scale-110 dark:bg-gray-950/50 hover:dark:bg-gray-950"
                  type="button">
                  <FaChrome className="text-lg" />
                  Site
                </button>
              </a>
            )}
            {codeUrl && (
              <a href={codeUrl} target="_blank" rel="noopener noreferrer">
                <button
                  className="flex w-24 items-center justify-center gap-2 rounded-full bg-slate-600 py-2 text-sm uppercase tracking-wider text-white outline-none transition hover:scale-110 hover:bg-slate-900 focus:scale-110 dark:bg-gray-950/50 hover:dark:bg-gray-950"
                  type="button">
                  <FaCode className="text-lg" />
                  Code
                </button>
              </a>
            )}
          </div>
          <ul className="mt-4 flex flex-wrap gap-2 sm:mt-auto">
            {tags.map((tag, index) => (
              <li
                className="rounded-full bg-slate-700 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white dark:bg-gray-900 dark:text-white/75"
                key={index}>
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
          className="absolute -right-36 top-8 hidden h-full w-[28.5rem] transition group-even:-left-36 group-even:right-[initial] group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 group-hover:scale-[1.04] group-even:group-hover:translate-x-3 group-even:group-hover:translate-y-3 group-even:group-hover:rotate-2 sm:block">
          <Image
            src={imageUrl}
            alt="Project I worked on"
            fill
            className="rounded-t-lg object-cover object-top shadow-2xl"
          />
        </a>
      </section>
    </motion.div>
  )
}
