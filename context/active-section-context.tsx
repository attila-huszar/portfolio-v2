'use client'

import { useState, createContext, useContext } from 'react'
import type { ActiveSection, SectionHash } from '@/types/Section'

export const ActiveSectionContext = createContext<ActiveSection | null>(null)

export default function ActiveSectionContextProvider({
  children,
}: React.PropsWithChildren) {
  const [activeSection, setActiveSection] = useState<SectionHash>('#home')
  const [timeOfLastClick, setTimeOfLastClick] = useState(0)

  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        timeOfLastClick,
        setTimeOfLastClick,
      }}>
      {children}
    </ActiveSectionContext.Provider>
  )
}

export function useActiveSectionContext() {
  const context = useContext(ActiveSectionContext)

  if (context === null) {
    throw new Error(
      'useActiveSectionContext must be used within an ActiveSectionContextProvider',
    )
  }

  return context
}
