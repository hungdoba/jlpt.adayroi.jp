import fs from 'fs';
import { RadioGroup } from '@radix-ui/react-radio-group';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type Props = {
  params: Promise<{ nx: string; year: string; month: string }>;
};

type Question = {
  question_id: string;
  question_text: string;
  choices: string[];
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

async function readJsonFile(filePath: string) {
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContents);
}

export async function generateStaticParams() {
  const nxValues = ['n1', 'n2', 'n3', 'n4', 'n5'];
  const years = ['2021', '2022', '2023'];
  const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];

  const params = [];

  for (const nx of nxValues) {
    for (const year of years) {
      for (const month of months) {
        params.push({ nx, year, month });
      }
    }
  }

  return params;
}

export default async function Page({ params }: Props) {
  const { nx, year, month } = await params;
  const mondaiData: Mondai[] = await readJsonFile(
    `data/questions/${nx}-${month}-${year}.json`
  );

  return (
    <div className="container">
      <div className="flex flex-col md:flex-row">
        <div className="w-full">
          {mondaiData.map((mondai, mondaiIndex) => (
            <div key={mondaiIndex}>
              <h2 className="mt-8 mb-4">{`問題 ${mondai.mondai_id} ${mondai.mondai_title}`}</h2>
              {mondai.mondai_text && (
                <h3
                  className={cn(
                    'mt-4 mb-2 whitespace-pre-wrap',
                    mondai.mondai_id == 7 ? 'border p-2' : ''
                  )}
                >
                  {mondai.mondai_text}
                </h3>
              )}
              {mondai.sub_mondai &&
                mondai.sub_mondai.map((sub_mondai, subMondaiIndex) => (
                  <div key={subMondaiIndex}>
                    {sub_mondai.mondai_text && (
                      <h3 className={cn('mt-4 mb-2 whitespace-pre-wrap')}>
                        {sub_mondai.mondai_text}
                      </h3>
                    )}
                    {sub_mondai &&
                      sub_mondai.questions &&
                      sub_mondai.questions.map((question, questionIndex) => (
                        <div key={questionIndex}>
                          <h3 className="mt-4 mb-2">{`${question.question_id.replace(
                            'question-',
                            ''
                          )}. ${question.question_text}`}</h3>
                          <div className="mx-8 flex justify-between">
                            <RadioGroup
                              defaultValue="option-one"
                              className="flex flex-row flex-wrap justify-between w-full"
                            >
                              {question.choices.map((choice, choiceIndex) => (
                                <div
                                  key={choiceIndex}
                                  className={cn(
                                    'flex items-center mb-2',
                                    mondai.mondai_id === 1 ||
                                      mondai.mondai_id === 2 ||
                                      mondai.mondai_id === 3 ||
                                      mondai.mondai_id === 5
                                      ? 'w-full md:w-1/2 lg:w-1/4'
                                      : mondai.mondai_id === 4 ||
                                        mondai.mondai_id === 10 ||
                                        mondai.mondai_id === 11 ||
                                        mondai.mondai_id === 12 ||
                                        mondai.mondai_id === 13
                                      ? 'w-full'
                                      : 'w-full md:w-1/2'
                                  )}
                                >
                                  <RadioGroupItem
                                    value={`option-${choiceIndex}`}
                                    id={`option-${choiceIndex}-${questionIndex}`}
                                  />
                                  <Label
                                    htmlFor={`option-${choiceIndex}-${questionIndex}`}
                                    className="ml-2"
                                  >
                                    {`${choiceIndex + 1}. ${choice}`}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              <div>
                {mondai.questions &&
                  mondai.questions.map((question, questionIndex) => (
                    <div key={questionIndex}>
                      <h3 className="mt-4 mb-2">{`${question.question_id.replace(
                        'question-',
                        ''
                      )}. ${question.question_text}`}</h3>
                      <div className="mx-8 flex justify-between">
                        <RadioGroup
                          defaultValue="option-one"
                          className="flex flex-row flex-wrap justify-between w-full"
                        >
                          {question.choices.map((choice, choiceIndex) => (
                            <div
                              key={choiceIndex}
                              className={cn(
                                'flex items-center mb-2',
                                mondai.mondai_id === 1 ||
                                  mondai.mondai_id === 2 ||
                                  mondai.mondai_id === 3 ||
                                  mondai.mondai_id === 5
                                  ? 'w-full md:w-1/2 lg:w-1/4'
                                  : mondai.mondai_id === 4 ||
                                    mondai.mondai_id === 10 ||
                                    mondai.mondai_id === 11 ||
                                    mondai.mondai_id === 12 ||
                                    mondai.mondai_id === 13
                                  ? 'w-full'
                                  : 'w-full md:w-1/2'
                              )}
                            >
                              <RadioGroupItem
                                value={`option-${choiceIndex}`}
                                id={`option-${choiceIndex}-${questionIndex}`}
                              />
                              <Label
                                htmlFor={`option-${choiceIndex}-${questionIndex}`}
                                className="ml-2"
                              >
                                {`${choiceIndex + 1}. ${choice}`}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
