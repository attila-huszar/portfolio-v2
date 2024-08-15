'use client'

import { Fragment } from 'react'
import { projectsData } from '@/lib/data'
import { useSectionInView } from '@/lib/hooks'
import SectionHeading from './section-heading'
import Project from './project'

export default function Projects() {
  const { ref } = useSectionInView('Projects')

  return (
    <section ref={ref} id="projects" className="mb-28 scroll-mt-28">
      <SectionHeading>My projects</SectionHeading>
      <div>
        {projectsData.map((project, index) => (
          <Fragment key={index}>
            <Project {...project} />
          </Fragment>
        ))}
      </div>
    </section>
  )
}
