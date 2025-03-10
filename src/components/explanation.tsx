import { Button } from '@/components/ui/button';
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

type Props = {
  title?: string;
  content?: string;
};

export default function Explanation({ title, content }: Props) {
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
          <Button type="submit">Send comment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
