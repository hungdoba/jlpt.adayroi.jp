'use client';

import { cn } from '@/lib/utils';
import BookmarkIcon from './ui/bookmark-icon';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import HintIcon from './ui/hint-icon';
import { useState } from 'react';
import Explanation from './explanation';

type Props = {
  mondaiId: number;
  question: Question;
};

export default function Question({ mondaiId, question }: Props) {
  const [showHint, setShowHint] = useState(false);
  return (
    <>
      <div>
        <div className="mt-4 mb-2 flex items-center justify-between">
          <h3>
            {`${question.question_id.replace('question-', '')}. ${
              question.question_text
            }`}
          </h3>
          <div className="flex">
            <BookmarkIcon />
            <HintIcon onClick={(status) => setShowHint(status)} />
          </div>
        </div>
        <div className="mx-8 flex justify-between">
          <RadioGroup
            defaultValue="option-one"
            className="flex flex-row flex-wrap justify-between w-full"
          >
            {question.choices.map((choice, choiceIndex) => (
              <div
                key={choiceIndex}
                className={cn(
                  'flex items-center mb-2',
                  mondaiId == 1 ||
                    mondaiId == 2 ||
                    mondaiId == 3 ||
                    mondaiId == 5
                    ? 'w-full md:w-1/2 lg:w-1/2'
                    : mondaiId == 4 ||
                      mondaiId == 10 ||
                      mondaiId == 11 ||
                      mondaiId == 12 ||
                      mondaiId == 13
                    ? 'w-full'
                    : 'w-full md:w-1/2'
                )}
              >
                <RadioGroupItem
                  value={`option-${choiceIndex}`}
                  id={`option-${choiceIndex}-${mondaiId}`}
                />
                <Label
                  htmlFor={`option-${choiceIndex}-${mondaiId}`}
                  className={cn(
                    'ml-2',
                    showHint && question.answer == choiceIndex
                      ? 'text-green-500'
                      : ''
                  )}
                >
                  {`${choiceIndex + 1}. ${choice}`}
                </Label>
                {showHint && question.answer == choiceIndex && (
                  <Explanation
                    title="Giải thích"
                    content={question.explanation}
                  />
                )}
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </>
  );
}
