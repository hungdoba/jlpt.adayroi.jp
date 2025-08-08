'use client';

import { AnswersContextType, AnswersProviderProps } from '@/types/answer';
import { createContext, useContext, useState, useEffect } from 'react';

const AnswersContext = createContext<AnswersContextType | undefined>(undefined);

const LOCAL_KEY = 'adayroi_answers';

export function AnswersProvider({ testId, children }: AnswersProviderProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showHint, setShowHint] = useState<boolean>(false);

  const toggleHint = () => {
    setShowHint((prev) => !prev);
  };

  useEffect(() => {
    const stored = localStorage.getItem(`${LOCAL_KEY}_${testId}`);
    if (stored) {
      setAnswers(JSON.parse(stored));
    }
  }, [testId]);

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(`${LOCAL_KEY}_${testId}`, JSON.stringify(answers));
    }
  }, [answers, testId]);

  const updateAnswer = (questionId: string, newAnswer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: newAnswer }));
  };

  const clearAnswers = () => {
    setAnswers({});
    localStorage.removeItem(`${LOCAL_KEY}_${testId}`);
  };

  const getFinalAnswerIndex = (): number => {
    const keys = Object.keys(answers);
    return keys.length > 0 ? Math.max(...keys.map(Number)) : -1;
  };

  return (
    <AnswersContext.Provider
      value={{
        answers,
        updateAnswer,
        clearAnswers,
        getFinalAnswerIndex,
        showHint,
        toggleHint,
      }}
    >
      {children}
    </AnswersContext.Provider>
  );
}

export function useAnswers(): AnswersContextType {
  const context = useContext(AnswersContext);
  if (context === undefined) {
    throw new Error('useAnswers must be used within an AnswersProvider');
  }
  return context;
}
