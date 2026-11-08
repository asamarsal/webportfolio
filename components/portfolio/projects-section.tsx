'use client'

import Image from 'next/image'
import type { PointerEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from './portfolio-data'

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number]
  index: number
}) {
  const tiltCard = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    event.currentTarget.style.setProperty('--card-rotate-x', `${-y * 4}deg`)
    event.currentTarget.style.setProperty('--card-rotate-y', `${x * 4}deg`)
    const image = event.currentTarget.querySelector<HTMLElement>('.project-image')
    image?.style.setProperty('--image-x', `${-x * 8}px`)
    image?.style.setProperty('--image-y', `${-y * 8}px`)
  }

  const resetCard = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--card-rotate-x', '0deg')
    event.currentTarget.style.setProperty('--card-rotate-y', '0deg')
    const image = event.currentTarget.querySelector<HTMLElement>('.project-image')
    image?.style.setProperty('--image-x', '0px')
    image?.style.setProperty('--image-y', '0px')
  }

  return (
    <article
      className="project-card reveal-up"
      data-reveal-delay={index * 0.1}
      onPointerMove={tiltCard}
      onPointerLeave={resetCard}
    >
      <div className="project-image">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 720px) 90vw, (max-width: 1120px) 42vw, 22vw"
        />
        <span className="project-index mono">{project.number}</span>
        <span className="project-category mono">{project.category}</span>
      </div>
      <div className="project-copy">
        <div className="project-titleline">
          <h3>{project.name}</h3>
          <a href="#contact" aria-label={`Ask about ${project.name}`}>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <p>{project.description}</p>
        <div className="project-tags" aria-label="Technologies">
          {project.technologies.map((technology) => (
            <span className="project-tag" key={technology}>{technology}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export function ProjectsSection() {
  return (
    <section id="projects" className="projects-section" data-section>
      <div className="projects-heading layout-shell">
        <div className="section-title-lockup">
          <span className="section-slash" aria-hidden="true">/</span>
          <h2 data-scratch-reveal>Featured Projects</h2>
        </div>
        <p className="projects-intro mono">
          A showcase of products, experiments, and ideas I&apos;ve built — from enterprise applications to decentralized platforms.
        </p>
        <a className="text-link mono" href="#experience">
          More in the making <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="project-layout layout-shell">
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.number} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
