'use client'

import { useActiveSectionContext } from '@/context/active-section-context'
import { useOnInView } from 'react-intersection-observer'
import type { SectionHash } from '@/types/Section'

export function useSectionInView(sectionHash: SectionHash, threshold = 0.5) {
  const { setActiveSection } = useActiveSectionContext()

  const ref = useOnInView(
    (inView) => {
      if (inView) {
        setActiveSection(sectionHash)
      }
    },
    { threshold },
  )

  return {
    ref,
  }
}
