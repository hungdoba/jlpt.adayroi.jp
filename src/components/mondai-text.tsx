import { cn } from '@/lib/utils';
import Explanation from './explanation';

type Props = {
  mondaiText: MondaiText;
};

export default function MondaiText({ mondaiText }: Props) {
  return (
    <div className="flex mt-4 mb-2 items-start">
      <h3 className={cn('whitespace-pre-wrap text-red-500')}>
        {mondaiText.content}
      </h3>
      <div>
        <Explanation title="Translation" content={mondaiText.translation} />
      </div>
    </div>
  );
}
