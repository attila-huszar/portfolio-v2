'use client'

import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import type { SectionHash } from '@/constants/navigation'

export function useScrollSpy(sections: readonly { hash: SectionHash }[]) {
  const [activeSection, setActiveSection] = useState(sections[0]?.hash)
  const isScrollingToSection = useRef(false)

  function handleLinkClick(
    event: MouseEvent<HTMLAnchorElement>,
    hash: SectionHash,
  ) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    // Keep the clicked section active while scrolling past other sections.
    if (hash !== activeSection) isScrollingToSection.current = true

    setActiveSection(hash)

    if (hash !== '#home' && hash !== '#contact') return

    event.preventDefault()

    if (window.location.hash !== hash) {
      window.history.pushState(window.history.state, '', hash)
    }

    window.scrollTo({
      top: hash === '#home' ? 0 : document.documentElement.scrollHeight,
    })
  }

  useEffect(() => {
    const observedSections = sections.flatMap(({ hash }) => {
      const element = document.getElementById(hash.slice(1))

      return element ? [{ hash, element }] : []
    })

    const footer = document.querySelector('footer')
    const visibilityRatios = new Map<Element, number>()

    let isFooterVisible = false
    let observer: IntersectionObserver

    function updateActiveSection() {
      if (isScrollingToSection.current) return

      let nextSection: SectionHash | undefined
      let highestVisibilityRatio = 0

      for (const { hash, element } of observedSections) {
        const visibilityRatio = visibilityRatios.get(element) ?? 0

        if (visibilityRatio <= 0) continue

        // Near the footer, prefer the last visible section.
        if (isFooterVisible || visibilityRatio > highestVisibilityRatio) {
          nextSection = hash
          highestVisibilityRatio = visibilityRatio
        }
      }

      if (nextSection) setActiveSection(nextSection)
    }

    function observeSections() {
      const scrollOffset = getComputedStyle(
        document.documentElement,
      ).scrollPaddingTop
      const rootMargin = `-${scrollOffset} 0px 0px 0px`

      if (observer?.rootMargin === rootMargin) return

      observer?.disconnect()

      visibilityRatios.clear()
      isFooterVisible = false
      isScrollingToSection.current = false

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.target === footer) {
              isFooterVisible = entry.isIntersecting
            } else {
              visibilityRatios.set(entry.target, entry.intersectionRatio)
            }
          }

          updateActiveSection()
        },
        {
          rootMargin,
          // Reconsider the active section at each 10% visibility change.
          threshold: Array.from({ length: 11 }, (_, index) => index / 10),
        },
      )

      observedSections.forEach(({ element }) => observer.observe(element))
      if (footer) observer.observe(footer)
    }

    function resumeScrollTracking(event: Event) {
      if (!isScrollingToSection.current) return

      isScrollingToSection.current = false

      // scrollend can precede the observer's final visibility update.
      if (event.type !== 'scrollend') updateActiveSection()
    }

    observeSections()

    const listenerController = new AbortController()
    const { signal } = listenerController

    document.addEventListener('scrollend', resumeScrollTracking, { signal })
    window.addEventListener('resize', observeSections, { signal })

    for (const event of ['wheel', 'touchstart', 'keydown']) {
      window.addEventListener(event, resumeScrollTracking, {
        passive: true,
        signal,
      })
    }

    return () => {
      observer.disconnect()
      listenerController.abort()
    }
  }, [sections])

  return { activeSection, handleLinkClick }
}
