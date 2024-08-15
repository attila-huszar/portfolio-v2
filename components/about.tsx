'use client'

import SectionHeading from './section-heading'
import { motion } from 'framer-motion'
import { useSectionInView } from '@/hooks/useSectionInView'

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
      <p className="mb-3 text-balance">
        {
          'After graduating with a degree in socio-economics and living a few years abroad, I made the decision to follow my passion for programming and enrolled in a coding bootcamp, where I gained expertise in full-stack web development. My main stack includes '
        }
        <span className="font-bold">
          {'JavaScript, TypeScript, React, and Next.js'}
        </span>
        {". Additionally, I'm also familiar with Node.js, Express, and MySQL."}
      </p>
      <p className="mb-3 text-balance">
        {
          "What I find most enjoyable about programming is the problem-solving aspect; there's a sense of satisfaction when I finally figure out a solution to a challenging problem. It's such a rewarding journey to keep learning and exploring new technologies."
        }
      </p>
      <p className="text-balance">
        {
          "When I'm not coding, I like playing video and board games, or taking trips, whether it's cycling in nature or venturing further to explore new places."
        }
      </p>
    </motion.section>
  )
}
