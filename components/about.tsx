'use client'

import SectionHeading from './section-heading'
import { motion } from 'motion/react'
import { useSectionInView } from '@/hooks/useSectionInView'
import Markdown from 'markdown-to-jsx'
import info from '@/assets/info.json'

export default function About() {
  const { ref } = useSectionInView('#about')

  return (
    <motion.section
      id="about"
      ref={ref}
      className="mb-28 max-w-[45rem] scroll-mt-28 text-center leading-8 sm:mb-40"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading>About me</SectionHeading>
      <Markdown className="text-lg" options={{ wrapper: 'p' }}>
        {info.about}
      </Markdown>
    </motion.section>
  )
}
