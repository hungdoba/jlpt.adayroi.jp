export type Question = {
  question_id: number;
  question_text: string;
  choices: string[];
  answer: number;
  explanation: string;
};

export type Mondai = {
  mondai_id: number | null;
  mondai_title?: string | null;
  passage?: MondaiContent | null;
  questions?: Question[] | null;
  sub_mondai?: Mondai[] | null;
};

export type MondaiContent = {
  content: string;
  translation: string;
};
