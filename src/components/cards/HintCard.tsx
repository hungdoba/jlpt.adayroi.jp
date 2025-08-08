import { Hint } from '@/types/base';
import { cn, hasHtmlContent } from '@/lib/utils';
import { ScrollArea } from '../ui/ScrollArea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/Dialog';

interface Props {
  hint: Hint;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function HintCard({ hint, open, onOpenChange }: Props) {
  return (
    <Dialog modal={false} open={open} onOpenChange={onOpenChange}>
      <DialogContent className="whitespace-pre-wrap md:min-w-4xl max-h-[96%]">
        <DialogHeader>
          <DialogTitle>{hint.field}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="p-4 h-full max-h-[60vh]">
          {hasHtmlContent(hint.text) ? (
            <div
              className={cn('text-muted-foreground text-sm prose')}
              dangerouslySetInnerHTML={{ __html: hint.text }}
            />
          ) : (
            <DialogDescription>{hint.text}</DialogDescription>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
