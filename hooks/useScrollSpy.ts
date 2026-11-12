'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { SectionHash } from '@/constants/navigation'

export function useScrollSpy(sections: readonly { hash: SectionHash }[]) {
  const [activeSection, setActiveSection] = useState(sections[0]?.hash)
  const navigationTarget = useRef<SectionHash | undefined>(undefined)

  const selectSection = useCallback(
    (hash: SectionHash) => {
      if (hash !== activeSection) navigationTarget.current = hash
      setActiveSection(hash)
    },
    [activeSection],
  )

  useEffect(() => {
    const targets = sections.flatMap(({ hash }) => {
      const element = document.getElementById(hash.slice(1))
      return element ? [{ hash, element }] : []
    })
    const footer = document.querySelector('footer')
    const ratios = new Map<Element, number>()
    let footerVisible = false
    let observer: IntersectionObserver

    function update() {
      if (navigationTarget.current) return
      const visible = targets
        .map(({ hash, element }) => ({
          hash,
          ratio: ratios.get(element) ?? 0,
        }))
        .filter(({ ratio }) => ratio > 0)
      const next = footerVisible
        ? visible.at(-1)
        : visible.reduce(
            (best, section) => (section.ratio > best.ratio ? section : best),
            visible[0],
          )
      if (next) setActiveSection(next.hash)
    }

    function observe() {
      observer?.disconnect()
      ratios.clear()
      footerVisible = false
      navigationTarget.current = undefined
      const offset = getComputedStyle(document.documentElement).scrollPaddingTop
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.target === footer) footerVisible = entry.isIntersecting
            else ratios.set(entry.target, entry.intersectionRatio)
          }
          update()
        },
        {
          rootMargin: `-${offset} 0px 0px 0px`,
          // Reconsider the active section at each 10% visibility change.
          threshold: Array.from({ length: 11 }, (_, index) => index / 10),
        },
      )
      targets.forEach(({ element }) => observer.observe(element))
      if (footer) observer.observe(footer)
    }

    function resumeTracking() {
      navigationTarget.current = undefined
      update()
    }

    observe()
    document.addEventListener('scrollend', resumeTracking)
    window.addEventListener('wheel', resumeTracking, { passive: true })
    window.addEventListener('touchstart', resumeTracking, { passive: true })
    window.addEventListener('keydown', resumeTracking)
    window.addEventListener('resize', observe)
    return () => {
      observer.disconnect()
      document.removeEventListener('scrollend', resumeTracking)
      window.removeEventListener('wheel', resumeTracking)
      window.removeEventListener('touchstart', resumeTracking)
      window.removeEventListener('keydown', resumeTracking)
      window.removeEventListener('resize', observe)
    }
  }, [sections])

  return { activeSection, selectSection }
}
