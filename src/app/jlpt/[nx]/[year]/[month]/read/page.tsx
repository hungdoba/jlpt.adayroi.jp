import fs from 'fs';
import Question from '@/components/question-component';
import MondaiText from '@/components/mondai-text';
import { Mondai } from '@/types/question';

type Props = {
  params: Promise<{ nx: string; year: string; month: string }>;
};

async function readJsonFile(filePath: string) {
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContents);
}

export async function generateStaticParams() {
  const nxValues = ['n1'];
  const years = ['2022'];
  const months = ['12'];

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

              {/* Main mondai text if present */}
              {mondai.passage && (
                <MondaiText
                  mondaiText={mondai.passage}
                  jsonFileName={`${nx}-${month}-${year}.json`}
                  mondaiId={mondai.mondai_id ?? 0}
                />
              )}

              {/* Handle nested sub_mondai */}
              {mondai.sub_mondai?.map((nestedMondai, nestedIndex) => (
                <div key={nestedIndex}>
                  {nestedMondai.passage && (
                    <MondaiText
                      mondaiText={nestedMondai.passage}
                      jsonFileName={`${nx}-${month}-${year}.json`}
                      mondaiId={nestedMondai.mondai_id ?? 0}
                    />
                  )}

                  {/* Questions within nested mondai */}
                  {nestedMondai.questions?.map((question, questionIndex) => (
                    <Question
                      key={questionIndex}
                      mondaiId={mondai.mondai_id ?? 0}
                      question={question}
                      jsonFileName={`${nx}-${month}-${year}.json`}
                      questionId={question.question_id ?? 0}
                    />
                  ))}
                </div>
              ))}

              {/* Direct questions in main mondai */}
              {mondai.questions?.map((question, questionIndex) => (
                <Question
                  key={questionIndex}
                  mondaiId={mondai.mondai_id ?? 0}
                  question={question}
                  jsonFileName={`${nx}-${month}-${year}.json`}
                  questionId={question.question_id ?? 0}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
