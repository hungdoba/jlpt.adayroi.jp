export const ROUTES = {
  HOME: '/',
  ABOUT: '/about-us',
  CONTACT: '/contact',
  TERMS: '/terms',

  JLPT: {
    BASE: '/jlpt',
    LEVEL_YEAR_MONTH: (level: string, year: string, month: string) =>
      `/jlpt/${level}/${year}-${month}`,
  },

  QUIZ: {
    BASE: '/quiz',
    LEVEL_SKILL_PAGE: (level: string, skill: string, page: number) =>
      `/quiz/${level}/${skill}/${page}`,
  },

  DOCS: {
    BASE: '/docs',
    MIMIKARA: (level: string) => `/docs/mimikara-oboeru/${level}`,
  },

  API: {
    JSON: '/api/json',
  },
} as const;

export const NAV_ITEMS = [
  { href: ROUTES.HOME, label: 'Trang chủ' },
  { href: ROUTES.ABOUT, label: 'Giới thiệu' },
  { href: ROUTES.CONTACT, label: 'Liên hệ' },
  { href: ROUTES.TERMS, label: 'Điều khoản' },
] as const;
