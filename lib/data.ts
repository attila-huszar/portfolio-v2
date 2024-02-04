import portfolioImg from '@/public/portfolio.webp'
import foxTicketReactImg from '@/public/fox-ticket.jpg'

export type SectionName = (typeof links)[number]['name']

export const links = [
  {
    name: 'Home',
    hash: '#home',
  },
  {
    name: 'About',
    hash: '#about',
  },
  {
    name: 'Projects',
    hash: '#projects',
  },
  {
    name: 'Skills',
    hash: '#skills',
  },
  {
    name: 'Contact',
    hash: '#contact',
  },
] as const

export const projectsData = [
  {
    title: 'Portfolio',
    description: 'Portfolio site built using React and Material UI.',
    tags: ['React', 'JavaScript', 'SCSS', 'Material UI'],
    siteUrl: 'https://attila.pages.dev/',
    codeUrl: 'https://github.com/attila-huszar/portfolio/',
    imageUrl: portfolioImg,
  },
  {
    title: 'Full Stack School Project',
    description:
      'Public transport ticket hub built using React, TypeScript, Tailwind, Node.js, Express and MySQL.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'MySQl'],
    siteUrl: '',
    codeUrl: 'https://github.com/attila-huszar/fox-ticket/',
    imageUrl: foxTicketReactImg,
  },
] as const

export const skillsData = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Express',
  'MySQL',
  'Sequelize',
  'SCSS',
  'Tailwind',
  'Material UI',
  'Framer Motion',
  'Graphic design',
  'Git',
  'CI/CD',
  'Postman',
  'Jest',
  'Jira',
] as const

// export const experiencesData = [
//   {
//     title: "",
//     location: "",
//     description: "",
//     icon: React.createElement(LuGraduationCap),
//     date: "",
//   },
//   {
//     title: "",
//     location: "",
//     description: "",
//     icon: React.createElement(CgWorkAlt),
//     date: "",
//   },
//   {
//     title: "",
//     location: "",
//     description: "",
//     icon: React.createElement(FaReact),
//     date: "",
//   },
// ] as const;
