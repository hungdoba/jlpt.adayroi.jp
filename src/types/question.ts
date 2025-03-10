type Question = {
  question_id: string;
  question_text: string;
  choices: string[];
  answer: number;
  explanation: string;
};

type SubMondai = {
  mondai_text: MondaiText | null;
  explaination: string | null;
  questions: Question[] | null;
};

type Mondai = {
  mondai_id: number | null;
  mondai_title: string | null;
  mondai_text: MondaiText | null;
  questions: Question[] | null;
  sub_mondai: SubMondai[] | null;
};

type MondaiText = {
  content: string;
  translation: string;
};
