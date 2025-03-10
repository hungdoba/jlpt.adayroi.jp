type Question = {
  question_id: string;
  question_text: string;
  choices: string[];
  answer: number;
};

type SubMondai = {
  mondai_text: string | null;
  questions: Question[] | null;
};

type Mondai = {
  mondai_id: number | null;
  mondai_title: string | null;
  mondai_text: string | null;
  questions: Question[] | null;
  sub_mondai: SubMondai[] | null;
};
