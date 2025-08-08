import { cn } from '@/lib/utils';
import { formatText } from '@/lib/format';
import { BookmarkStatus } from '@/types/bookmark';
import AudioPlayer from './AudioPlayer';
import BookmarkQuestion from './BookmarkQuestion';
import HintIcon from './HintIcon';

interface Props {
  id: number;
  text: string;
  audio?: string;
  showHint?: boolean;
  isFormatText?: boolean;
  defaultBookmarkStatus?: BookmarkStatus;
  onShowHint: (show: boolean) => void;
  onBookmarkChanged?: (status: BookmarkStatus) => void;
}

export default function QuestionTitle({
  id,
  text,
  audio,
  showHint,
  isFormatText = false,
  defaultBookmarkStatus,
  onShowHint,
  onBookmarkChanged,
}: Props) {
  return (
    <div className="mt-4 mb-4 flex justify-between">
      <div className="w-full flex items-center gap-2">
        <h3 className={cn(audio ? 'whitespace-nowrap' : 'whitespace-pre-wrap')}>
          {/* TODO: Clean this up later */}
          {!audio && text != '質問１' && text != '質問２' && `${id}. `}
          {isFormatText ? formatText(text) : text}
        </h3>
        {audio && <AudioPlayer src={process.env.NEXT_PUBLIC_BASE_AUDIO_URL + audio} />}
      </div>
      <div className="flex gap-2 pt-1">
        <BookmarkQuestion
          defaultStatus={defaultBookmarkStatus}
          onBookmarkChanged={onBookmarkChanged}
        />
        <HintIcon showHint={showHint} onClick={onShowHint} />
      </div>
    </div>
  );
}
