'use client';

import { Lightbulb, LightbulbOff } from 'lucide-react';
import { useState } from 'react';

interface HintIconProps {
  onClick?: (status: boolean) => void;
}

export default function HintIcon({ onClick }: HintIconProps) {
  const [status, setStatus] = useState(false);

  const handleClick = () => {
    const newStatus = !status;
    setStatus(newStatus);
    if (onClick) {
      onClick(newStatus);
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {status ? (
        <Lightbulb strokeWidth={0.5} size={16} />
      ) : (
        <LightbulbOff strokeWidth={0.5} size={16} />
      )}
    </div>
  );
}
