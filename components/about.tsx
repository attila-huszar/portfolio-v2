'use client'

import SectionHeading from './section-heading'
import { motion } from 'framer-motion'
import { useSectionInView } from '@/hooks/useSectionInView'
import Markdown from 'markdown-to-jsx'
import info from '@/assets/info.json'

export default function About() {
  const { ref } = useSectionInView('About')

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] scroll-mt-28 text-center leading-8 sm:mb-40"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about">
      <SectionHeading>About me</SectionHeading>
      <Markdown className="text-lg" options={{ wrapper: 'p' }}>
        {info.about}
      </Markdown>
    </motion.section>
  )
}
