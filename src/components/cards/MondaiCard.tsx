import { Mondai } from '@/types/base';
import SentenceCard from './SentenceCard';
import QuestionCard from './QuestionCard';

interface Props {
  mondai: Mondai;
}

export default function MondaiCard({ mondai }: Props) {
  return (
    <div className="mb-4 scroll-mt-4">
      {mondai.sentence && <SentenceCard mondai={mondai} />}
      {mondai.questions.map((question, i) => (
        <QuestionCard key={i} isFormatQuestionText isFormatOptionText question={question} />
      ))}
    </div>
  );
}
