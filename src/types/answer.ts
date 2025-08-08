import { ReactNode } from "react";

export interface AnswersProviderProps {
  testId: string;
  children: ReactNode;
}

export interface AnswersContextType {
  answers: Record<string, string>;
  updateAnswer: (questionId: string, newAnswer: string) => void;
  clearAnswers: () => void;
  getFinalAnswerIndex: () => number;
  showHint: boolean;
  toggleHint: () => void;
}
