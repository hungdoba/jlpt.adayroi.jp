import Link from 'next/link';
import { cn } from '@/lib/utils';
import { DOC_BUTTONS, QUIZ_BUTTONS } from '@/constants/quiz';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import JlptDataTable from '@/components/table/JlptDataTable';
import Heatmap from '@/components/features/Heatmap';
import { getJlptInfo } from '@/lib/jlpt';

const quizButtons = QUIZ_BUTTONS;

const docButtons = DOC_BUTTONS;

function ButtonGrid({
  items,
  className = 'w-1/3 mt-2 px-2 md:w-1/6',
}: {
  items: readonly {
    readonly href: string;
    readonly label: string;
    readonly disabled: boolean;
  }[];
  className?: string;
}) {
  return (
    <div className="flex flex-wrap">
      {items.map(({ href, label, disabled }) => (
        <div
          className={cn(className, disabled ? 'cursor-not-allowed' : 'hover:cursor-pointer')}
          key={href}
        >
          {disabled ? (
            <Button variant="outline" className="w-full" disabled={disabled}>
              {label}
            </Button>
          ) : (
            <Link href={href} className="w-full">
              <Button variant="outline" className="w-full cursor-pointer">
                {label}
              </Button>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

export default async function Home() {
  const jlptList = await getJlptInfo(process.env.DATA_PATH + '/jlpt');
  return (
    <>
      <Label className="mt-4">Đề thi kỹ năng</Label>
      <ButtonGrid items={quizButtons} />
      <Label className="mt-4">Tuyển tập đề thi JLPT</Label>
      <div className="px-2">
        <JlptDataTable jlptList={jlptList} />
      </div>
      <Label className="mt-4">Tài liệu</Label>
      <ButtonGrid items={docButtons} className="w-1/2 mt-2 px-2 md:w-1/6" />
      <Label className="mt-4">Độ chăm chỉ</Label>
      <Heatmap />
    </>
  );
}
