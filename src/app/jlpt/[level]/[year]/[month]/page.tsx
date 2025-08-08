import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { AnswersProvider } from '@/providers/AnswerProvider';
import { BookmarksProvider } from '@/providers/BookmarkProvider';
import { getJlptListFromDir, readJlptJson } from '@/lib/jlpt';
import { Section } from '@/types/jlpt';
import { Mondai } from '@/types/base';
import MondaiTitle from '@/components/cards/MondaiTitle';
import MondaiCard from '@/components/cards/MondaiCard';
import { MenuJlpt } from '@/components/features/MenuJlpt';

interface Params {
  level: string;
  year: string;
  month: string;
}

interface Props {
  params: Promise<Params>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { level, year, month } = await params;
  return {
    title: `JLPT ${level.toUpperCase()} ${year}-${month} - Adayroi.jp`,
    description: `Đề thi chính thức từ vựng, ngữ pháp, đọc hiểu ${level.toUpperCase()} tháng ${month} năm ${year}`,
  };
}

export async function generateStaticParams(): Promise<Params[]> {
  const jlptList = await getJlptListFromDir(process.env.DATA_PATH + '/jlpt');
  return jlptList.level.flatMap((level: string) =>
    jlptList.year.flatMap((year: number) =>
      jlptList.month.map((month: number) => ({
        level,
        year: String(year),
        month: String(month),
      })),
    ),
  );
}

export default async function Page({ params }: Props) {
  const { level, year, month } = await params;
  const testId = `${level}_${year}_${month}`;
  const jsonPath = `${process.env.DATA_PATH}/jlpt/${level}/${year}-${month}.json`;

  const sections = await readJlptJson(jsonPath);

  if (sections.length === 0) {
    notFound();
  }

  return (
    <AnswersProvider testId={testId}>
      <BookmarksProvider testId={testId}>
        {sections.map((section: Section, index: number) => {
          const mondais = section.mondais as Mondai[];
          return (
            <div key={index} className="mb-4">
              <MondaiTitle section={section} mondais={mondais} />
              {mondais.map((grammarQuiz, idx) => (
                <MondaiCard mondai={grammarQuiz} key={idx} jsonPath={jsonPath} />
              ))}
            </div>
          );
        })}

        <div className="fixed right-2 bottom-2 flex flex-col gap-y-2 items-end">
          <MenuJlpt />
        </div>
      </BookmarksProvider>
    </AnswersProvider>
  );
}
