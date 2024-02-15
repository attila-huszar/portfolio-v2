import portfolioImg from '@/public/portfolio.webp'
import portfolioV2Img from '@/public/portfolio-v2.webp'
import starWarsMovieDb from '@/public/star-wars-moviedb.webp'
import foxTicketImg from '@/public/fox-ticket.jpg'
import recipeBookImg from '@/public/recipe-book.webp'
import simpleTimerImg from '@/public/simple-timer.webp'

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
    title: 'Portfolio v1',
    description: 'Portfolio site built using React and Material UI.',
    tags: ['React', 'SCSS', 'Material UI'],
    siteUrl: 'https://attila.pages.dev/',
    codeUrl: 'https://github.com/attila-huszar/portfolio/',
    imageUrl: portfolioImg,
  },
  {
    title: 'Portfolio v2',
    description: 'Portfolio site built with Next.js and Tailwind CSS.',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    siteUrl: 'https://attilah.vercel.app/',
    codeUrl: 'https://github.com/attila-huszar/portfolio-v2/',
    imageUrl: portfolioV2Img,
  },
  {
    title: 'Star Wars MovieDb',
    description: 'Movie database with Redux state management.',
    tags: ['React', 'Redux'],
    siteUrl: 'https://starwarsdb.pages.dev/',
    codeUrl: 'https://github.com/attila-huszar/star-wars-moviedb/',
    imageUrl: starWarsMovieDb,
  },
  {
    title: 'Ticketing App',
    description:
      'Public transport ticket hub built using React, TypeScript, Tailwind, Node.js, Express and MySQL.',
    tags: ['React', 'TypeScript', 'Node.js', 'MySQl'],
    siteUrl: '',
    codeUrl: 'https://github.com/attila-huszar/fox-ticket/',
    imageUrl: foxTicketImg,
  },
  {
    title: 'Recipe Book',
    description: 'Recipe Book built using vanilla JavaScript.',
    tags: ['JavaScript'],
    siteUrl: 'https://recipe-ingredients.pages.dev/',
    codeUrl: 'https://github.com/attila-huszar/recipe-book/',
    imageUrl: recipeBookImg,
  },
  {
    title: 'Simple Timer',
    description: 'Countdown timer built using React.',
    tags: ['React'],
    siteUrl: 'https://simpletimer.pages.dev/',
    codeUrl: 'https://github.com/attila-huszar/countdown-timer/',
    imageUrl: simpleTimerImg,
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
