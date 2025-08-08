'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';

import HintCard from './HintCard';
import { useBookmarks } from '@/providers/BookmarkProvider';
import { useAnswers } from '@/providers/AnswerProvider';
import { getNextStatus, getPreviousStatus } from '@/lib/bookmark';
import { HintField, Question } from '@/types/base';
import { BookmarkStatus, NextBookmarkAction } from '@/types/bookmark';
import { addHeatmapDataForToday } from '@/lib/localStorage';
import QuestionTitle from '../features/QuestionTitle';
import OptionGroup from '../features/OptionGroup';

interface Props {
  question: Question;
  isFormatOptionText?: boolean;
  isFormatQuestionText?: boolean;
}

export default function QuestionCard({
  question,
  isFormatOptionText,
  isFormatQuestionText,
}: Props) {
  const { showHint: globalShowHint, answers, updateAnswer } = useAnswers();
  const { bookmarks, updateBookmark, filterBookmarks } = useBookmarks();
  const [showHintIcon, setShowHintIcon] = useState<boolean>(false);
  const [showHintDetail, setShowHintDetail] = useState<boolean>(false);
  const [globaleBookmarkStatus, setGlobalBookmarkStatus] = useState<BookmarkStatus>(
    BookmarkStatus.New,
  );
  const [nextBookmarkAction, setNextBookmarkAction] = useState<NextBookmarkAction>(
    NextBookmarkAction.Ignore,
  );

  const defaultSelectedOption = answers[question.id];

  const handleSelectionChange = useCallback(
    (value: number): void => {
      if (!question?.id) return;
      let needUpdateNextBookmark = false;

      updateAnswer(question.id.toString(), value.toString());

      if (!defaultSelectedOption) {
        addHeatmapDataForToday();
        needUpdateNextBookmark = true;
      }

      if (needUpdateNextBookmark) {
        if (value === question.correctAnswer) {
          setNextBookmarkAction(NextBookmarkAction.Next);
        } else {
          setNextBookmarkAction(NextBookmarkAction.Previous);
        }
        return;
      } else if (nextBookmarkAction !== NextBookmarkAction.Ignore) {
        setNextBookmarkAction(NextBookmarkAction.Ignore);
      }
    },
    [question?.id, question.correctAnswer, updateAnswer, defaultSelectedOption, nextBookmarkAction],
  );

  const handleBookmarkChanged = useCallback(
    (status: BookmarkStatus): void => {
      if (question?.id) {
        updateBookmark(question.id.toString(), status);
      }
    },
    [question?.id, updateBookmark],
  );

  useEffect(() => {
    setGlobalBookmarkStatus((bookmarks[question.id] as BookmarkStatus) ?? BookmarkStatus.New);
  }, [bookmarks, question.id]);

  useEffect(() => {
    setShowHintIcon(globalShowHint);
  }, [globalShowHint]);

  const isVisible = useMemo(
    () => filterBookmarks.length === 0 || filterBookmarks.includes(globaleBookmarkStatus),
    [filterBookmarks, globaleBookmarkStatus],
  );

  if (!isVisible) return null;

  function handleOnShowHint(show: boolean): void {
    setShowHintIcon(show);

    if (nextBookmarkAction === NextBookmarkAction.Next) {
      const nextStatus = getNextStatus(globaleBookmarkStatus);
      setGlobalBookmarkStatus(nextStatus);
      updateBookmark(question.id.toString(), nextStatus);
      setNextBookmarkAction(NextBookmarkAction.Ignore);
    } else if (nextBookmarkAction === NextBookmarkAction.Previous) {
      const previousStatus = getPreviousStatus(globaleBookmarkStatus);
      setGlobalBookmarkStatus(previousStatus);
      updateBookmark(question.id.toString(), previousStatus);
      setNextBookmarkAction(NextBookmarkAction.Ignore);
    }
  }

  return (
    <div id={question.id.toString()} className="mb-4 scroll-mt-4">
      <QuestionTitle
        id={question.id}
        text={question.text}
        isFormatText={isFormatQuestionText}
        defaultBookmarkStatus={globaleBookmarkStatus}
        audio={question.audio}
        showHint={showHintIcon}
        onShowHint={handleOnShowHint}
        onBookmarkChanged={handleBookmarkChanged}
      />
      <OptionGroup
        defaultChecked={defaultSelectedOption}
        options={question.options}
        correctIndex={question.correctAnswer}
        isFormatText={isFormatOptionText}
        showHint={showHintIcon}
        onExplanationClick={() => setShowHintDetail(!showHintDetail)}
        onSelectionChange={handleSelectionChange}
      />
      <HintCard
        hint={{
          id: question.id,
          text: question.explanation,
          field: HintField.Question,
        }}
        open={showHintDetail}
        onOpenChange={setShowHintDetail}
      />
    </div>
  );
}
