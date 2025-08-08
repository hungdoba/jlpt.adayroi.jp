import { Mondai } from '@/types/base';
import SentenceCard from './SentenceCard';
import QuestionCard from './QuestionCard';

interface Props {
  mondai: Mondai;
  jsonPath: string;
}

export default function MondaiCard({ mondai, jsonPath }: Props) {
  return (
    <div className="mb-4 scroll-mt-4">
      {mondai.sentence && <SentenceCard mondai={mondai} jsonPath={jsonPath} />}
      {mondai.questions.map((question, i) => (
        <QuestionCard
          key={i}
          isFormatQuestionText
          isFormatOptionText
          question={question}
          jsonPath={jsonPath}
        />
      ))}
    </div>
  );
}
