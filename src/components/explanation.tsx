import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CircleHelp } from 'lucide-react';
import ExplanationEditor from './explanation-editor';

type Props = {
  title?: string;
  content?: string;

  // TODO: remove in future
  jsonFileName?: string;
  mondaiId?: number;
  questionId?: number;
};

export default function Explanation({
  title,
  content,
  jsonFileName,
  mondaiId,
  questionId,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CircleHelp size={16} strokeWidth={0.5} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="max-w-screen-lg whitespace-pre-wrap">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{content}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <ExplanationEditor
            title={title}
            contentInit={content}
            jsonFileName={jsonFileName}
            mondaiId={mondaiId}
            questionId={questionId}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
