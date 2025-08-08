export type JlptYear = number;
export type JlptMonth = 6 | 12;
export type JlptLevel = 'n1' | 'n2' | 'n3';
export type JlptSection =
  | 'grammar'
  | 'kanji'
  | 'listening'
  | 'reading'
  | 'vocabulary';

export enum HintField {
  Sentence = 'Dịch nghĩa',
  Question = 'Giải thích',
  SentenceText = 'Câu hỏi',
}

export interface Mondai {
  id: number;
  sentence?: Sentence;
  questions: Question[];
}

export interface Sentence {
  id: number;
  text: string;
  translation: string;
  mondaiId?: number;
  audio?: string;
}

export interface Question {
  id: number;
  sentenceId?: number;
  mondaiId?: number;
  text: string;
  image?: string;
  audio?: string;
  options: Option[];
  correctAnswer: number;
  points: number;
  explanation: string;
}

export interface Option {
  id: number;
  text: string;
  image?: string;
}

export interface Hint {
  id: number;
  text: string;
  field: HintField;
  filePath?: string;
}
