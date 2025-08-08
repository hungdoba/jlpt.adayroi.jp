export const QUIZ_BUTTONS = [
  { href: '/quiz/n1/vocabulary/1', label: 'Từ vựng N1', disabled: false },
  { href: '/quiz/n2/vocabulary/1', label: 'Từ vựng N2', disabled: false },
  { href: '/quiz/n3/vocabulary/1', label: 'Từ vựng N3', disabled: false },
  { href: '/quiz/n1/kanji/1', label: 'Kanji N1', disabled: false },
  { href: '/quiz/n2/kanji/1', label: 'Kanji N2', disabled: false },
  { href: '/quiz/n3/kanji/1', label: 'Kanji N3', disabled: false },
  { href: '/quiz/n1/grammar/1', label: 'Ngữ pháp N1', disabled: false },
  { href: '/quiz/n2/grammar/1', label: 'Ngữ pháp N2', disabled: true },
  { href: '/quiz/n3/grammar/1', label: 'Ngữ pháp N3', disabled: true },
  { href: '/quiz/n1/reading/1', label: 'Đọc hiểu N1', disabled: false },
  { href: '/quiz/n2/reading/1', label: 'Đọc hiểu N2', disabled: true },
  { href: '/quiz/n3/reading/1', label: 'Đọc hiểu N3', disabled: true },
] as const;

export const DOC_BUTTONS = [
  {
    href: '/docs/mimikara-oboeru/n1',
    label: 'Mimikara Oboeru N1',
    disabled: false,
  },
  {
    href: '/docs/mimikara-oboeru/n2',
    label: 'Mimikara Oboeru N2',
    disabled: false,
  },
  {
    href: '/docs/mimikara-oboeru/n3',
    label: 'Mimikara Oboeru N3',
    disabled: false,
  },
] as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;
