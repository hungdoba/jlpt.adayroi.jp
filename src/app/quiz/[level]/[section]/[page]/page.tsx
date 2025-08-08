import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getJlptListFromDir } from '@/lib/jlpt';
import { AnswersProvider } from '@/providers/AnswerProvider';
import { BookmarksProvider } from '@/providers/BookmarkProvider';
import { JlptSection } from '@/types/base';
import { readQuizJson } from '@/lib/quiz';
import MondaiCard from '@/components/cards/MondaiCard';
import { MenuQuiz } from '@/components/features/MenuQuiz';
import QuizPagination from '@/components/features/QuizPagination';

interface PageProps {
  params: Promise<{ level: string; section: JlptSection; page: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { level, section } = await params;
  return {
    title: `${
      section.charAt(0).toUpperCase() + section.slice(1)
    } JLPT ${level.toUpperCase()} - Adayroi.jp`,
    description: `Đề luyện thi ${
      section.charAt(0).toUpperCase() + section.slice(1)
    } JLPT ${level.toUpperCase()}`,
  };
}

export async function generateStaticParams(): Promise<
  { level: string; section: JlptSection; page: string }[]
> {
  const jlptList = await getJlptListFromDir(process.env.DATA_PATH + '/jlpt');
  const pageList = ['1', '2', '3', '4', '5'];
  const sectionList: JlptSection[] = ['grammar', 'vocabulary', 'kanji', 'reading'];

  return jlptList.level.flatMap((level: string) =>
    sectionList.flatMap((section) => pageList.map((page) => ({ level, section, page }))),
  );
}

const QUESTION_PER_PAGE = 100;

export default async function Page({ params }: PageProps) {
  const { level, section, page } = await params;
  const jsonPath = `${process.env.DATA_PATH}/quiz/${level}/${section}.json`;

  const mondaies = await readQuizJson(jsonPath);
  if (!mondaies) notFound();
  const totalQuestionCount = mondaies.reduce((sum, q) => sum + q.questions.length, 0);
  const pageNumber = parseInt(page, 10);

  const pageIndex: number[] = [0];
  let questionCount = 0;
  mondaies.forEach((mondai, i) => {
    if (questionCount >= QUESTION_PER_PAGE) {
      pageIndex.push(i);
      questionCount = 0;
    }
    questionCount += mondai.questions.length;
  });

  const startIndex = pageIndex[pageNumber - 1] || 0;
  const endIndex = pageIndex[pageNumber] || mondaies.length;

  const questions = mondaies.slice(startIndex, endIndex);
  if (!questions.length) notFound();

  const storageId = `${level}_${section}_${pageNumber}`;

  return (
    <AnswersProvider testId={storageId}>
      <BookmarksProvider testId={storageId}>
        {questions.map((grammarQuiz, idx) => (
          <MondaiCard mondai={grammarQuiz} key={idx} />
        ))}
        <div className="fixed right-2 bottom-2 flex flex-col gap-y-2 items-end">
          <MenuQuiz
            itemsCount={totalQuestionCount - 1}
            itemsPerPage={QUESTION_PER_PAGE}
            pageNumber={pageNumber}
          />
        </div>
        <QuizPagination
          pageNumber={pageNumber}
          itemsCount={totalQuestionCount}
          itemsPerPage={QUESTION_PER_PAGE}
        />
      </BookmarksProvider>
    </AnswersProvider>
  );
}
