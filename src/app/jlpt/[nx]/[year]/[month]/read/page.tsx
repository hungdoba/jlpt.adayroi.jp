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
              {mondai.mondai_text && (
                <MondaiText
                  mondaiText={mondai.mondai_text}
                  jsonFileName={`n1-${month}-${year}.json`}
                  mondaiId={mondai.mondai_id ?? 0}
                />
              )}
              {mondai.sub_mondai &&
                mondai.sub_mondai.map((sub_mondai, subMondaiIndex) => (
                  <div key={subMondaiIndex}>
                    {sub_mondai.mondai_text && (
                      <MondaiText
                        mondaiText={sub_mondai.mondai_text}
                        jsonFileName={`n1-${month}-${year}.json`}
                        mondaiId={sub_mondai.mondai_id ?? 0}
                      />
                    )}
                    {sub_mondai &&
                      sub_mondai.questions &&
                      sub_mondai.questions.map((question, questionIndex) => (
                        <Question
                          key={questionIndex}
                          mondaiId={mondai.mondai_id || 0}
                          question={question}
                          jsonFileName={`n1-${month}-${year}.json`}
                          questionId={question.question_id ?? 0}
                        />
                      ))}
                  </div>
                ))}
              <div>
                {mondai.questions &&
                  mondai.questions.map((question, questionIndex) => (
                    <Question
                      key={questionIndex}
                      mondaiId={mondai.mondai_id || 0}
                      question={question}
                      jsonFileName={`n1-${month}-${year}.json`}
                      questionId={question.question_id ?? 0}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
