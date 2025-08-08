import { getJlptListFromDir } from '@/lib/jlpt';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const jlptList = await getJlptListFromDir(`${process.env.DATA_PATH}/jlpt`);
  const baseUrl = 'https://jlpt.adayroi.jp';
  const now = new Date();

  // Basic static pages
  const staticPages = [
    {
      url: `${baseUrl}/about-us`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // Documentation pages
  const docPages = ['n1', 'n2', 'n3'].map((level) => ({
    url: `${baseUrl}/docs/mimikara-oboeru/${level}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // JLPT test pages (listen and regular)
  const jlptSitemap = jlptList.level.flatMap((level: string) =>
    jlptList.year.flatMap((year: number) =>
      jlptList.month.flatMap((month: number) => [
        {
          url: `${baseUrl}/jlpt/${level}/${year}-${month}/listen`,
          lastModified: now,
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        },
        {
          url: `${baseUrl}/jlpt/${level}/${year}-${month}`,
          lastModified: now,
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        },
      ])
    )
  );

  // Quiz pages
  const quizTypes = ['kanji', 'vocabulary'];
  const quizPages = ['1', '2', '3', '4'];
  const quizSitemap = jlptList.level.flatMap((level: string) =>
    quizTypes.flatMap((type: string) =>
      quizPages.map((page: string) => ({
        url: `${baseUrl}/quiz/${level}/${type}/${page}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      }))
    )
  );

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    ...staticPages,
    ...jlptSitemap,
    ...quizSitemap,
    ...docPages,
  ];
}

export const dynamic = 'force-static';
