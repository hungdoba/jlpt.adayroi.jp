export type Question = {
  question_id: number;
  question_text: string;
  choices: string[];
  answer: number;
  explanation: string;
};

export type SubMondai = {
  mondai_id: number | null;
  mondai_text: MondaiContent | null;
  explaination: string | null;
  questions: Question[] | null;
};

export type Mondai = {
  mondai_id: number | null;
  mondai_title: string | null;
  mondai_text: MondaiContent | null;
  questions: Question[] | null;
  sub_mondai: SubMondai[] | null;
};

export type MondaiContent = {
  content: string;
  translation: string;
};
