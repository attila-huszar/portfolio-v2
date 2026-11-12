'use client'

import SectionHeading from './section-heading'
import { motion } from 'motion/react'
import Markdown from 'react-markdown'
import info from '@/assets/info.json'

export default function About() {
  return (
    <motion.section
      id="about"
      className="mb-28 max-w-180 text-center leading-8 sm:mb-40"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading>About me</SectionHeading>
      <div className="prose text-lg">
        <Markdown
          components={{
            p: ({ ...props }) => <p className="mb-6" {...props} />,
          }}
        >
          {info.about}
        </Markdown>
      </div>
    </motion.section>
  )
}
