'use client';
import { cn, hasHtmlContent } from '@/lib/utils';
import { useState } from 'react';
import { CircleHelp, TriangleAlert } from 'lucide-react';
import HintCard from './HintCard';
import { formatText } from '@/lib/format';
import { useBookmarks } from '@/providers/BookmarkProvider';
import { HintField, Mondai } from '@/types/base';
import { BookmarkStatus } from '@/types/bookmark';
import AudioPlayer from '../features/AudioPlayer';

interface Props {
  mondai: Mondai;
  jsonPath: string;
}

export default function SentenceCard({ jsonPath, mondai }: Props) {
  const [showHintDetail, setShowHintDetail] = useState(false);
  const [showEditText, setShowEditText] = useState(false);
  const { bookmarks, filterBookmarks } = useBookmarks();

  const handleHintClick = () => setShowHintDetail((prev) => !prev);
  const handleEditClick = () => setShowEditText((prev) => !prev);

  const isVisible =
    filterBookmarks.length === 0 ||
    mondai.questions.some((q) =>
      filterBookmarks.includes((bookmarks[q.id] as BookmarkStatus) ?? BookmarkStatus.New),
    );

  if (!isVisible) {
    return null;
  }

  return (
    <div className={cn('flex mt-4', !mondai.sentence?.audio && 'p-4 border rounded-sm')}>
      <div className="flex-col space-y-2 w-full">
        <div className="flex flex-col-reverse md:flex-row items-start">
          {mondai.sentence &&
            (hasHtmlContent(mondai.sentence.text) ? (
              <div
                className="mr-2 prose w-full"
                dangerouslySetInnerHTML={{ __html: mondai.sentence.text }}
              />
            ) : (
              <h3 className="whitespace-pre-wrap w-full">{formatText(mondai.sentence.text)}</h3>
            ))}

          {!mondai.sentence?.audio && mondai.sentence?.text && (
            <div className="flex w-full justify-end md:w-auto md:ml-2 md:flex-col gap-2">
              <CircleHelp
                size={16}
                strokeWidth={1.5}
                className="cursor-pointer"
                onClick={handleHintClick}
              />
              <TriangleAlert
                size={16}
                strokeWidth={1.5}
                className="cursor-pointer"
                onClick={handleEditClick}
              />
            </div>
          )}
        </div>
        {mondai.sentence?.audio && (
          <div className="flex items-center">
            <AudioPlayer src={process.env.NEXT_PUBLIC_BASE_AUDIO_URL + mondai.sentence?.audio} />
            <CircleHelp
              size={16}
              strokeWidth={1.5}
              className="cursor-pointer ml-2"
              onClick={handleHintClick}
            />
          </div>
        )}
      </div>
      <HintCard
        hint={{
          id: mondai.id,
          text: mondai.sentence?.translation || '',
          filePath: jsonPath,
          field: HintField.Sentence,
        }}
        open={showHintDetail}
        onOpenChange={setShowHintDetail}
      />
      <HintCard
        hint={{
          id: mondai.id,
          text: mondai.sentence?.text || '',
          filePath: jsonPath,
          field: HintField.SentenceText,
        }}
        open={showEditText}
        onOpenChange={setShowEditText}
      />
    </div>
  );
}
