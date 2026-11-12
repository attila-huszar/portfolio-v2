'use client'

import { Fragment } from 'react'
import SectionHeading from './section-heading'
import Project from './project'
import info from '@/assets/info.json'

export default function Projects() {
  return (
    <section id="projects" className="mb-28">
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
