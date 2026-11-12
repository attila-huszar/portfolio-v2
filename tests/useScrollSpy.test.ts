import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createJiti } from 'jiti'
import { links, type SectionHash } from '../constants/navigation.ts'

let active: unknown
let setup: () => void | (() => void)
const jiti = createJiti(import.meta.url, {
  virtualModules: {
    react: {
      useState: (initial: unknown) => [
        initial,
        (value: unknown) => {
          active = value
        },
      ],
      useRef: (initial: unknown) => ({ current: initial }),
      useEffect: (effect: typeof setup) => {
        setup = effect
      },
    },
  },
})
const { useScrollSpy } = await jiti.import<
  typeof import('../hooks/useScrollSpy.ts')
>('../hooks/useScrollSpy.ts')

type Entry = {
  target: { id: string }
  intersectionRatio: number
  isIntersecting: boolean
}

const cases: {
  name: string
  ratios: Partial<Record<SectionHash, number>>
  expected: SectionHash
  footer?: boolean
  click?: SectionHash
  interrupt?: boolean
}[] = [
  {
    name: 'tall Projects can activate with a low visibility ratio',
    ratios: { '#projects': 0.15 },
    expected: '#projects',
  },
  {
    name: 'Skills activates while Projects is still partly visible',
    ratios: { '#projects': 0.2, '#skills': 0.8, '#contact': 0.1 },
    expected: '#skills',
  },
  {
    name: 'Contact activates near the footer even with Skills fully visible',
    ratios: { '#skills': 1, '#contact': 0.9 },
    expected: '#contact',
    footer: true,
  },
  {
    name: 'finishing navigation does not restore stale observer visibility',
    ratios: { '#projects': 0.8 },
    expected: '#skills',
    click: '#skills',
  },
  {
    name: 'user input resumes tracking even when visibility ratios stay unchanged',
    ratios: { '#projects': 0.8 },
    expected: '#projects',
    click: '#skills',
    interrupt: true,
  },
]

for (const scenario of cases) {
  test(scenario.name, () => {
    const elements = links.map(({ hash }) => ({ id: hash.slice(1) }))
    const footer = { id: 'footer' }
    let notify: (entries: Entry[]) => void = () => {}
    const globals = {
      window: new EventTarget(),
      document: Object.assign(new EventTarget(), {
        documentElement: {},
        getElementById: (id: string) =>
          elements.find((element) => element.id === id),
        querySelector: () => footer,
      }),
      getComputedStyle: () => ({ scrollPaddingTop: '112px' }),
      IntersectionObserver: class {
        constructor(callback: typeof notify) {
          notify = callback
        }
        observe() {}
        disconnect() {}
      },
    }
    const originals = Object.keys(globals).map(
      (name) =>
        [name, Object.getOwnPropertyDescriptor(globalThis, name)] as const,
    )
    let cleanup: void | (() => void) = undefined
    try {
      for (const [name, value] of Object.entries(globals)) {
        Object.defineProperty(globalThis, name, { configurable: true, value })
      }
      active = undefined
      const { handleLinkClick } = useScrollSpy(links)
      cleanup = setup()
      notify([
        ...elements.map((target, index) => ({
          target,
          intersectionRatio: scenario.ratios[links[index].hash] ?? 0,
          isIntersecting: true,
        })),
        {
          target: footer,
          intersectionRatio: scenario.footer ? 1 : 0,
          isIntersecting: Boolean(scenario.footer),
        },
      ])
      if (scenario.click) {
        handleLinkClick(
          {
            metaKey: false,
            ctrlKey: false,
            shiftKey: false,
            altKey: false,
          } as Parameters<typeof handleLinkClick>[0],
          scenario.click,
        )
        if (scenario.interrupt) globals.window.dispatchEvent(new Event('wheel'))
        else globals.document.dispatchEvent(new Event('scrollend'))
      }
      assert.equal(active, scenario.expected)
    } finally {
      cleanup?.()
      for (const [name, descriptor] of originals) {
        if (descriptor) Object.defineProperty(globalThis, name, descriptor)
        else Reflect.deleteProperty(globalThis, name)
      }
    }
  })
}
