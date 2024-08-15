'use client'

import { Fragment } from 'react'
import { useSectionInView } from '@/hooks/useSectionInView'
import SectionHeading from './section-heading'
import Project from './project'
import info from '@/assets/info.json'

export default function Projects() {
  const { ref } = useSectionInView('Projects', 0.5)

  return (
    <section ref={ref} id="projects" className="mb-28 scroll-mt-28">
      <SectionHeading>My projects</SectionHeading>
      <div>
        {info.projects.map((project, index) => (
          <Fragment key={index}>
            <Project {...project} />
          </Fragment>
        ))}
      </div>
    </section>
  )
}
