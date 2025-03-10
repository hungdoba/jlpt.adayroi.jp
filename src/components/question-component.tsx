'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import BookmarkIcon from './ui/bookmark-icon';
import HintIcon from './ui/hint-icon';
import Explanation from './explanation';
import { Question } from '@/types/question';

type Props = {
  mondaiId: number;
  question: Question;
  // TODO: remove in future
  jsonFileName?: string;
  questionId?: number;
};

export default function QuestionComponent({
  mondaiId,
  question,
  jsonFileName,
  questionId,
}: Props) {
  const [showHint, setShowHint] = useState(false);

  // Determine layout based on mondaiId
  const getChoiceWidth = () => {
    if ([1, 2, 3, 5].includes(mondaiId)) {
      return 'w-full md:w-1/2 lg:w-1/4';
    } else if ([4, 10, 11, 12, 13].includes(mondaiId)) {
      return 'w-full';
    } else {
      return 'w-full md:w-1/2';
    }
  };

  return (
    <div>
      <div className="mt-4 mb-2 flex items-center justify-between">
        <h3>{`${question.question_id}. ${question.question_text}`}</h3>
        <div className="flex">
          <BookmarkIcon />
          <HintIcon onClick={setShowHint} />
        </div>
      </div>
      <div className="mx-8 flex justify-between">
        <RadioGroup
          defaultValue="option-one"
          className="flex flex-wrap justify-between w-full"
        >
          {question.choices.map((choice, choiceIndex) => (
            <div
              key={choiceIndex}
              className={cn('flex items-center mb-2', getChoiceWidth())}
            >
              <RadioGroupItem
                value={`option-${choiceIndex}`}
                id={`option-${choiceIndex}-${mondaiId}`}
              />
              <Label
                htmlFor={`option-${choiceIndex}-${mondaiId}`}
                className={cn(
                  'ml-2',
                  showHint && question.answer === choiceIndex
                    ? 'text-green-500'
                    : ''
                )}
              >
                {`${choiceIndex + 1}. ${choice}`}
              </Label>
              {showHint && question.answer === choiceIndex && (
                <div className="ml-2">
                  <Explanation
                    title="Giải thích"
                    content={question.explanation}
                    jsonFileName={jsonFileName}
                    questionId={questionId ?? 0}
                  />
                </div>
              )}
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
