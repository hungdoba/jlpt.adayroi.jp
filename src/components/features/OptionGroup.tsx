'use client';
import { cn } from '@/lib/utils';
import { CircleHelp } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Option } from '@/types/base';
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup';
import { formatText } from '@/lib/format';

interface Props {
  options: Option[];
  defaultChecked?: string;
  correctIndex?: number;
  isFormatText?: boolean;
  showHint?: boolean;
  onExplanationClick?: () => void;
  onSelectionChange?: (value: number) => void;
}

export default function OptionGroup({
  options,
  defaultChecked = '-1',
  correctIndex,
  isFormatText = false,
  showHint = false,
  onExplanationClick,
  onSelectionChange,
}: Props) {
  const [selected, setSelected] = useState<string>(defaultChecked);

  useEffect(() => {
    setSelected(defaultChecked);
  }, [defaultChecked]);

  const handleChangeSelect = useCallback(
    (value: string) => {
      if (onSelectionChange) onSelectionChange(Number(value));
    },
    [onSelectionChange],
  );

  return (
    <RadioGroup className="w-full mx-4" value={selected} onValueChange={handleChangeSelect}>
      <div>
        {options.map((option) => {
          const isCorrect = correctIndex === option.id;
          const isSelected = Number(selected) === option.id;

          const highlightClass = showHint
            ? isCorrect
              ? 'text-green-500'
              : isSelected
                ? 'text-red-500'
                : ''
            : '';

          return (
            <div
              key={option.id}
              className="flex items-center justify-between w-full mb-2 rounded-lg pr-4"
            >
              <div className="flex items-center flex-1">
                <RadioGroupItem value={option.id.toString()} />
                <p className={cn('ml-2', highlightClass)}>
                  {option.id}. {isFormatText ? formatText(option.text) : option.text}
                </p>
              </div>
              {showHint && isCorrect && (
                <CircleHelp
                  className="ml-2 mr-4 cursor-pointer text-gray-400"
                  size={16}
                  strokeWidth={2}
                  onClick={onExplanationClick}
                />
              )}
            </div>
          );
        })}
      </div>
    </RadioGroup>
  );
}
