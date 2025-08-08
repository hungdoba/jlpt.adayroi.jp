'use client';

import { Lightbulb, LightbulbOff } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HintIconProps {
  showHint?: boolean;
  onClick?: (status: boolean) => void;
}

export default function HintIcon({ showHint, onClick }: HintIconProps) {
  const [status, setStatus] = useState(false);

  const handleClick = () => {
    const newStatus = !status;
    setStatus(newStatus);
    if (onClick) {
      onClick(newStatus);
    }
  };

  useEffect(() => {
    if (showHint !== undefined) {
      setStatus(showHint);
    }
  }, [showHint]);

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {status ? (
        <Lightbulb
          className="text-yellow-500 md:size-[16px]"
          strokeWidth={2}
          size={16}
        />
      ) : (
        <LightbulbOff className="md:size-[16px]" strokeWidth={0.5} size={16} />
      )}
    </div>
  );
}
