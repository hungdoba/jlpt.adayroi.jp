import { cn } from '@/lib/utils';
import Explanation from './explanation';
import { MondaiContent } from '@/types/question';

type Props = {
  mondaiText: MondaiContent;
};

export default function MondaiText({ mondaiText }: Props) {
  return (
    <div className="flex mt-4 mb-2 items-start">
      <h3 className={cn('whitespace-pre-wrap')}>{mondaiText.content}</h3>
      <div className="ml-2">
        <Explanation title="Translation" content={mondaiText.translation} />
      </div>
    </div>
  );
}
