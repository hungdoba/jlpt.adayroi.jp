import { JlptLevel, JlptMonth, JlptYear, Mondai } from './base';

export interface JlptList {
  level: JlptLevel[];
  year: JlptYear[];
  month: JlptMonth[];
}

export interface JlptInfo {
  id: number;
  level: JlptLevel;
  year: JlptYear;
  month: JlptMonth;
  totalQuestions: number;
}

export interface Section {
  id: number;
  name: string;
  description: string;
  skill: string;
  part: string;
  mondais: Mondai[];
}
