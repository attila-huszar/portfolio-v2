import { links } from '@/components/header'

export type SectionName = (typeof links)[number]['name']

export type ActiveSection = {
  activeSection: SectionName
  setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>
  timeOfLastClick: number
  setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>
}
