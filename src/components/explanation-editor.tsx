'use client';
// TODO: remove in future
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
import { updateJson } from '@/actions/json';

import { toast } from 'sonner';

type Props = {
  title?: string;
  contentInit?: string;

  // TODO: remove in future
  jsonFileName?: string;
  mondaiId?: number;
  questionId?: number;
};

export default function ExplanationEditor({
  title,
  contentInit,
  jsonFileName,
  mondaiId,
  questionId,
}: Props) {
  const [content, setContent] = useState(contentInit);

  async function saveJson(): Promise<void> {
    const formData = new FormData();
    formData.append('json_file_name', jsonFileName ?? '');
    formData.append('mondai_id', mondaiId ? String(mondaiId) : '');
    formData.append('question_id', questionId ? String(questionId) : '');
    formData.append('content', content ?? '');
    const result = await updateJson(formData);
    if (result) {
      toast.success('Saved successfully');
    } else {
      toast.error('Failed to save');
    }
  }

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
          <Button type="button" onClick={saveJson}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
