'use client';
import { useState } from 'react';
import { Button } from '../ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/Dialog';
import { Textarea } from '../ui/Textarea';
import { toast } from 'sonner';
import { Hint } from '@/types/base';
import { updateQuizJson } from '@/actions/json';

type Props = {
  hint: Hint;
  reloadContent?: () => void;
};

export default function EditCard({ hint, reloadContent }: Props) {
  const [text, setText] = useState(hint.text);

  async function saveJson(): Promise<void> {
    const { filePath, field, id } = hint;
    if (!filePath || !field || id === undefined) {
      toast.error(`Invalid hint data: filePath="${filePath}", field="${field}", id="${id}"`);
      return;
    }

    const formData = new FormData();
    formData.append('file_path', filePath);
    formData.append('field', field);
    formData.append('id', String(id));
    formData.append('text', text);

    const result = await updateQuizJson(formData);
    toast[result ? 'success' : 'error'](result ? 'Saved successfully' : 'Failed to save');
    reloadContent?.();
  }

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleTextareaRef = (ref: HTMLTextAreaElement | null) => {
    if (ref) {
      ref.style.height = 'auto';
      ref.style.height = `${ref.scrollHeight}px`;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sửa</Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-lg max-h-screen overflow-auto whitespace-pre-wrap">
        <DialogHeader>
          <DialogTitle>{hint.field}</DialogTitle>
          <DialogDescription>
            <Textarea
              className="min-h-[100px] overflow-hidden"
              value={text}
              onChange={handleTextareaChange}
              ref={handleTextareaRef}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={saveJson}>
              Lưu
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
