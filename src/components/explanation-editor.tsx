'use client';
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
import { Textarea } from './ui/textarea';
import { useState } from 'react';

type Props = {
  title?: string;
  contentInit?: string;
};

export default function ExplanationEditor({ title, contentInit }: Props) {
  const [content, setContent] = useState(contentInit);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-lg max-h-screen overflow-auto whitespace-pre-wrap">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            <Textarea
              className="min-h-[100px] overflow-hidden"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              ref={(textareaRef) => {
                if (textareaRef) {
                  textareaRef.style.height = 'auto';
                  textareaRef.style.height = `${textareaRef.scrollHeight}px`;
                }
              }}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
