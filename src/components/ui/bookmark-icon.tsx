'use client';

import { Bookmark, BookmarkCheck, BookmarkX } from 'lucide-react';
import { useState } from 'react';

export default function BookmarkIcon() {
  const [status, setStatus] = useState('idle');

  const handleClick = () => {
    setStatus((prevStatus) => {
      if (prevStatus === 'idle') return 'loading';
      if (prevStatus === 'loading') return 'error';
      return 'idle';
    });
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {status === 'idle' ? (
        <Bookmark strokeWidth={0.5} size={16} />
      ) : status === 'loading' ? (
        <BookmarkCheck strokeWidth={0.5} size={16} />
      ) : (
        <BookmarkX strokeWidth={0.5} size={16} />
      )}
    </div>
  );
}
