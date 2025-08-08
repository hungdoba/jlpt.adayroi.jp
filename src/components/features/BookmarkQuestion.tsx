import { Bookmark, BookmarkCheck, BookmarkMinus, BookmarkPlus, BookmarkX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BookmarkStatus } from '@/types/bookmark';
import { getStatusColor } from '@/lib/bookmark';

interface Props {
  defaultStatus?: BookmarkStatus;
  onBookmarkChanged?: (status: BookmarkStatus) => void;
}

export default function BookmarkQuestion({
  defaultStatus = BookmarkStatus.New,
  onBookmarkChanged,
}: Props) {
  const [status, setStatus] = useState<BookmarkStatus>(defaultStatus);

  const handleClick = () => {
    const statusOrder = [
      BookmarkStatus.New,
      BookmarkStatus.Again,
      BookmarkStatus.Hard,
      BookmarkStatus.Good,
      BookmarkStatus.Easy,
    ];
    const currentIndex = statusOrder.indexOf(status);
    const newStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    setStatus(newStatus);
    if (onBookmarkChanged) onBookmarkChanged(newStatus);
  };

  const iconProps = {
    strokeWidth: status === BookmarkStatus.New ? 0.5 : 2,
    size: 16,
    className: `md:w-4 md:h-4 ${
      status !== BookmarkStatus.New ? `text-${getStatusColor(status)}-500` : ''
    }`,
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onBookmarkChanged) {
      event.preventDefault();
      onBookmarkChanged(BookmarkStatus.New);
    }
  };

  useEffect(() => {
    setStatus(defaultStatus);
  }, [defaultStatus]);

  return (
    <div onClick={handleClick} onContextMenu={handleContextMenu} className="cursor-pointer">
      {status === BookmarkStatus.New && <Bookmark {...iconProps} />}
      {status === BookmarkStatus.Good && <BookmarkCheck {...iconProps} />}
      {status === BookmarkStatus.Hard && <BookmarkMinus {...iconProps} />}
      {status === BookmarkStatus.Easy && <BookmarkPlus {...iconProps} />}
      {status === BookmarkStatus.Again && <BookmarkX {...iconProps} />}
    </div>
  );
}
