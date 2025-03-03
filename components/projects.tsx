'use client'

import { Fragment } from 'react'
import { useSectionInView } from '@/hooks/useSectionInView'
import SectionHeading from './section-heading'
import Project from './project'
import info from '@/assets/info.json'

export default function Projects() {
  const { ref } = useSectionInView('#projects', 0.3)

  return (
    <section id="projects" ref={ref} className="mb-28 scroll-mt-28">
      <SectionHeading>My projects</SectionHeading>
      <>
        {info.projects.map((project, index) => (
          <Fragment key={index}>
            <Project {...project} />
          </Fragment>
        ))}
      </>
    </section>
  )
}
