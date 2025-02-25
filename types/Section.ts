import { links } from '@/components/header'

export type SectionName = (typeof links)[number]['name']
export type SectionHash = (typeof links)[number]['hash']

export type ActiveSection = {
  activeSection: SectionHash
  setActiveSection: React.Dispatch<React.SetStateAction<SectionHash>>
  timeOfLastClick: number
  setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>
}
