'use client';

import { useCallback, useState } from 'react';
import { Hint } from '@/types/base';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/Dialog';
import { getQuizHint } from '@/actions/json';
import { ScrollArea } from '../ui/ScrollArea';
import { cn, hasHtmlContent } from '@/lib/utils';
import EditCard from './EditCard';

interface Props {
  hint: Hint;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function HintCard({ hint, open, onOpenChange }: Props) {
  const [text, setText] = useState(hint.text);

  const reloadContent = useCallback(async () => {
    const data = await getQuizHint(hint);
    if (data) setText(data);
    else console.error('Failed to load hint content');
  }, [hint]);

  return (
    <Dialog modal={false} open={open} onOpenChange={onOpenChange}>
      <DialogContent className="whitespace-pre-wrap md:min-w-4xl max-h-[96%]">
        <DialogHeader>
          <DialogTitle>{hint.field}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="p-4 h-full max-h-[60vh]">
          {hasHtmlContent(text) ? (
            <div
              className={cn('text-muted-foreground text-sm prose')}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          ) : (
            <DialogDescription>{text}</DialogDescription>
          )}
        </ScrollArea>
        <DialogFooter>
          <EditCard hint={hint} reloadContent={reloadContent} />
        </DialogFooter>
      </DialogContent>
      <DialogFooter />
    </Dialog>
  );
}
