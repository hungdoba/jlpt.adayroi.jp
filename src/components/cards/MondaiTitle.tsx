'use client';
import { Mondai } from '@/types/base';
import { Section } from '@/types/jlpt';
import { BookmarkStatus } from '@/types/bookmark';
import { useBookmarks } from '@/providers/BookmarkProvider';

interface Props {
  section: Section;
  mondais: Mondai[];
}

export default function MondaiTitle({ mondais, section }: Props) {
  const { bookmarks, filterBookmarks } = useBookmarks();

  // Visible in case has some visible question
  const isVisible =
    filterBookmarks.length === 0 ||
    mondais.some((mondai) =>
      mondai.questions.some((q) =>
        filterBookmarks.includes((bookmarks[q.id] as BookmarkStatus) ?? BookmarkStatus.New),
      ),
    );

  if (!isVisible) {
    return null;
  }

  return (
    <h2 id={`mondai-${section.id.toString()}`} className="text font-bold mt-8 mb-4 scroll-mt-8">
      問題 {section.id}. {section.description}
    </h2>
  );
}
